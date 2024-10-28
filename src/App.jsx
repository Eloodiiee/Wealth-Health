import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HeaderWH from "./assets/components/Header/HeaderWH"
import Home from "./assets/pages/Home"
import EmployeeList from "./assets/pages/EmployeeList"
function App() {
    return (
        <Router>
            <HeaderWH />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employee-list" element={<EmployeeList />} />
            </Routes>
        </Router>
    )
}

export default App
