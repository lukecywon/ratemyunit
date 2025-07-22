import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/index.css'
import Home from "./pages/Home.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/">
                    <Route index element={<Home />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>,
)
