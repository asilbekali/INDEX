import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./context/UserContext";
import { LanguageProvider } from "./service/language-contex";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalContext>
                <LanguageProvider>
                    <App />
                </LanguageProvider>
            </GlobalContext>
        </BrowserRouter>
    </React.StrictMode>
);
