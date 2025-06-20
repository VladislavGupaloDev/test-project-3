import { App } from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const element = document.getElementById('root')!

const root = createRoot(element)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
