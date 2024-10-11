import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"

// Composant fonctionnel pour le sélecteur de date de naissance.
const BirthDatePicker = () => {
    // Initialise l'état local startDate avec une valeur null.
    const [birthDate, setBirthDate] = useState(null)
    // Retourne le JSX avec un label et un DatePicker, mettant à jour la date sélectionnée.
    return (
        <div className="birthDate">
            <label htmlFor="date-of-birth">Date of Birth</label>
            {/* DatePicker pour sélectionner une date, avec mise à jour via onChange */}
            <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                maxDate={new Date()}
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                showIcon
                toggleCalendarOnIconClick
                dropdownMode="select"
            />
        </div>
    )
}

export default BirthDatePicker
