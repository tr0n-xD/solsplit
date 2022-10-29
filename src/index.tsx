import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App screen='welcome'/>}/>
                <Route path="/messages" element={<App screen='messages'/>}/>
                <Route path="/send" element={<App screen='send'/>}/>
                <Route path="/receipts" element={<App screen='receipts'/>}/>
                <Route path="/topup" element={<App screen='topup'/>}/>
                <Route path="/help" element={<App screen='help'/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
