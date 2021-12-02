import React, { useState, useRef, useEffect } from 'react'
import {Card, Button, Container, Row, Col, Image, Modal, InputGroup} from 'react-bootstrap'
import fotoPet from '../assets/images/pet-1.png'
import imgWarning from '../assets/images/img_alert.png'
import imgDanger from '../assets/images/img_close.png'
import imgSucess from '../assets/images/img_check.png'
import pawFront from '../assets/images/img_paw.png'
import pawBack from '../assets/images/img_paw2.png'
import iconMale from '../assets/images/icon_male.png'
import iconFemale from '../assets/images/femea.png'
import sucess from '../assets/images/sucess.gif'

import apiPets from '../apiPet';
import apiVacinas from '../apiVacinas'
import InputVacina from './inputVacina'
import axios from 'axios';




function PetItem(props){

            //guardar os pets
            const [pets, setPets] = useState([]);

            //buscar os pets
            useEffect(() =>{
                async function buscarPets(){
                    const resposta = await apiPets.get("");
                    setPets(resposta.data);
                    //console.log("OLHA O QUE VEIO DA API!!", resposta.data)
                }
                buscarPets();
            }, []);

            
            const [sucessmodalShow, setModalShow] = useState(false);

            const handleClosesucess = () => setModalShow(false);

            const [modalPetWeekShow, setModalPetWeekShow] = useState(false);

            const handleCloseModalPetWeek = () => setModalPetWeekShow(false);

      

         
          //buscar as vacinas          
          var idModalPet;
         
        function openModalPet(){
            setLgShowDetailPet(true)
        }
        
     
        //guardar as vacinas
        const [vacinas, setVacinas] = useState([]);

        function getId() {
            idModalPet = document.getElementById("idPetModal").value;
            console.log("ID DO PET"+idModalPet)
            async function buscarVacinas(){
                const resposta = await apiVacinas.get(`/`+idModalPet);
                setVacinas(resposta.data);
            }
            buscarVacinas();
        }

        function openModalPetWeek() {
            setModalPetWeekShow(true)
            handleCloseDetailPet()
        }

        function chamarLike(){
            idModalPet = document.getElementById("getIdPet").value;
            console.log("ID DO PET LIKE"+idModalPet)
            darLike()
    }

      
        var hasPetWeek = false;
        function verficicar() {
            if(document.getElementById("petWeekPet").checked){
                console.log("checked")
                hasPetWeek = true
            }else{
                console.log("unchecked")
                hasPetWeek = false
            }
        }

       //Enviar chamando a requisição HTTP POST
       function darLike(e){
        axios.post("http://52.3.6.109:8080/app/usuarios/gostarPet", {
            idPet: idModalPet,
            querPetWek: hasPetWeek
        }).then(resposta => {
            console.log("OLHA A RESPOSTA!", resposta.data)
            handleCloseModalPetWeek()
        });
    }



  
    const [lgShowDetailPet, setLgShowDetailPet] = useState(false);

    const handleCloseDetailPet = () => setLgShowDetailPet(false);

    const divRef = useRef();

    function teste(){
        document.getElementById('flipInner').style.cssText = "transform: rotateY(180deg);";
        document.getElementById('front-modal').style.display = "none";
        document.getElementById('back-modal').style.display = "block";
        getId();
    }

    function teste2(){
        document.getElementById('flipInner').style.cssText = "transform: rotateY(0deg);";
        document.getElementById('front-modal').style.display = "block";
        document.getElementById('back-modal').style.display = "none";
    }
    


    return(
        <>
            <Card className="card_pet">
                <Card.Img variant="top" className="img-animais" src={props.imagem} />
                    <Card.Body>
                    <Row>
                        <Col sm={6}>
                            <Card.Title className="title-name">{props.nome}</Card.Title>
                        </Col>
                        <Col sm={6}>
                            <label>{props.local}</label>
                            <Image id="iconSexPet" className="iconSexPet" src={props.sexoIcon}/>
                        </Col>
                            <Col sm={6}>
                            <Card.Text>
                                <div className="infoPet">
                                    <label className="titulo">Características:</label>
                                    <label id="castrado"><b> Castrado(a):</b> {props.castrado}</label>
                                    <br></br>
                                    <label> <b> Comportamento:</b> {props.comportamento}</label>
                                    <br></br>
                                    <label id="porte"> <b> Porte:</b> {props.porte}</label>
                                    <br></br>
                                    <label id="faixaEtaria"> <b> Faixa etária:</b> {props.faixa}</label>
                                </div>
                            </Card.Text>
                            </Col>
                            <Col sm={6}>
                            <div className="btnShowMorePet">
                                <Button onClick={() => openModalPet()} className="btnShowMore botton_pet mt-5" variant="primary">Ver mais</Button>
                            </div>
                            </Col>
                        </Row>
                    </Card.Body>
            </Card>
            

            {/* Modal Detail Pet */}

            <Modal
                size="lg"
                show={lgShowDetailPet}
                onHide={() => setLgShowDetailPet(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            > 
                <Modal.Body>
                <div id="detailsPet" tabindex="-1" aria-labelledby="exampleModalLabel" >
                <div class="modal-content modal-pet-content-detail">
                    <div class="modal-header container">
                    <button
                    type="button"
                    class="btn-close container"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseDetailPet}
                  ></button>
                </div>
                <div className="modal-body flip-modal" ref={divRef}>
                                      
                                      <div id="flipInner" className="flip-modal-inner">
                                       <div id="front-modal"  className="flip-modal-front">
                                           <Row>
                                            <Col sm={5}>
                                              <Image src={"data:image/png;base64," + props.imagem} className="img-fluid img-pet-modal" alt="" />
                                              <input id="idPetModal" className="idPetModal" value={props.id}></input>
                                            </Col>
                                            <Col sm={7}>
                                              <h1 className="title-name-pet">{props.nome}</h1>
                                              <Image id="iconSexPet" src={props.sexoIcon} className="img-fluid img-pet-genre" alt="" />
                                                <div className="row  div4">
                                                    <div id="quadrado1" className="col-md-1 quadrado1">
                                                      {props.porteModal}
                                                    </div>
                                                </div>
                                                <Image onClick={() => teste()} src={pawFront} alt="" className="img-flip"/>
                                        <table>
                                            <tr>
                                                <h3 className="title-age-pet">Idade: <span className="txtDetailPet" >{props.idade} anos</span></h3>
                                            </tr>
                                            <tr>
                                              <h3 className="title-breed-pet">Raça: <span className="txtDetailPet" >{props.raca}</span></h3>
                                            </tr>
                                            <tr>
                                              <h3 className="title-castrado-pet">Castrado: <span className="txtDetailPet" >{props.castrado}</span></h3>
                                            </tr>
                                            <tr>
                                              <h3 className="title-comportamento-pet">Comportamento: <span className="txtDetailPet" >{props.comportamento}</span></h3>
                                            </tr>
                                            <tr>
                                              <button onClick={() => openModalPetWeek()} className="btn btn-primary btn-like-pet">Curtir <i  className="far fa-thumbs-up"></i> </button>
                                            </tr>
                                        </table>
                                        </Col>
                                              </Row>
                                      </div>
                                      <div id="back-modal"className="flip-modal-back">
              
                                          <h1 id="title" className="title-modal-vaccine" >Carteirinha de Vacinas</h1>

                                          <Image className="img-flip" src={pawBack} onClick={() => teste2()} alt=""/>

                                          <div className="divVaccinesRegisters">
                                          <h5 className="title-vaccine">Vacina</h5>
                                          <h5 className="title-vaccine-date">Data</h5>
                                          <h5 className="title-vaccine-dose">Dose</h5>
                                          {vacinas.map((vacina) => ( 
                                             
                                             
                                          <InputVacina 
                                          nome={vacina.nome}
                                          data={vacina.data}
                                          dose={vacina.dose}
                                          />
                                          
                                          ))}
                                  
                                          </div>
                                      </div>
              
                                  </div>
                          
                              </div>
                              </div>
                </div>
                </Modal.Body>
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

                    {/* Modal Confirmar petweek */}

                    <Modal
                    size="sm"
                    show={modalPetWeekShow}
                    onHide={() => setModalPetWeekShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <div className="modal-content-option" >
                        <Modal.Body>
                        <br></br>
                        <br></br>

                        <div className="divBodyModal">
                        <h2>Pretende participar do PetWeek?</h2>
                        <InputGroup className="checkPetWeek mt-3">                                                                                   
                            <span className="text-pet-week-pet">PetWeek</span>
                           <input type="checkbox" onClick={() => verficicar()} id="petWeekPet"/>                                                                         
                          </InputGroup> 
                        <input className="noPet" type="text" id="getIdPet" value={props.id}></input>
                        <br></br>
                        </div>
                        
                        
                            <div className="divFooterModal">
                            <Button variant="secondary" onClick={() => handleCloseModalPetWeek()}>Cancelar</Button>
                            <Button variant="primary" className="btnlikePet" onClick={() => chamarLike()}>Confirmar</Button>
                            </div>
                        </Modal.Body>
                        </div>

            </Modal>

        </>
    );
}
 export default PetItem;