import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Company from "./pages/company/Company";
import FilePage from "./pages/upload/FilePage";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/company" element={<Company />} />

                <Route path="/file" element={<FilePage />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
