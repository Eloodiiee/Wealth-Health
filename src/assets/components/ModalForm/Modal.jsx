import { Modal } from "elaspark-ui"
import PropTypes from "prop-types"

const FormModal = ({ isOpen, toggleModal }) => {
    return (
        <>
            {isOpen && (
                <Modal
                    size="m-s"
                    borderRadius="br-sm"
                    styleType="style-6"
                    animation="fadeIn"
                    title={{ text: "Titre de la modale", size: "2" }}
                    paragraph={{ text: "Employee Created!", size: "p-2", align: "center" }}
                    onClose={toggleModal}
                >
                    <button onClick={toggleModal}>Ok</button>
                </Modal>
            )}
        </>
    )
}
FormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
}
export default FormModal
