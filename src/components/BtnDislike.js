import React from 'react'
import {Link} from 'react-router-dom'

function BtnDislike(props){
    return(
    <Link to={props.destino}>
    <button className="btn-dislike">{props.texto}</button>
    </Link>
    )
}
export default BtnDislike;