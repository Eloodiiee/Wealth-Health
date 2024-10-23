import { addEmployee } from "../../features/employeeSlice.js" // Importation de l'action Redux pour ajouter un employé
import "../../App.css"
import { useState } from "react" // Importation du hook useState pour gérer l'état local
import BirthDatePicker from "../components/Date-Picker/BirthDatePicker"
import StartDatePicker from "../components/Date-Picker/StartDatePicker"
import { states } from "../data/States" // Données des états
import { Departments } from "../data/Departments" // Données des départements
import FormModal from "../components/ModalForm/Modal" // Modal réutilisable pour afficher des messages
import { useDispatch } from "react-redux" // Hooks pour interagir avec Redux (récupération et envoi d'actions)
import { Dropzy } from "dropzy" // Librairie du Dropdown dropzy

function App() {
    // Liste des états (nom complet) pour utilisation dans Dropzy
    const statesList = states.map((state) => state.label) // Extraction des noms complets uniquement
    const departmentsList = Departments.map((department) => department.label) // Extraction des labels des départements

    const dispatch = useDispatch() // Hook pour envoyer des actions à Redux
    const [isOpen, setIsOpen] = useState(false) // Gestion de l'ouverture/fermeture du modal

    // État initial pour le formulaire d'employé
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

    const [employeeData, setEmployeeData] = useState(initialEmployeeData) // État local pour les données du formulaire
    const [state, setState] = useState("") // État temporaire pour la sélection du nom complet de l'état
    const [department, setDepartment] = useState("") // État temporaire pour la sélection du département

    // Fonction pour ouvrir/fermer le modal
    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { id, value } = e.target // Récupère l'id et la valeur du champ modifié
        setEmployeeData({ ...employeeData, [id]: value }) // Met à jour l'état local avec les nouvelles valeurs
    }

    // Soumission du formulaire
    const submitForm = (e) => {
        e.preventDefault() // Empêche le rechargement de la page

        // Convertir le nom complet de l'état en abréviation avant d'enregistrer
        const stateAbbreviation = states.find((s) => s.label === state)?.value || "" // Recherche de l'abréviation correspondante

        // Création d'un nouvel objet employé à partir des données du formulaire
        const newEmployee = {
            id: Date.now(), // Génère un ID unique basé sur l'horodatage
            ...employeeData, // Copie les autres données du formulaire
            state: stateAbbreviation, // Enregistrement de l'abréviation de l'état au lieu du nom complet
        }

        dispatch(addEmployee(newEmployee)) // Envoi de l'action à Redux pour ajouter l'employé

        // Réinitialisation du formulaire après soumission
        setEmployeeData(initialEmployeeData) // Remet à zéro les données du formulaire
        setState("") // Réinitialise la sélection de l'état
        setDepartment("") // Réinitialise la sélection du département
        toggleModal() // Ouvre le modal pour indiquer que l'employé a été ajouté
    }

    return (
        <>
            <div className="container">
                <h2>Create Employee</h2> {/* Titre du formulaire */}
                {/* Formulaire de création d'un employé */}
                <form action="#" id="create-employee" onSubmit={submitForm}>
                    <div className="names">
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            {/* Champ de texte pour le prénom de l'employé */}
                            <input type="text" id="firstName" value={employeeData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            {/* Champ de texte pour le nom de famille de l'employé */}
                            <input type="text" id="lastName" value={employeeData.lastName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="dates">
                        {/* Sélecteur de date pour la date de naissance */}
                        <BirthDatePicker birthDate={employeeData.birthDate} setBirthDate={(date) => setEmployeeData({ ...employeeData, birthDate: date })} />

                        {/* Sélecteur de date pour la date de début */}
                        <StartDatePicker selectedDate={(date) => setEmployeeData({ ...employeeData, startDate: date })} />
                    </div>

                    <fieldset className="address">
                        <legend>Address</legend>
                        {/* Champ de texte pour l'adresse */}
                        <label htmlFor="address">Street</label>
                        <input id="address" type="text" value={employeeData.address} onChange={handleChange} required />

                        {/* Champ de texte pour la ville */}
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" value={employeeData.city} onChange={handleChange} required />

                        {/* Liste déroulante pour la sélection de l'état */}
                        <label htmlFor="state">State</label>
                        <Dropzy
                            value={state}
                            setValue={(value) => {
                                setState(value) // Stocker le nom complet temporairement
                            }}
                            options={statesList} // Liste des noms complets d'états
                        />

                        {/* Champ de texte pour le zip code */}
                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" type="number" value={employeeData.zipCode} onChange={handleChange} required />
                    </fieldset>

                    {/* Liste déroulante pour la sélection du département */}
                    <label htmlFor="department">Department</label>
                    <Dropzy
                        value={department}
                        setValue={(value) => {
                            setDepartment(value) // Stocker la sélection temporairement
                            setEmployeeData({ ...employeeData, department: value }) // Mettre à jour l'employé avec le département
                        }}
                        options={departmentsList} // Liste des départements
                    />

                    {/* Bouton de soumission du formulaire */}
                    <button type="submit" className="submitBtn">
                        Save
                    </button>
                </form>
            </div>

            {/* Modal qui s'affiche après la soumission */}
            <FormModal isOpen={isOpen} toggleModal={toggleModal} />
        </>
    )
}

export default App
