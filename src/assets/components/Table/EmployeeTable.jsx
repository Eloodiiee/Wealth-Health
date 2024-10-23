import { useMemo, useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

const EmployeeTable = () => {
    // Configuration des colonnes
    const [columnDefs] = useState([
        { field: "firstName", headerName: "First Name", sortable: true, filter: true, width: 150 },
        { field: "lastName", headerName: "Last Name", sortable: true, filter: true, width: 150 },
        { field: "startDate", headerName: "Start Date", sortable: true, filter: true, width: 200 },
        { field: "department", headerName: "Department", sortable: true, filter: true, width: 150 },
        { field: "dateOfBirth", headerName: "Date of Birth", sortable: true, filter: true, width: 200 },
        { field: "address", headerName: "Street", sortable: true, filter: true, width: 200 },
        { field: "city", headerName: "City", sortable: true, filter: true, width: 150 },
        { field: "state", headerName: "State", sortable: true, filter: true, width: 150 },
        { field: "zipCode", headerName: "Zip Code", sortable: true, filter: true, width: 150 },
    ])

    // Configuration par défaut des colonnes
    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            filter: true,
            floatingFilter: true, // Permet d'ajouter une barre de filtre sous chaque colonne
        }),
        []
    )
    // State pour stocker les données des employés
    const [rowData, setRowData] = useState([])
    useEffect(() => {
        //Récupère les employés depuis le localStorage
        const employeesFromLocalStorage = localStorage.getItem("employees")
        if (employeesFromLocalStorage) {
            setRowData(JSON.parse(employeesFromLocalStorage))
        }
    }, []) // Le tableau vide signifie que cela se produit au montage du composant
    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
            <AgGridReact
                rowData={rowData} // Utilise les données des employés depuis le localStorage
                columnDefs={columnDefs} // Définition des colonnes
                defaultColDef={defaultColDef} // Paramètres par défaut
                pagination={true} // Active la pagination
                paginationPageSize={10} // Nombre d'éléments par page
                paginationPageSizeSelector={[10, 20, 50]}
            />
        </div>
    )
}
export default EmployeeTable
