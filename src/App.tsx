import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Company from "./pages/company/Company";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/company" element={<Company />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
