/*Liste d'employés*/

/* import { useState } from "react" */
import { NavLink } from "react-router-dom"
import logo from "../images/Wealth_Health2.png"
import EmployeeTable from "../components/Table/EmployeeTable"

import "../../App.css"

function EmployeeList() {
    return (
        <>
            <div className="header">
                <img src={logo} className="logo" />
                <h1>Wealth Health</h1>
                <NavLink to="/" className="NavEmployee">
                    Home
                </NavLink>
            </div>

            <div id="employee-div">
                <h1 id="employee-title">Current Employees</h1>
                <EmployeeTable />
            </div>
        </>
    )
}

export default EmployeeList
