/** Page d'accueil */

import { useState } from "react"
import { NavLink } from "react-router-dom"
import BirthDatePicker from "../components/Date-Picker/BirthDatePicker"
import StartDatePicker from "../components/Date-Picker/StartDatePicker"
import DropdownMenu from "../components/DropDown/Dropdown"
import { states } from "../data/States"
import { Departments } from "../data/Departments"
import logo from "../images/Wealth_Health2.png"
import FormModal from "../components/ModalForm/Modal"
import "../../App.css"

function App() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }
    const submitForm = () => {
        console.log("modale ouverte")
        toggleModal()
    }
    return (
        <>
            <div className="header">
                <img src={logo} className="logo" />
                <h1>Wealth Health</h1>
                <NavLink to="/employee-list" className="NavEmployee">
                    View Current Employees
                </NavLink>
            </div>
            <div className="container">
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />

                    <div className="dates">
                        <BirthDatePicker />

                        <StartDatePicker />
                    </div>

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />

                        <label htmlFor="state">State</label>
                        <DropdownMenu options={states} />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <DropdownMenu options={Departments} />
                </form>

                <button onClick={submitForm}>Save</button>
            </div>
            <FormModal isOpen={isOpen} toggleModal={toggleModal} />
        </>
    )
}

export default App
