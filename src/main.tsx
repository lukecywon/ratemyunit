import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<App />}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    <App />
  </StrictMode>,
)
