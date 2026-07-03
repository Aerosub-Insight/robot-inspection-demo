import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import IntroLanding from './IntroLanding.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroLanding />} />
        <Route path="/explorer" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
