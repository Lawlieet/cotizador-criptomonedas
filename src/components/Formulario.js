import React,{useEffect, useState} from 'react';
import styled from '@emotion/styled';

import Error from './Error'
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';



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

    // State del listado crypto
    const [listacripto, setGuardarCriptomonedas] = useState([]);
    const[ error, setGuardarError] =useState(false);

    const MONEDAS=[
        {codigo:'USD',nombre:'Dolar USA'},
        {codigo:'MXN',nombre:'Peso Mexicano'},
        {codigo:'EUR',nombre:'EURO'},
        {codigo:'GBP',nombre:'Libra Esterlina'}
    ]

    // Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda','',MONEDAS)

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    // Llamar a la API
    useEffect(()=>{
        const consultarAPI = async () =>{
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const resultado = await Axios.get(url)
            setGuardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI()
    },[])

    //Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()
        
        // Validar campos
        if(moneda === '' || criptomoneda === ''){
            setGuardarError(true);
            return
        }

        // Pasar los datos al componente principal
        setGuardarError(false);

    }

    return (
        <form 
            onSubmit={cotizarMoneda}
        >
            {
                error ? <Error mensaje="Todos los campos son obligatorios"/> : null
            }
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
