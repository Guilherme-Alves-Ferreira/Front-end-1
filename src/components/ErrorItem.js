import React from 'react'

function ErrorItem(props){

    return(
        <>
            <div className="div_text">
            <h1 className="frase_opps">Oops!</h1>
            <p className="frase_nao_encontrada">A página que você <br></br> procura não foi <br></br> encontrada.</p>
            
            </div>
            <div className="div_img">
                <img src={props.imagem} alt="cat-not-found"/>
            </div>
        </>
    );
}

export default ErrorItem;
