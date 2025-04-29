import '@/styles/global.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { OverlayContextProvider } from './context/overlay/overlay-context-provider';
import { AgentContextProvider } from './context/agent/agent-context-provider';
import { ChatContextProvider } from './context/chat';
import { ChatPage } from "./pages/chat-page";
import { DashboardPage } from './pages/dashboard/dashboard';
import { HomePage } from './pages/home-page';
import { PluginContextProvider } from './context/plugin';

export function App() {
  return (
    <OverlayContextProvider>
      <AgentContextProvider>
        <PluginContextProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='chat' element={<ChatContextProvider children={<ChatPage />} />} />
              <Route path='dashboard' element={<DashboardPage />} />
            </Routes>
          </BrowserRouter>
        </PluginContextProvider>
      </AgentContextProvider>
    </OverlayContextProvider>
  )
}
