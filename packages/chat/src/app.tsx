import "@/styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router"
import { ChatPage } from "./pages/chat";
import { Template } from "./pages/template/template.page";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<ChatPage/>}/>
                <Route path="/template" element={<Template/>}/>
            </Routes>
        </BrowserRouter>
    )
}
