import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"

// Composant fonctionnel pour le sélecteur de date de début.
const StartDatePicker = () => {
    // Initialise l'état local startDate avec une valeur null.
    const [startDate, setStartDate] = useState(null)
    // Retourne le JSX avec un label et un DatePicker, mettant à jour la date sélectionnée.
    return (
        <div className="startDate">
            <label htmlFor="start-date">Start Date</label>
            {/* DatePicker pour sélectionner une date, avec mise à jour via onChange */}
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                filterDate={(date) => date.getDay() != 6 && date.getDay() != 0}
                dateFormat="MM/dd/yyyy"
                showMonthDropdown
                showYearDropdown
                showIcon
                scrollableYearDropdown
                dropdownMode="select"
            />
        </div>
    )
}

export default StartDatePicker
