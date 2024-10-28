import { useMemo, useState, useEffect, useRef } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

const EmployeeTable = () => {
    const gridApi = useRef(null)

    const onGridReady = (params) => {
        gridApi.current = params.api
    }

    const columnDefs = useMemo(
        () => [
            { field: "firstName", headerName: "First Name", sortable: true, filter: true, width: 150 },
            { field: "lastName", headerName: "Last Name", sortable: true, filter: true, width: 150 },
            {
                field: "startDate",
                headerName: "Start Date",
                sortable: true,
                filter: true,
                width: 200,
            },
            {
                field: "birthDate",
                headerName: "Date of Birth",
                sortable: true,
                filter: true,
                width: 200,
            },
            { field: "department", headerName: "Department", sortable: true, filter: true, width: 150 },
            { field: "address", headerName: "Street", sortable: true, filter: true, width: 200 },
            { field: "city", headerName: "City", sortable: true, filter: true, width: 150 },
            { field: "state", headerName: "State", sortable: true, filter: true, width: 150 },
            { field: "zipCode", headerName: "Zip Code", sortable: true, filter: true, width: 150 },
        ],
        []
    )

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            filter: true,
            floatingFilter: true,
        }),
        []
    )

    const paginationOptions = useMemo(
        () => ({
            pagination: true,
            paginationPageSize: 10,
            paginationPageSizeSelector: [10, 20, 50],
        }),
        []
    )

    const [rowData, setRowData] = useState([])
    useEffect(() => {
        const employeesFromLocalStorage = localStorage.getItem("employees")
        if (employeesFromLocalStorage) {
            const parsedData = JSON.parse(employeesFromLocalStorage).map((employee) => ({
                ...employee,
                startDate: employee.startDate,
                birthDate: employee.birthDate,
            }))
            setRowData(parsedData)
        }
    }, [])

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
            <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} {...paginationOptions} onGridReady={onGridReady} />
        </div>
    )
}

export default EmployeeTable
