import { BrowserRouter as Router, Route, Routes /* Navigate */ } from "react-router-dom"
import HeaderWH from "./assets/components/Header/HeaderWH"
import Home from "./assets/pages/Home"
import EmployeeList from "./assets/pages/EmployeeList"
function App() {
    return (
        <Router>
            <HeaderWH />
            <Routes>
                <Route path="/" element={<Home />} /> {/* Redirige la racine vers /user/12 a decommenter pour etre sur le Backend*/}
                {/* <Route path="/error" element={<PageErreur />} />
                <Route path="*" element={<PageErreur />} /> */}
                <Route path="/employee-list" element={<EmployeeList />} />
            </Routes>
        </Router>
    )
}

export default App
