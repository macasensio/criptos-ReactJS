import styled from "@emotion/styled"

const MensajeError = styled.p`
    background-color: #B7322C;
    padding: 15px;
    font-size: 18px;
    color: #fff;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    text-align: center;
`

const Error = ({children}) => {
    return (
        <MensajeError>{children}</MensajeError>
    )
}

export default Error