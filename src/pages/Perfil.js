import React, { useState, useEffect, useRef } from 'react'
import {Button, Container, Row, Col, Image, Carousel, Modal} from 'react-bootstrap'
import NavBar from '../components/NavBar'
import fotoP from '../assets/images/pessoa.png'
import PetItemEdit from '../components/PetItemEdit'
import PetItem from '../components/PetItem'
import PetItemLike from '../components/PetItemLike'
import foto1 from '../assets/images/cat1.jpg'
import macho from '../assets/images/macho.png'
import apiPets from '../apiPet';
import apiUsers from '../apiUsers';
import { useParams } from 'react-router'
import iconMale from '../assets/images/icon_male.png'
import iconFemale from '../assets/images/femea.png'
import imageModalRegisterPet from '../assets/images/img_register_pet.png';
import axios from 'axios';
import sucess from '../assets/images/sucess.gif'
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom'



{/* value={this.state.value} */}

function Perfil(props){

    const [lgShowRegisterPet, setLgShowRegisterPet] = useState(false);
    
    const [lgShowEditPet, setLgShowEditPet] = useState(false);

    const [sucessmodalShow, setModalShow] = useState(false);

    const handleClosesucess = () => setModalShow(false);

    const divRef = useRef();

    function goToVaccine(){
        document.getElementById('flipInner').style.cssText = "transform: rotateY(180deg);";
        document.getElementById('front-modal').style.display = "none";
        document.getElementById('back-modal').style.display = "block";

    }

    function goToRegisterPet(){
        document.getElementById('flipInner').style.cssText = "transform: rotateY(0deg);";
        document.getElementById('front-modal').style.display = "block";
        document.getElementById('back-modal').style.display = "none";

    } 

    //Guarda o pet que queremos salvar
    const [petData, setPetData] = useState({
        nomePet: "",
        idade: "",
        especie: "",
        raca: "",
        porte: "",
        sexo: "",
        castrado: "",
        sociavel: "",
        comportamento: "",
        is_Pet_Week: "",
        fotoPerfil: ""
    })

    //Captura os dados do form para guardar no petData
    function handle2(e){
        const newPet = {...petData};
        newPet[e.target.id] = e.target.value;
        setPetData(newPet);
        //console.log("OLHA O QUE INDO PRO petData",newPet);
    }

    //Enviar chamando a requisição HTTP POST
    function enviar(e){
        e.preventDefault(); //para não atualizar a tela quando for chamada a função
        axios.post("http://localhost:8080/app/pets", {
            nome: petData.nomePet,
            idade: petData.idadePet,
            especie: petData.especiePet,
            raca: petData.racaPet,
            porte: petData.portePet,
            sexo: petData.sexoPet,
            castrado: petData.castradoPet,
            sociavel: petData.sociavelPet,
            comportamento: petData.comportamentoPet,
            is_Pet_Week: petData.castradoPet,
            fotoPerfil: petData.fotoPerfilPet
        }).then(resposta => {
            //console.log("OLHA A RESPOSTA!", resposta.data)
        });
    } 


          //guardar os pets
          const [pets, setPets] = useState([]);

          //buscar os pets
          useEffect(() =>{
              async function buscarPets(){
                  const resposta = await apiPets.get("/meus-pets");
                  setPets(resposta.data);
                  console.log("OLHA Os PETS QUE VEIO DA API!!", resposta.data)
              }
              buscarPets();
          }, []);


            //guardar os pets curtidos
            const [petsLikes, setPetsLikes] = useState([]);

            //buscar os pets
            useEffect(() =>{
                async function buscarPetsLikes(){
                    const resposta = await apiUsers.get("/listar-pets-curtidos-por-mim");
                    setPetsLikes(resposta.data);
                    console.log("OLHA Os PETS QUE VEIO DA API!!", resposta.data)
                }
                buscarPetsLikes();
            }, []);

            //guarda o usuarioa
            const [currentUser, setUser] = useState([]);
            
            
            const {id} = useParams();
            

            //buscar o usuario
            useEffect(() => {
                async function getUserById(){
                    const respostaUser = await apiUsers.get(`/${id}`);
                    setUser(respostaUser.data);
                    console.log(setUser.data);
                }
                if(id){
                    getUserById();
                    console.log("teste"+id)
                }
            }, [])

               //Captura os dados do form para guardar no userData
                function handle(e){
                    const newUser = {...setUser};
                    newUser[e.target.id] = e.target.value;
                    setUser(newUser);
                }
    
            function atualizarUser(){
                apiUsers.patch("",{
                    id: id,
                    nome: currentUser.nome,
                    idade: currentUser.idade,
                    apelido: currentUser.idade,
                    cep: currentUser.cep,
                    telefone: currentUser.telefone,
                    email: currentUser.email,
                    cpf: currentUser.cpf,
                    senha: currentUser.senha,
                    fotoPerfil: currentUser.fotoPerfil,
                    sexo: currentUser.sexo
                }).then(resposta => {
                    console.log("Registro alterado!");
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

            function verificarPetsCadastrados(){
                if(pets.length > 0){
                    document.getElementById('hasPet').style.display = "none";
                    document.getElementById("cadastrarMaisPet").innerHTML= "Cadastre mais um pet";
                }else{
                   console.log("n tem pet");
                }

                if(petsLikes.length > 0){
                    document.getElementById('hasPetLike').style.display = "none";
                    document.getElementById("cadastrarMaisPet").innerHTML= "Cadastre mais um pet";
                }else{
                   console.log("n tem pet");
                }
                
            }
            verificarPetsCadastrados();

            

          
    return(


        

        <>
            <NavBar/>
            <div className="espaco"></div>
            <div className="container perfil">
                <Row>
                    <Col sm={3} className="foto-perfil">
                        <img src={currentUser.fotoPerfil} alt="" className="mt-4 img_perfil"/>
                    </Col>
                    <Col sm={4} className="mt-1">
                        <p className="p-input">Nome:</p>
                        
                        <input type="text" id="nome" className="form-control input-edit input-placeholder" onChange={(e) => handle(e)} value={currentUser.nome} defaultValue={currentUser.nome} required></input>
                        
                        <p className="p-input">E-mail:</p>
                        <input type="email" id="email" className="form-control input-edit input-placeholder" onChange={(e) => handle(e)} value={currentUser.email} defaultValue={currentUser.email}  required></input>
                        <p className="p-input">Senha:</p>
                        <input id="senha" type="text" className="form-control input-edit input-placeholder" onChange={(e) => handle(e)} value={currentUser.senha} defaultValue={currentUser.senha}  required></input>
                        <p className="p-input">Telefone:</p>
                        <input type="text" id="telefone" className="form-control input-edit input-placeholder" onChange={(e) => handle(e)} value={currentUser.telefone} defaultValue={currentUser.telefone}  required />
                    </Col>
                    <Col sm={4} className="mt-1">
                        <p className="p-input">CPF:</p>
                        <input type="text" id="cpf" className="form-control input-edit input-placeholder" onChange={(e) => handle(e)} value={currentUser.cpf} defaultValue={currentUser.cpf}  required />
                        <Row>
                            <Col>
                                <p className="p-input">Sexo:</p>
                                <select  required className="form-control dropdown-genre input-edit" onChange={(e) => handle(e)} value={currentUser.sexo} defaultValue={currentUser.sexo} id="sexo" custom>
                                    <option value="" disabled selected>Sexo</option>
                                    <option value="f">Feminino</option>
                                    <option value="m">Masculino</option>
                                    <option value="o">Outro</option>
                                </select>
                            </Col>
                            <Col> 
                                <p className="p-input">Idade:</p>
                                <input onChange={(e) => handle(e)} id="idade" type="text" className="input-edit form-control input-age-register input-placeholder input-tamanho" value={currentUser.idade} defaultValue={currentUser.idade} required maxlength="2"/>
                            </Col>
                        </Row>
                        <p className="p-input">CEP:</p>
                        <input onChange={(e) => handle(e)} id="cep" type="text" className="form-control input-edit input-placeholder" value={currentUser.cep}  defaultValue={currentUser.cep} required />
                        <p className="p-input">URL da imagem:</p>
                        <input id="fotoPerfil" type="text" className="form-control input-edit input-placeholder" onChange={(e) => handle(e)} value={currentUser.fotoPerfil} defaultValue={currentUser.fotoPerfil}  required></input>
                    </Col>
                </Row>
                <Row>
                    <div className="teste2">
                        <button className="btn btn-primary edit-perfil" onClick={atualizarUser} type="submit">Salvar</button>
                    </div>
                </Row>
            </div>
            <div className="container">
                <br/>
                <hr></hr>
                <div>
                    <h1 className="titulo-edit">Meus Pets Cadastrados</h1>
                    <br/>
                    <Container>
                        <Row>
                            {pets.map((pet) => (
                          <Col className="tentar"> 
                                <PetItemEdit
                                     id={pet.id}
                                     nome={pet.nome}
                                     castradoCompl={pet.castrado == true ? "Sim" : "Não"}
                                     comportamento={pet.comportamento}
                                     porte={pet.porte == "P" ? "Pequeno" : pet.porte == "M" ? "Médio" : "Grande"} 
                                     faixa={pet.idade <= 1 ? "Filhote" : pet.idade > 1 && pet.idade <= 5 ? "Adulto" : "Idoso"}
                                     idade={pet.idade}
                                     imagem={pet.fotoPerfil} 
                                     sexoIcon={pet.sexo == "M" ? iconMale : iconFemale}
                                     raca={pet.raca}
                                     especie={pet.especie}
                                     sociavel={pet.sociavel ? "Sim" : "Não"}
                                     castrado={pet.castrado}
                                     sexo={pet.sexo}
                                     porteComplet={pet.sexo}
                                     isPetWeek={pet.is_Pet_Week ? "Em PetWeek" : ""}
                                />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <div className="cadastrados">
                    <h5 id="hasPet">Você não possui pet’s cadastrados para a doação</h5>
                    <h5 id="cadastrarMaisPet" onClick={() => setLgShowRegisterPet(true)} className="cor cadastroPetLabel mt-3">Cadastre um agora mesmo</h5>
                    </div>
                </div>
            </div>

            <div className="container">
                <hr></hr>
                <div className="cadastrados">
                    <h1>Pets que gostei</h1>
                    <h5 id="hasPetLike">Você não curtiu nenhum pet :( </h5>
                        <Container>
                        <Row>
                            {petsLikes.map((petLike) => (
                            <Col className="tentar"> 
                                <PetItemLike
                                     id={petLike.idPet}
                                     nome={petLike.nomePet}
                                     castradoCompl={"Sim"}
                                     comportamento={"Dócil"}
                                     porte={petLike.porte == "P" ? "Pequeno" : petLike.porte == "M" ? "Médio" : "Grande"} 
                                     faixa={petLike.idade <= 1 ? "Filhote" : petLike.idade > 1 && petLike.idade <= 5 ? "Adulto" : "Idoso"}
                                     idade={petLike.idade}
                                     imagem={petLike.fotoPet} 
                                     sexoIcon={petLike.sexo == "M" ? iconMale : iconFemale}
                                     raca={petLike.raca}
                                     especie={petLike.especie}
                                     sociavel={"Sim"}
                                     castrado={"Sim"}
                                     sexo={petLike.sexo}
                                     porteComplet={petLike.sexo}
                                />
                                </Col>
                            ))}
                        </Row>
                        </Container>
                        <Link to="/">
                    <h5 className="cor mt-3">Busque pelo pet perfeito</h5>
                    </Link>
                </div>
            </div>
                     

                      {/* Modal Register Pet */}


                    <Modal
                        size="lg"
                        show={lgShowRegisterPet}
                        onHide={() => setLgShowRegisterPet(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                        centered
                    > 
                <Modal.Body>
                <div id="detailsPet" tabindex="-1" aria-labelledby="exampleModalLabel" >

                <div className="modal-body flip-modal" ref={divRef}>
                                      
                                      <div id="flipInner" className="flip-modal-inner">
                                      <form onSubmit={(e) => enviar(e)} className="input-center formRegisterPet">

                                       <div id="front-modal"  className="flip-modal-front">
                                   
                                       <Image style={{display : 'block'}}  id="img-register-pet" className="img-fluid img-register-pet" src={imageModalRegisterPet}  fluid />
                                       <div id="div-register-pet" className="form-group container"> 
                                           <br></br>
                                            <h1 id="title" className="title-modal-register-pet">Cadastre seu Pet</h1>
                                                                
                                                                    <input onChange={(e) => handle2(e)} id="nomePet" value={petData.nomePet} type="text" className="form-control input-style-register input-nickname-pet input-placeholder" required placeholder="Apelido:" />
                                                                    <select required  className="form-control select-species" onChange={(e) => handle2(e)} id="especiePet" value={petData.especiePet}>
                                                                    <option disabled selected value="">Espécie</option>
                                                                    <option value="Cachorro">Cachorro</option>
                                                                    <option value="Gato">Gato</option>
                                                                    </select>
                                                                <br/>
                                                            
                                                                    <input onChange={(e) => handle2(e)} id="racaPet" value={petData.racaPet} type="text" className="form-control input-style-register input-breed-pet input-placeholder" required placeholder="Raça:" />
                                                                    <input onChange={(e) => handle2(e)} id="idadePet" value={petData.idadePet} type="text" className="form-control input-style-register input-age-pet input-placeholder" maxlength="2" required placeholder="Idade:"/>
                                                            <br></br>
                                                                
                                                                    <select className="form-control select-genre-pet" onChange={(e) => handle2(e)} id="sexoPet" value={petData.sexoPet} required>
                                                                    <option disabled selected value="">Sexo</option>
                                                                    <option value="F">Fêmea</option>
                                                                    <option value="M">Macho</option>
                                                                    </select>
                                                                    <select className="form-control select-port-pet" onChange={(e) => handle2(e)} id="portePet" value={petData.portePet} required>
                                                                    <option disabled selected value="">Porte</option>
                                                                    <option value="P">Pequeno</option>
                                                                    <option value="M">Médio</option>
                                                                    <option value="G">Grande</option>
                                                                    </select>
                                                                
                                                            
                                                                    <select  className="form-control select-behavior-pet" onChange={(e) => handle2(e)} id="comportamentoPet" value={petData.comportamentoPet} required>
                                                                    <option disabled selected value="">Comportamento</option>
                                                                    <option value="Dócil">Dócil</option>
                                                                    <option value="Bravo">Bravo</option>
                                                                    <option value="Amigavel">Amigável</option>
                                                                    <option value="Calmo">Calmo</option>
                                                                    <option value="Hiperativo">Hiperativo</option>
                                                                    </select>
                                                                
                                                        

                                                    <label className="form-label text-image2" for="customFile">Escolha a imagem do seu pet</label>
                                                    <input onChange={(e) => handle2(e)} id="fotoPerfilPet" value={petData.fotoPerfilPet} type="text" className="form-control input-style-register input-foto-register input-placeholder" required placeholder="URL da sua foto:"/>

                                                    <div className="group-radio-sociable" onChange={(e) => handle2(e)} id="sociavelPet" value={petData.sociavelPet}>
                                                        <span className="text-sociable-pet">Sociável: </span>
                                                        <div className="form-check form-check-inline radio-sociable-pet"> 
                                                            <input
                                                            className="form-check-input input-pet"
                                                            type="radio"
                                                            name="radioSociable"
                                                            id="sociavelPet"    
                                                            value="true"
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

                                                    <div className="group-radio-castrated" onChange={(e) => handle2(e)} id="castradoPet" value={petData.castradoPet}>
                                                        <span className="text-castrated-pet">Castrado: </span>
                                                        <div className="form-check form-check-inline radio-sociable-pet" >
                                                            <input
                                                            className="form-check-input input-pet"
                                                            type="radio"
                                                            name="radioCastrated"
                                                            id="castradoPet"
                                                            value="true"
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


                                            <button type="button" onClick={() => goToVaccine()} className="btn btn-primary btn-register-pet" id="btn-register-pet" >Próximo</button>
                                            
                                            </div>

                                      </div>
                                      <div id="back-modal"className="flip-modal-back">
                                        <div className="divVaccines">
                                       
                                          <h1 id="title" className="title-modal-register-vaccine" >Cadastrar Vacinas do Pet</h1>
              
                                          <h5 className="title-register-vaccine">Vacina</h5>
                                          <h5 className="title-register-vaccine-date">Data</h5>
                                          <h5 className="title-register-vaccine-dose">Dose</h5>

                                          <input type="text" className="form-control input-vaccine input-placeholder" placeholder="Ex: Raiva"  />
                                          <input type="text" className="form-control input-vaccine-date input-placeholder" placeholder="00/00/0000" />
                                          <input type="text" className="form-control input-vaccine-dose input-placeholder" placeholder="0/0" />

                                          <button type="submit" className="btn btn-primary btn-add-vaccine" id="btn-register-pet">Adicionar</button>

                                          </div>
                                        <div className="divVaccines2">
                                          <input type="text" className="form-control input-vaccine-register input-placeholder" placeholder="Raiva" disabled  />
                                          <input type="text" className="form-control input-vaccine-date-register input-placeholder" placeholder="14/02/2021" disabled/>
                                          <input type="text" className="form-control input-vaccine-dose-register input-placeholder" placeholder="2/2" disabled/>
                                          </div>
                                          <button type="button" className="btn btn-primary btn-back-pet-finish" id="btn-register-pet" onClick={() => goToRegisterPet()}>Voltar</button>

                                          <button type="submit" className="btn btn-primary btn-register-pet-finish" id="btn-register-pet">Cadastrar</button>
                                      </div>
                                      </form>
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
    
        </>
        );
};

export default Perfil;