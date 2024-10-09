import { Select } from "antd"
import PropTypes from "prop-types"
import { useState } from "react"

const DropdownMenu = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0].name) // Par défaut sur le premier élément

    const handleChange = (value) => {
        setSelectedOption(value) // Met à jour la valeur sélectionnée
    }

    return (
        <Select
            defaultValue={options[0].name}
            style={{ width: "100%" }}
            onChange={handleChange}
            value={selectedOption} // Valeur sélectionnée
        >
            {options.map((option, index) => (
                <Select.Option key={index} value={option.name}>
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    )
}

DropdownMenu.propTypes = {
    options: PropTypes.array.isRequired,
}

export default DropdownMenu
