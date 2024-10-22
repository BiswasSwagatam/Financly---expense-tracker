
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
      <ToastContainer />
      <div className="font-outfit">
        
          <Router>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
