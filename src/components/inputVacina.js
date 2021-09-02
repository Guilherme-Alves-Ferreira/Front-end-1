import React, { useState, useRef, useEffect } from 'react'

function InputVacina(props){
      
    return(
        <>      
                <input type="email" className="form-control input-vaccine input-placeholder" disabled placeholder={props.nome} />
                <input type="email" className="form-control input-vaccine-date input-placeholder" disabled placeholder={props.data} />
                <input type="email" className="form-control input-vaccine-dose input-placeholder" disabled placeholder={props.dose} />

        </>
    );
}
 export default InputVacina;