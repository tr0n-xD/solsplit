import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App view='welcome'/>}/>
                <Route path="/create" element={<App view='create'/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
