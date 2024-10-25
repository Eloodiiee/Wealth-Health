import { Modal, Button, ButtonContainer } from "elaspark-ui"
import PropTypes from "prop-types"
import logo from "../../images/Wealth_Health2.png"

const FormModal = ({ isOpen, toggleModal, modalMessage = "No message available" }) => {
    return (
        <>
            {isOpen && (
                <Modal
                    title={{ text: "Wealth Health", size: "2", align: "center" }}
                    centered
                    logoSrc={logo}
                    size="m-m"
                    backdropStyle="dark-opaque"
                    styleType="style-4"
                    animation="border-neon"
                    borderRadius="br-lg"
                    onClose={toggleModal}
                    ariaLabelledBy="modalTitle"
                    showCloseButton={true}
                    closeAlign="right"
                    closeButtonStyleType="btn-5"
                    closeButtonAnimation="pulse"
                >
                    <h1 className="t-2 center">{modalMessage && modalMessage.includes("successfully added") ? "Confirmation" : "Error"}</h1>
                    <p className="p-1 center">{modalMessage || "An unknown error occurred."}</p>
                    <ButtonContainer align="center">
                        <Button size="b-l" styleType="btn-2" animation="scaleUp" onClick={toggleModal}>
                            OK
                        </Button>
                    </ButtonContainer>
                </Modal>
            )}
        </>
    )
}
FormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    modalMessage: PropTypes.string,
}

export default FormModal
