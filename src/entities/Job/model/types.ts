export type TJob = {
  id: number
  title: string
  salary: string
  location: string
  experience: '1–3 года' | '3–5 лет' | '5+ лет' | 'Любой'
}

export type TJobResponse = {
  data: TJob[]
}
