import "../../App.css"
import { addEmployee } from "../../features/employeeSlice.js"
import { useState, useCallback, useMemo } from "react"
import { DatePicker } from "chronopick"
import "chronopick/dist/style.css"
import { states } from "../data/States"
import { Departments } from "../data/Departments"
import FormModal from "../components/ModalForm/Modal"
import { useDispatch } from "react-redux"
import { Dropzy } from "dropzy"

const initialEmployeeData = {
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
}

function App() {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [employeeData, setEmployeeData] = useState(initialEmployeeData)
    const [modalMessage, setModalMessage] = useState("")

    const statesList = useMemo(() => states.map((state) => state.label), [])
    const departmentsList = useMemo(() => Departments.map((department) => department.label), [])

    const preventFormSubmitOnEnter = useCallback((e) => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }, [])

    const toggleModal = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen)
    }, [])

    const handleChange = useCallback((e) => {
        const { id, value } = e.target
        setEmployeeData((prevData) => ({ ...prevData, [id]: value }))
    }, [])

    const handleDateChange = useCallback((date, field) => {
        const formattedDate = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : ""
        setEmployeeData((prevData) => ({ ...prevData, [field]: formattedDate }))
    }, [])

    const isFormValid = () => {
        const requiredFields = ["firstName", "lastName", "birthDate", "startDate", "address", "city", "state", "zipCode", "department"]
        return requiredFields.every((field) => employeeData[field])
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            const stateAbbreviation = states.find((s) => s.label === employeeData.state)?.value || ""
            const newEmployee = {
                id: Date.now(),
                ...employeeData,
                state: stateAbbreviation,
            }

            dispatch(addEmployee(newEmployee))
            setModalMessage(`Employee ${employeeData.firstName} ${employeeData.lastName} has been successfully added to the database.`)
            setEmployeeData(initialEmployeeData)
        } else {
            setModalMessage("Employee could not be added to the database as some fields are missing.")
        }
        toggleModal()
    }

    return (
        <>
            <div className="container">
                <h2>Create Employee</h2>
                <form id="create-employee" onKeyDown={preventFormSubmitOnEnter} onSubmit={submitForm}>
                    <div className="names">
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" value={employeeData.firstName} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" value={employeeData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="dates">
                        <div>
                            <label htmlFor="birthDate">Date of Birth</label>
                            <DatePicker selectedDate={employeeData.birthDate} onDateChange={(date) => handleDateChange(date, "birthDate")} />
                        </div>
                        <div>
                            <label htmlFor="startDate">Start Date</label>
                            <DatePicker selectedDate={employeeData.startDate} onDateChange={(date) => handleDateChange(date, "startDate")} />
                        </div>
                    </div>

                    <fieldset className="address">
                        <legend>Address</legend>
                        <label htmlFor="address">Street</label>
                        <input id="address" type="text" value={employeeData.address} onChange={handleChange} />
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" value={employeeData.city} onChange={handleChange} />
                        <label htmlFor="state">State</label>
                        <Dropzy value={employeeData.state} setValue={(value) => setEmployeeData((prev) => ({ ...prev, state: value }))} options={statesList} />
                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" type="number" value={employeeData.zipCode} onChange={handleChange} />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <Dropzy value={employeeData.department} setValue={(value) => setEmployeeData((prev) => ({ ...prev, department: value }))} options={departmentsList} />

                    <button type="submit" className="submitBtn">
                        Save
                    </button>
                </form>
            </div>

            <FormModal isOpen={isOpen} toggleModal={toggleModal} modalMessage={modalMessage} />
        </>
    )
}

export default App
