import React, { useState, useRef, useEffect, useParams } from 'react'
import {Card, Button, Container, Row, Col, Image, Modal, InputGroup, FormControl} from 'react-bootstrap'
import fotoPet from '../assets/images/pet-1.png'
import imgWarning from '../assets/images/img_alert.png'
import imgDanger from '../assets/images/img_close.png'
import imgSucess from '../assets/images/img_check.png'
import pawFront from '../assets/images/img_paw.png'
import pawBack from '../assets/images/img_paw2.png'
import iconMale from '../assets/images/icon_male.png'
import iconFemale from '../assets/images/femea.png'
import apiPets from '../apiPet';
import apiUsers from '../apiUsers'
import imageModalRegisterPet from '../assets/images/img_register_pet.png';
import axios from 'axios';
import sucess from '../assets/images/sucess.gif'
import InputMask from 'react-input-mask';


function PetItemEdit(props){

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

            const [lgShowEditPet, setLgShowEditPet] = useState(false);

            const handleCloseEditPet = () => setLgShowEditPet(false);
            
            const [sucessmodalShow, setModalShow] = useState(false);

            const handleClosesucess = () => setModalShow(false);
            
            const [modalDislikeShow, setModalDislikeShow] = useState(false);

            const handleCloseModalDislike = () => setModalDislikeShow(false);

            const divRef = useRef();
            
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

                //Guarda o pet que queremos salvar
                const [petData, setPetData] = useState({
                    nomePet: props.nome,
                    idadePet: props.idade,
                    especiePet: props.especie,
                    racaPet: props.raca,
                    portePet: props.porteComplet,
                    sexoPet: props.sexo,
                    castradoPet: props.castrado,
                    sociavelPet: props.sociavel,
                    comportamentoPet: props.comportamento,
                    is_Pet_WeekPet: "",
                    fotoPerfilPet: props.imagem
                })
                
         //buscar meus pets
          useEffect(() =>{
            async function buscarPets(){
                const resposta = await apiPets.get("/meus-pets");
                setPets(resposta.data);
                console.log("OLHA O QUE VEIO DA API!!", resposta.data)
            }
            buscarPets();
        }, []);

                //Captura os dados do form para guardar no petData
            function handle2(e){
                const newPet = {...petData};
                newPet[e.target.id] = e.target.value;
                setPetData(newPet);
                //console.log("OLHA O QUE INDO PRO petData",newPet);
            }
    
            function atualizarPet(e){
                e.preventDefault()
                apiPets.patch("",{
                    id: props.id,
                    nome: petData.nomePet,
                    idade: petData.idadePet,
                    especie: petData.especiePet,
                    raca: petData.racaPet,
                    porte: petData.portePet,
                    sexo: petData.sexoPet,
                    castrado: petData.castradoPet,
                    sociavel: true,
                    comportamento: petData.comportamentoPet,
                    is_Pet_Week: hasPetWeek,
                    fotoPerfil: petData.fotoPerfilPet,
                }).then(resposta => {
                    console.log("Registro alterado!");
                    if(resposta.status == 200){
                        handleCloseEditPet();
                        setModalShow(true);

                        setTimeout(() => {
                            handleClosesucess();
                            window.location.reload();
                        }, 1500);
                        

                    }else if(resposta.status == 404){
                        alert("Aguarde um momento, nosso sistema está sobrecarregado!");
                    }
                })
        
            }

            
            function atualizarPetWeek(e){
                e.preventDefault()
                apiUsers.patch("/registrarData/"+props.id,{
                }).then(resposta => {
                    console.log("Registro alterado!");
                    if(resposta.status == 200){
                        handleCloseEditPet();
                        setModalShow(true);

                        setTimeout(() => {
                            handleClosesucess();
                            window.location.reload();
                        }, 1500);
                        

                    }else if(resposta.status == 404){
                        alert("Aguarde um momento, nosso sistema está sobrecarregado!");
                    }
                })
        
            }

        function deletar(){
            apiPets.delete(`/${props.id}`).then(resposta => {

                setModalShow(true);

                    setTimeout(() => {
                        handleClosesucess();
                        window.location.reload();
                    }, 1500);

            })
        }

    return(
        <>
            <Card className="card_pet">
                <Card.Img variant="top" className="imgAnimais" src={"data:image/png;base64," + props.imagem} />
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
                                    <label id="castrado"><b>Castrado(a):</b> {props.castradoCompl}</label>
                                    <br></br>
                                    <label><b>Comportamento:</b> {props.comportamento}</label>
                                    <br></br>
                                    <label id="porte"><b>Porte:</b> {props.porte}</label>
                                    <br></br>
                                    <label id="faixaEtaria"><b>Faixa etária:</b> {props.faixa}</label>
                                </div>
                            </Card.Text>
                            </Col>
                            <Col sm={6}>
                            <div className="btnShowMorePet">
                                <Button className="btnShowMore botton_pet mt-5"  onClick={() => setLgShowEditPet(true)} variant="primary">Editar</Button>
                                <Button className="btnShowMore botton_pet mt-1" variant="primary" onClick={() =>  setModalDislikeShow(true)}>Apagar</Button>
                                <br></br>
                                <label id="faixaEtaria" className="btnPetWeek"><b>{props.isPetWeek}</b></label>
                            </div>
                            </Col>
                        </Row>
                    </Card.Body>
            </Card>


                      {/* Modal Edit Pet */}

                      <Modal
                        size="lg"
                        show={lgShowEditPet}
                        onHide={() => setLgShowEditPet(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                        centered
                    > 
                <Modal.Body>
                <div id="detailsPet" tabindex="-1" aria-labelledby="exampleModalLabel" >

                <div className="modal-body flip-modal" ref={divRef}>
                                      
                                      <div id="flipInner" className="flip-modal-inner">
                                      <form className="input-center formRegisterPet">

                                       <div id="front-modal"  className="flip-modal-front">
                                   
                                       <Image style={{display : 'block'}}  id="img-register-pet" className="img-fluid img-edit-pet" src={props.imagem}  fluid />
                                       <div id="div-register-pet" className="form-group container"> 
                                           <br></br>
                                            <h1 id="title" className="title-modal-register-pet">Edite seu Pet</h1>
                                            
                                                                    <input onChange={(e) => handle2(e)} id="nomePet" defaultValue={props.nome} value={petData.nome} type="text" className="form-control input-style-register input-nickname-pet input-placeholder" required />                                                               
                                                                    <select required  className="form-control select-species" onChange={(e) => handle2(e)} id="especiePet" defaultValue={props.especie} value={petData.especie}>
                                                                    <option disabled selected value="">Espécie</option>
                                                                    <option value="Cachorro">Cachorro</option>
                                                                    <option value="Gato">Gato</option>
                                                                    </select>
                                                                <br/>
                                                            
                                                                    <input onChange={(e) => handle2(e)} id="racaPet" value={petData.raca} defaultValue={props.raca} type="text" className="form-control input-style-register input-breed-pet input-placeholder" required placeholder="Raça:" />
                                                                    <InputMask  mask="99" maskChar={null} onChange={(e) => handle2(e)} id="idadePet" value={petData.idade} defaultValue={props.idade} type="text" className="form-control input-style-register input-age-pet input-placeholder" maxlength="2" required placeholder="Idade:"/>
                                                            <br></br>
                                                                
                                                                    <select className="form-control select-genre-pet" onChange={(e) => handle2(e)} id="sexoPet" value={petData.sexo} defaultValue={props.sexo} required>
                                                                    <option disabled selected value="">Sexo</option>
                                                                    <option value="F">Fêmea</option>
                                                                    <option value="M">Macho</option>
                                                                    </select>
                                                                    <select className="form-control select-port-pet" onChange={(e) => handle2(e)} id="portePet" value={petData.porte} defaultValue={props.porteComplet} required>
                                                                    <option disabled selected value="">Porte</option>
                                                                    <option value="P">Pequeno</option>
                                                                    <option value="M">Médio</option>
                                                                    <option value="G">Grande</option>
                                                                    </select>
                                                                
                                                            
                                                                    <select  className="form-control select-behavior-pet" onChange={(e) => handle2(e)} id="comportamentoPet" value={petData.comportamento} defaultValue={props.comportamento} required>
                                                                    <option disabled selected value="">Comportamento</option>
                                                                    <option value="Dócil">Dócil</option>
                                                                    <option value="Bravo">Bravo</option>
                                                                    <option value="Amigavel">Amigável</option>
                                                                    <option value="Calmo">Calmo</option>
                                                                    <option value="Hiperativo">Hiperativo</option>
                                                                    </select>
                                                                
                                                        

                                                    <label className="form-label text-image2" for="customFile">Escolha a imagem do seu pet</label>
                                                    <input onChange={(e) => handle2(e)} id="fotoPerfilPet" value={petData.imagem} defaultValue={props.imagem} type="text" className="form-control input-style-register input-foto-register input-placeholder" required placeholder="URL da sua foto:"/>

                                                    <div className="group-radio-sociable" onChange={(e) => handle2(e)} id="sociavelPet" value={petData.sociavel}>
                                                        <span className="text-sociable-pet">Sociável: </span>
                                                        <div className="form-check form-check-inline radio-sociable-pet"> 
                                                            <input
                                                            className="form-check-input input-pet"
                                                            type="radio"
                                                            name="radioSociable"
                                                            id="sociavelPet"    
                                                            value="true"
                                                            checked
                                                            required
                                                            />
                                                            <label className="form-check-label label-radio" for="inlineRadioSociable1">Sim</label>
                                                        </div>
                                                        
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="radioSociable"
                                                            id="sociavelPet"
                                                            value="false"
                                                            required
                                                            />
                                                            <label className="form-check-label label-radio" for="inlineRadioSociable2">Não</label>
                                                        </div>
                                                    </div>

                                                    <div className="group-radio-castrated" onChange={(e) => handle2(e)} id="castradoPet" value={petData.castrado}>
                                                        <span className="text-castrated-pet">Castrado: </span>
                                                        <div className="form-check form-check-inline radio-sociable-pet" >
                                                            <input
                                                            className="form-check-input input-pet"
                                                            type="radio"
                                                            name="radioCastrated"
                                                            id="castradoPet"
                                                            value="true"
                                                            checked
                                                            required
                                                            />
                                                            <label className="form-check-label label-radio" for="inlineRadioCastrated1">Sim</label>
                                                        </div>
                                                        
                                                        <div className="form-check form-check-inline" >
                                                            <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="radioCastrated"
                                                            id="castradoPet"
                                                            value="false"
                                                            required
                                                            />
                                                            <label className="form-check-label label-radio" for="inlineRadioCastrated2">Não</label>
                                                        </div>
                                                    </div>
                                                    <button type="submit"className="btn btn-primary btn-register-pet-petweek" onClick={atualizarPetWeek} id="btn-register-pet" >Em PetWeek</button>

                                                    <button type="submit" onClick={atualizarPet} defaultValue={"false"}  className="btn btn-primary btn-register-pet btn-register-pet-update" id="btn-register-pet" >Salvar</button>
                                            
                                            </div>

                                      </div>
                    
                                      </form>
                                  </div>
                              </div>
                              </div>
                </Modal.Body>
            </Modal>

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
                        <h2>Tem certeza que deseja deletar o pet?</h2>
                        <input className="noPet" type="text" id="getIdAdotante" value={props.id}></input>
                        <input className="noPet"  type="text" id="getIdPet" value={props.id_pet}></input>
                        <br></br>
                        </div>
                        
                        
                            <div className="divFooterModal">
                            <Button variant="secondary" onClick={() =>  handleCloseModalDislike()}>Cancelar</Button>
                            <Button variant="primary" className="btnlikePet" onClick={deletar}>Confirmar</Button>
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
 export default PetItemEdit;