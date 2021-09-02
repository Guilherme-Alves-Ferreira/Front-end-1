import React, { useState } from 'react';
import {Modal, Button, Image, Container, Row, Col, FormControl, Form, Navbar, Dropdown, DropdownButton} from 'react-bootstrap';
import axios from 'axios'
import apiPets from '../apiPet';
import apiUsers from '../apiUsers';


function MatchItemAdotante(props) {

    return (

        
        <>
            <Container >
                <div className="teste mt-4">
                    <Row>
                        <Col sm={3}>
                            <img src={props.imagem1} alt="" className="mt-4 img_match_pessoa"/>
                        </Col>
                        <Col sm={5} className="descricao mt-4">
                            <h5>{props.nome}</h5>
                            <span><b>Informações do doador:</b></span>
                            <br/>
                            <span>{props.infoEmail}</span>
                            <br/>
                            <span>{props.infoTel}</span>
                        </Col>
                        <Col sm={4}>
                            <img src={props.imagem} alt="" className="mt-4 img_match"/>
                            <p>{props.nome_pet}</p>
                        </Col>
                    </Row>
                </div>
            </Container>


        </>
    );
}
export default MatchItemAdotante;