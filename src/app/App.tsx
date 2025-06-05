import type { TJobResponse } from '@/entities/Job/model/types'
import { JobCard } from '@/entities/Job/ui/JobCard'
import { useEffect, useReducer } from 'react'

type Action =
  | { type: 'SET_DATA'; payload: TJobResponse }
  | { type: 'SET_FILTER'; payload: EnumFilter }
type State = {
  sourceData: TJobResponse | null
  filteredData: TJobResponse | null
  filter: EnumFilter
}

const EnumFilter = {
  ALL: 'ALL',
  'ONE-THREE': 'ONE-THREE',
  'THREE-FIVE': 'THREE-FIVE',
  'FIVE-PLUS': 'FIVE-PLUS'
} as const

type EnumFilter = (typeof EnumFilter)[keyof typeof EnumFilter]

// Можно было реализовать и хук с Loading и т.п.
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_DATA': {
      return {
        ...state,
        sourceData: action.payload,
        filteredData: experienceFilter(action.payload, state.filter)
      }
    }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        filteredData: experienceFilter(state.sourceData, action.payload)
      }
  }
}

function experienceFilter(source: TJobResponse | null, filter: EnumFilter) {
  if (!source?.data) return null
  if (filter === 'ALL') return source

  const filtered = source.data.filter(item => {
    switch (filter) {
      case 'ONE-THREE':
        return item.experience === '1–3 года'
      case 'THREE-FIVE':
        return item.experience === '3–5 лет'
      case 'FIVE-PLUS':
        return item.experience === '5+ лет'
      default:
        return true
    }
  })
  console.log(filtered)
  return { ...source, data: filtered }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    sourceData: null,
    filteredData: null,
    filter: 'ALL'
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.BASE_URL + 'db.json')
        const data: TJobResponse = await response.json()
        dispatch({ type: 'SET_DATA', payload: data })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='font-display relative flex h-screen w-full items-center justify-center'>
      <div className='container flex h-full flex-col gap-2'>
        <div className='flex flex-col gap-4 px-5'>
          <h1 className='text-center text-3xl font-black'>Тестовое задание</h1>
          <div className='flex items-center gap-2'>
            <span className='font-semibold'>Опыт:</span>
            <select
              className='w-full rounded-md border px-2 py-0.5'
              name='experience'
              value={state.filter}
              onChange={e =>
                dispatch({
                  type: 'SET_FILTER',
                  payload: e.target.value as EnumFilter
                })
              }
            >
              <option value={EnumFilter.ALL}>Любой</option>
              <option value={EnumFilter['ONE-THREE']}>1–3 года</option>
              <option value={EnumFilter['THREE-FIVE']}>3-5 лет</option>
              <option value={EnumFilter['FIVE-PLUS']}>5+ лет</option>
            </select>
          </div>
        </div>
        <div className='px-5'>
          <ul className='flex flex-col gap-3'>
            {state?.filteredData?.data.map(item => (
              <li
                className='flex w-full translate-y-0 rounded-2xl border p-5 opacity-100 transition-all duration-1000 starting:translate-y-5 starting:opacity-0'
                key={item.id}
              >
                <JobCard job={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
