import { NavLink } from "react-router-dom"
import logo from "../../images/Wealth_Health2.png"

const HeaderWH = () => {
    return (
        <div className="header">
            <img src={logo} alt="logo-wealth-health" className="logo" />
            <h1>Wealth Health</h1>
            <nav>
                <NavLink to="/" className="NavEmployee">
                    Home
                </NavLink>
                <NavLink to="/employee-list" className="NavEmployee">
                    View Current Employees
                </NavLink>
            </nav>
        </div>
    )
}
export default HeaderWH
