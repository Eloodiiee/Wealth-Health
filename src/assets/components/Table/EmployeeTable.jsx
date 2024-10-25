import { useMemo, useState, useEffect, useRef } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

const EmployeeTable = () => {
    const gridApi = useRef(null) // Pour stocker l'API de la grille

    const onGridReady = (params) => {
        gridApi.current = params.api // Stocke l'API de la grille
    }

    // Formatter pour les dates au format yyyy/mm/dd
    const dateFormatter = (params) => {
        if (!params.value) return ""
        const date = new Date(params.value)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}/${month}/${day}`
    }
    // Configuration des colonnes
    const [columnDefs] = useState([
        { field: "firstName", headerName: "First Name", sortable: true, filter: true, width: 150 },
        { field: "lastName", headerName: "Last Name", sortable: true, filter: true, width: 150 },
        {
            field: "startDate",
            headerName: "Start Date",
            sortable: true,
            filter: "agDateColumnFilter",
            floatingFilter: true,
            width: 200,
            valueFormatter: dateFormatter,
            floatingFilterComponentParams: {
                suppressFilterButton: true,
                onFilterTextBoxChanged: (e, filterChangedCallback) => {
                    const value = e.target.value
                    const dateParts = value.split("/")
                    if (dateParts.length === 3) {
                        const date = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`)
                        filterChangedCallback({ date })
                    } else {
                        filterChangedCallback({ date: null })
                    }
                },
            },
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const cellDate = new Date(cellValue)
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1
                    }
                    return 0
                },
            },
        },
        {
            field: "birthDate",
            headerName: "Date of Birth",
            sortable: true,
            filter: "agDateColumnFilter",
            floatingFilter: true,
            width: 200,
            valueFormatter: dateFormatter,
            floatingFilterComponentParams: {
                suppressFilterButton: true,
                onFilterTextBoxChanged: (e, filterChangedCallback) => {
                    const value = e.target.value
                    const dateParts = value.split("/")
                    if (dateParts.length === 3) {
                        const date = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`)
                        filterChangedCallback({ date })
                    } else {
                        filterChangedCallback({ date: null })
                    }
                },
            },
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const cellDate = new Date(cellValue)
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1
                    }
                    return 0
                },
            },
        },

        { field: "department", headerName: "Department", sortable: true, filter: true, width: 150 },
        { field: "address", headerName: "Street", sortable: true, filter: true, width: 200 },
        { field: "city", headerName: "City", sortable: true, filter: true, width: 150 },
        { field: "state", headerName: "State", sortable: true, filter: true, width: 150 },
        { field: "zipCode", headerName: "Zip Code", sortable: true, filter: true, width: 150 },
    ])

    // Configuration des colonnes par default

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            filter: true,
            floatingFilter: true,
        }),
        []
    )
    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}/${month}/${day}`
    }
    // Permet de sauvegarder les donnés des employés
    const [rowData, setRowData] = useState([])
    useEffect(() => {
        const employeesFromLocalStorage = localStorage.getItem("employees")
        if (employeesFromLocalStorage) {
            const parsedData = JSON.parse(employeesFromLocalStorage).map((employee) => ({
                ...employee,
                startDate: formatDate(employee.startDate),
                birthDate: formatDate(employee.birthDate),
            }))
            setRowData(parsedData)
        }
    }, [])

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50]}
                onGridReady={onGridReady}
            />
        </div>
    )
}

export default EmployeeTable
