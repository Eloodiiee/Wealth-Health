import { Table } from "antd"
import DataMocked from "../../data/Data_Mocked"

const EmployeeTable = () => {
    const employees = DataMocked.map((employee) => {
        const { id, firstName, lastName, dateOfBirth, startDate, department, address, city, state, zipCode } = employee
        return {
            key: id,
            id,
            firstName,
            lastName,
            dateOfBirth,
            startDate,
            department,
            address,
            city,
            state,
            zipCode,
        }
    })
    const columns = [
        {
            title: "First name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Start date",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Date of Birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            title: "Street",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "State",
            dataIndex: "state",
            key: "state",
        },
        {
            title: "Zip Code",
            dataIndex: "zipCode",
            key: "zipCode",
        },
    ]

    return (
        <>
            <Table dataSource={employees} columns={columns} />
        </>
    )
}

export default EmployeeTable
