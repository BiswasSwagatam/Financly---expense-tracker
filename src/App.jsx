
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from "antd";

function App() {
  
  return (
    <>
      <ToastContainer />
      <div className="font-outfit">
        <ConfigProvider 
          theme={{ token: { fontFamily: "Outfit", colorPrimary: "#4f46e5" } }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </ConfigProvider>
      </div>
    </>
  )
}

export default App
