import React, { useState } from 'react';
import {Modal, Button, Image, Container, Row, Col, FormControl, Form, Navbar, Dropdown, DropdownButton} from 'react-bootstrap';
import axios from 'axios'
import apiPets from '../apiPet';
import apiUsers from '../apiUsers';


function MatchItem(props) {
    return (

        
        <>
            <Container>
                <div className="teste mt-4">
                    <Row>
                        <Col sm={2} className="primeira-col">
                            <img src={props.imagemAdotante} alt="" className="mt-4 img_match_pessoa"/>
                        </Col>
                        <Col sm={2} className="descricao mt-4">
                            <span><b>Adotante:</b></span>
                            <br/>
                            <br/>
                            <h5>{props.nomeAdotante}</h5>
                            <span>{props.infoEmailAdotante}</span>
                            <br/>
                            <span>{props.infoTelAdotante}</span>
                            <br/>
                            <span>{props.isPetWeek}</span>
                        </Col>
                        <Col sm={3}>
                        <h3 className="mt-3">Deu Match!</h3>
                            <img src={props.imagemPet} alt="" className="mt-4 img_match"/>
                            <p>{props.nome_pet}</p>
                        </Col>
                        <Col sm={2} className="descricao2 mt-4">
                            <span><b>Doador:</b></span>
                            <br/>
                            <br/>
                            <h5>{props.nomeDoador}</h5>
                            <span>{props.infoEmailDoador}</span>
                            <br/>
                            <span>{props.infoTelDoador}</span>
                        </Col>
                        <Col sm={2}>
                            <img src={props.imagemDoador} alt="" className="mt-4 img_match_pessoa"/>
                        </Col>
                      
                    </Row>
                </div>
            </Container>
        </>
    );
}
export default MatchItem;