import React from 'react';
import {Link} from 'react-router-dom'

function BtnVoltarErro(props){
    return(
        <Link to={props.destino}>
        <button type="button" class="btn-text-light-background">Voltar para o início</button>
        </Link>
    );
}

export default BtnVoltarErro;