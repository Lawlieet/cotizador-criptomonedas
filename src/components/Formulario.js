import React from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';



const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width:100%;
    border-radius:10px;
    color: #FFF;
    transition: background-color .5s ease;

    &:hover{
        background-color: #325ac0;
        cursor: pointer;
    }
`;


const Formulario = () => {

    const MONEDAS=[
        {codigo:'USD',nombre:'Dolar USA'},
        {codigo:'MXN',nombre:'Peso Mexicano'},
        {codigo:'EUR',nombre:'EURO'},
        {codigo:'GBP',nombre:'Libra Esterlina'}
    ]

    // Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda','',MONEDAS)

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '');

    return (
        <form >
            <SelectMonedas/>
            <SelectCripto />
            <Boton
                type="submit"
                value="calcular"
            ></Boton>
        </form>
    )
}

export default Formulario
