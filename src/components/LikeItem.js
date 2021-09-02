import React, { useState } from 'react';
import {Modal, Button, Image, Container, Row, Col, FormControl, Form, Navbar, Dropdown, DropdownButton} from 'react-bootstrap';
import axios from 'axios'
import apiPets from '../apiPet';
import apiUsers from '../apiUsers';
import sucess from '../assets/images/sucess.gif'


function MatchItem(props) {

    const [sucessmodalShow, setModalShow] = useState(false);

    const handleClosesucess = () => setModalShow(false);

    function darDislike(getIdAdotante, getIdPet){
        apiUsers.delete(`/gostarAdotante/${getIdAdotante}/${getIdPet}/false`,{
        }).then(resposta => {
            if(resposta.status == 200){
                setModalShow(true);
                setTimeout(() => {
                    handleClosesucess();
                    window.location.reload();
                }, 1500);
            }else if(resposta.status == 429){
                alert("Aguarde um momento, nosso sistema está sobrecarregado!");
            }
        })
    }

    function darLike(getIdAdotante, getIdPet){
        apiUsers.patch(`/gostarAdotante/${getIdAdotante}/${getIdPet}`,{
        }).then(resposta => {
            if(resposta.status == 200){
                setModalShow(true);
                    setTimeout(() => {
                        handleClosesucess();
                        window.location.reload();
                    }, 3500);
            }else if(resposta.status == 429){
                alert("Aguarde um momento, nosso sistema está sobrecarregado!");
            }
        })
    }

    const [modalDislikeShow, setModalDislikeShow] = useState(false);

    const handleCloseModalDislike = () => setModalDislikeShow(false);

    const [modalLikeShow, setModalLikeShow] = useState(false);

    const handleCloseModalLike = () => setModalLikeShow(false);



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
                            <span><b>Informações do usuário:</b></span>
                            <br/>
                            <span>{props.infoEmail}</span>
                            <br/>
                            <span>{props.infoTel}</span>
                            <br/>
                            <span>{props.isPetWeek}</span>
                        </Col>
                        <Col sm={4}>
                            <img src={props.imagem} alt="" className="mt-4 img_match"/>
                            <p>{props.nome_pet}</p>
                            <Button variant="success" className="btn-like" onClick={() =>  setModalLikeShow(true)}>Like</Button>
                            <Button variant="danger" className="btn-dislike" onClick={() =>  setModalDislikeShow(true)}>Dislike</Button>
                        </Col>
                    </Row>
                </div>
            </Container>


                     {/* Modal Dislike */}

                     <Modal
                    size="sm"
                    show={modalDislikeShow}
                    onHide={() => setModalDislikeShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <div className="modal-content-option" >
                        <Modal.Body>
                        <br></br>
                        <br></br>

                        <div className="divBodyModal">
                        <h2>Tem certeza que deseja dar <span className="dislike">dislike</span>?</h2>
                        <input className="noPet" type="text" id="getIdAdotante" value={props.id}></input>
                        <input className="noPet"  type="text" id="getIdPet" value={props.id_pet}></input>
                        <br></br>
                        </div>
                        
                        
                            <div className="divFooterModal">
                            <Button variant="secondary" onClick={() =>  handleCloseModalDislike()}>Cancelar</Button>
                            <Button variant="primary" className="btnlikePet" onClick={() => darDislike( document.getElementById("getIdAdotante").value,document.getElementById("getIdPet").value)}>Confirmar</Button>
                            </div>
                        </Modal.Body>
                        </div>

                </Modal>


                               {/* Modal Dislike */}

                 <Modal
                    size="sm"
                    show={modalLikeShow}
                    onHide={() => setModalLikeShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <div className="modal-content-option" >
                        <Modal.Body>
                            <br></br>
                            <br></br>

                            <div className="divBodyModal">
                            <h2>Tem certeza que deseja dar <span className="like">like</span>?</h2>
                            <input className="noPet" type="text" id="getIdAdotante" value={props.id}></input>
                            <input className="noPet"  type="text" id="getIdPet" value={props.id_pet}></input>
                            <br></br>
                            </div>
                            
                                <div className="divFooterModal">
                                    <Button variant="secondary" onClick={() =>  handleCloseModalLike()}>Cancelar</Button>
                                    <Button variant="primary" className="btnlikePet" onClick={() => darLike( document.getElementById("getIdAdotante").value,document.getElementById("getIdPet").value)}>Confirmar</Button>
                                </div>
                        </Modal.Body>
                    </div>

                </Modal>

                {/* Modal Sucesso */}

            <Modal
                    size="sm"
                    show={sucessmodalShow}
                    onHide={() => setModalShow(false)}
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <div className="modal-content-sucess" >
                        <Modal.Body>
                            <img src={sucess} className="modal-sucess"/>
                        </Modal.Body>
                    </div>
            </Modal>
        </>
    );
}
export default MatchItem;