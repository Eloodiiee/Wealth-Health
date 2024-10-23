import { createSlice } from "@reduxjs/toolkit"
import mockedEmployees from "../assets/data/Data_Mocked.js"
// Fonction pour sauvegarder les employés dans localStorage
const saveToLocalStorage = (employees) => {
    localStorage.setItem("employees", JSON.stringify(employees))
}

// Fonction pour charger les employés depuis localStorage
const loadFromLocalStorage = () => {
    const employees = localStorage.getItem("employees")
    // Si aucun employé n'est présent dans le localStorage, initialiser avec dataMocked
    if (!employees) {
        saveToLocalStorage(mockedEmployees) // Sauvegarde les données mockées dans le localStorage
        return mockedEmployees // Retourne les données mockées pour initialiser l'état
    }
    return JSON.parse(employees) // Sinon, charge les employés depuis localStorage
}

const initialState = {
    employees: loadFromLocalStorage(), // Charger les employés depuis localStorage au démarrage
}

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload)
            saveToLocalStorage(state.employees) // Sauvegarder les employés après ajout
        },
    },
})

export const { addEmployee } = employeeSlice.actions
export default employeeSlice.reducer
