import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/index.css'
import Home from "./pages/Landing.tsx";
import MainPage from "./pages/MainPage.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/">
                    <Route index element={<Home />}></Route>
                </Route>
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    </>,
)
