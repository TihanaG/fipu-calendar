import styled from "styled-components";

const ModalBackground = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
`;

const ModalBody = styled.div`
    background-color: var(--white);
    margin: 10% auto;
    padding: 20px;
    width: 50%;
`;

export const Modal = ({ children, shouldShow, onRequestClose }) => {
    return (
        <>
            {shouldShow && (
                <ModalBackground onClick={onRequestClose}>
                    <ModalBody onClick={e => e.stopPropagation()}>{/** Kako se Modal nebi zatvarao kad koristenja */}
                        <button className="btn" onClick={onRequestClose}>Close</button>
                        {children}
                    </ModalBody>
                </ModalBackground>
            )}
        </>
    )
}