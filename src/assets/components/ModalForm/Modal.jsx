import { Modal, Button, ButtonContainer } from "elaspark-ui"
import PropTypes from "prop-types"
import logo from "../../images/Wealth_Health2.png"

const FormModal = ({ isOpen, toggleModal }) => {
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
}
export default FormModal
