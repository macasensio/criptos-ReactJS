import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import ImagenCripto from './img/imagen-criptos.png'

import Formulario from "./components/Formulario"
import Resultado from "./components/Resultado"
import Spinner from "./components/Spinner"

//styles components
const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 992px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`

const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
`

const Heading = styled.h1`
    font-family: 'Lato', sans-serif;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    &::after{
        content: '';
        width: 100px;
        height: 6px;
        background-color: #66a2fe;
        display: block;
        margin: 10px auto 0 auto;
    }
`

function App() {

    const [monedas, setMonedas] = useState({})// es un objeto porque va a tener ambas monedas
    const [resultado, setResultado] = useState({})
    const [cargando, setCargando] = useState(false)

    //useEffect para que detecte cuando el objeto tenga algo
    useEffect(() => {
        //como se ejecuta al inicio, está vacío entonces vamos a chequear que el objeto tenga algo
        if(Object.keys(monedas).length > 0) {
            const cotizarCripto = async() => {
                setCargando(true)
                setResultado({})
                const {moneda, criptomoneda} = monedas
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setResultado(resultado.DISPLAY[criptomoneda][moneda])
                setCargando(false)
                }
            
            cotizarCripto()
        }
    }, [monedas])


    return (

        <Contenedor>
            <Imagen
                src={ImagenCripto}
                alt="Imagen criptomonedas"
            />

            <div>
                <Heading>Cotiza Criptomonedas al Instante</Heading>
                <Formulario 
                    setMonedas={setMonedas}
                />

                {cargando && <Spinner />}
                {resultado.PRICE && <Resultado resultado={resultado}/>}
                {/* cargamos el componente cuando resultado tenga algo */}
            </div>

        </Contenedor>

    )
}

export default App
