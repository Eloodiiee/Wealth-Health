/*Liste d'employés*/
import EmployeeTable from "../components/Table/EmployeeTable"

import "../../App.css"

function EmployeeList() {
    return (
        <>
            <div id="employee-div">
                <h1 id="employee-title">Current Employees</h1>
                <EmployeeTable />
            </div>
        </>
    )
}

export default EmployeeList
