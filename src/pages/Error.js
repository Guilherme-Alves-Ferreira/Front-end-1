import React from 'react'
import ErrorItem from '../components/ErrorItem'
import NavBar from '../components/NavBar'
import imagemErro from '../assets/images/background-cat-not-found.png'
import BtnVoltarErro from '../components/BtnVoltarErro'

function Error(){

    return(
        <>
        <NavBar/>
        <section id="home" className=" container">
            <ErrorItem imagem={imagemErro}/>
            <BtnVoltarErro destino="/pet" className="btn_erro"/>
        </section>
       </>
    );
}

export default Error;
