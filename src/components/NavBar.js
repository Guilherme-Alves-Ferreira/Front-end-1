import React, { useEffect, useState, useRef } from 'react';
import apiUsers from '../apiUsers';
import logo from '../assets/images/logo.png';
import {Modal, Button, Image, Container, Row, Col, FormControl, Form, Navbar, Dropdown, DropdownButton} from 'react-bootstrap';
import imageModalLogin from '../assets/images/img_login.png';
import imageModalRegisterPet from '../assets/images/img_register_pet.png';
import imageModalRegister from '../assets/images/img_register.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import apiPets from '../apiPet';
import sucess from '../assets/images/sucess.gif'
import InputMask from 'react-input-mask';






function NavBar() {

    const [lgShowLogin, setLgShowLogin] = useState(false);

    const [lgShowRegisterPet, setLgShowRegisterPet] = useState(false);

    const handleCloseLogin = () => setLgShowLogin(false);

    const handleCloseRegisterPet = () => setLgShowRegisterPet(false);

    const [lgShowDetailPet, setLgShowDetailPet] = useState(false);

    const handleCloseDetailPet = () => setLgShowDetailPet(false);

    const [sucessmodalShow, setModalShow] = useState(false);

    const handleClosesucess = () => setModalShow(false);

    const divRef = useRef();

    const [lgShowModalLoginError, setLgShowModalLoginError] = useState(false);

    const handleCloseModalLoginError = () => setLgShowModalLoginError(false);

    function goToRegister() {
        document.getElementById('div-login').style.display = "none";
        document.getElementById('img').style.display = "none";
        document.getElementById('div-register').style.display = "block";
        document.getElementById('img-register').style.display = "block";

    }
      
    function goToLogin() {
        document.getElementById('img').style.display = "block";
        document.getElementById('div-login').style.display = "block";
        document.getElementById('div-register').style.display = "none";
        document.getElementById('img-register').style.display = "none";
    }

    function teste(){
        document.getElementById('flipInner').style.cssText = "transform: rotateY(180deg);";
        document.getElementById('front-modal').style.display = "none";
        document.getElementById('back-modal').style.display = "block";

    }

    function teste2(){
        document.getElementById('flipInner').style.cssText = "transform: rotateY(0deg);";
        document.getElementById('front-modal').style.display = "block";
        document.getElementById('back-modal').style.display = "none";

    } 

        //Guarda o pet que queremos salvar
        const [petData, setPetData] = useState({
            nomePet: "",
            idadePet: "",
            especiePet: "",
            racaPet: "",
            portePet: "",
            sexoPet: "",
            castradoPet: "",
            sociavelPet: "",
            comportamentoPet: "",
            is_Pet_WeekPet: "",
            fotoPerfilPet: "",
            dataEntregaPet: ""
        })
    
        //Captura os dados do form para guardar no petData
        function handle(e){
            const newPet = {...petData};
            newPet[e.target.id] = e.target.value;
            setPetData(newPet);
            //console.log("OLHA O QUE INDO PRO petData",newPet);
        }
    
        //Enviar chamando a requisição HTTP POST
        function enviar(e){
            e.preventDefault(); //para não atualizar a tela quando for chamada a função
            axios.post("https://52.3.6.109:8443/app/pets", {
                nome: petData.nomePet,
                idade: petData.idadePet,
                especie: petData.especiePet,
                raca: petData.racaPet,
                porte: petData.portePet,
                sexo: petData.sexoPet,
                castrado: petData.castradoPet,
                sociavel: petData.sociavelPet,
                comportamento: petData.comportamentoPet,
                is_Pet_Week: false,
                fotoPerfil: petData.fotoPerfilPet,
                dataEntregaPet: "00/00/0001"
            }).then(resposta => {
                console.log("Pet Registrado!");
                if(resposta.status == 201){
                    handleCloseRegisterPet();

                    setModalShow(true);

                    setTimeout(() => {
                        handleClosesucess();
                        console.log('fechar')
                    }, 1500);

                }else if(resposta.status == 429){
                    alert("Aguarde um momento, nosso sistema está sobrecarregado!");
                }
            });
        } 


             //Guarda o usuario que queremos salvar
             const [userData, setUserData] = useState({
                nome: "",
                idade: "",
                apelido: "",
                cep: "",
                telefone: "",
                email: "",
                cpf: "",
                senha: "",
                sexo: "",
                fotoPerfil: ""
            })
        
            //Captura os dados do form para guardar no petData
            function handle2(e){
                const newUser = {...userData};
                newUser[e.target.id] = e.target.value;
                setUserData(newUser);
                //console.log("OLHA O QUE INDO PRO petData",newUser);
            }
        
            //Enviar chamando a requisição HTTP POST
            function enviarUsuario(e){
                e.preventDefault(); //para não atualizar a tela quando for chamada a função
                axios.post("https://52.3.6.109:8443/app/usuarios", {
                    nome: userData.nome,
                    idade: userData.idade,
                    apelido: userData.idade,
                    cep: userData.cep.replace(/[^a-zA-Z0-9]/g, ""),
                    telefone: userData.telefone.replace(/[^a-zA-Z0-9]/g, ""),
                    email: userData.email,
                    cpf: userData.cpf.replace(/[^a-zA-Z0-9]/g, ""),
                    senha: userData.senha,
                    sexo: userData.sexo,
                    fotoPerfil: userData.fotoPerfil
                }).then(resposta => {
                    console.log("Usuario Registrado!");
                if(resposta.status == 201){
                    handleCloseLogin();
                    setModalShow(true);

                    setTimeout(() => {
                        handleClosesucess();
                        setLgShowLogin(true);
                    }, 3000);

                }else if(Response.status == 429){
                    alert("Aguarde um momento, nosso sistema está sobrecarregado!");
                }
                });
            } 

   
          //guardar o ultimo id
          const [petId, setIdPet] = useState();
        
          //buscar o ultimo id
          useEffect(() =>{
              async function buscarUltimoId(){
                  const respostaIdPet = await apiPets.get("/ultimo-id");
                  setIdPet(respostaIdPet.data);
              }
              buscarUltimoId();
          });

       
          console.log("Proximo id: "+petId)


        //Guarda a vacina que queremos salvar
        const [vacinaData, setVacinaData] = useState({
            nomeVacina: "",
            dataVacina: "",
            doseVacina: ""
        })
    
        //Captura os dados do form para guardar no vacinaData
        function handle3(e){
            const newVacina = {...vacinaData};
            newVacina[e.target.id] = e.target.value;
            setVacinaData(newVacina);
        }
    
        //Enviar chamando a requisição HTTP POST
        function enviar3(f){
            axios.post("https://52.3.6.109:8443/app/vacinas", {
                nome: vacinaData.nomeVacina,
                data: vacinaData.dataVacina.replace(/[^a-zA-Z0-9]/g, ""),
                dose: vacinaData.doseVacina.replace(/[^a-zA-Z0-9]/g, ""),
                idPet: petId
            }).then(resposta => {
                console.log("OLHA A RESPOSTA!", resposta.data)
            });
        } 

        var idUser = 0;
        var nomeUser;
        var emailValor;
        var idValor;
        var data;
        var data2;

        function login(login, senha, e){
            if(login != "" && senha != ""){
                e.preventDefault()
                apiUsers.get(login+`/`+senha).then(respostaLogin => {
                    console.log(respostaLogin.status)
                    idUser = respostaLogin.data.id;
                    nomeUser = respostaLogin.data.nome;
                    valor();
                    validacaoLogin();
                },(err) => {
                    setLgShowModalLoginError(true);
                })
            }else{
            }

        
        }

        function valor(){
            emailValor = nomeUser;
            idValor = idUser;    
            window.localStorage.setItem('valor', emailValor);
            window.localStorage.setItem('valorId', idValor);
            data = window.localStorage.getItem('valor');
            data2 = window.localStorage.getItem('valorId');
            console.log(data);
            console.log(data2);
            //console.log(emailValor);        
        }

        function mostraValor(){
            data = window.localStorage.getItem('valor');
            data2 = window.localStorage.getItem('valorId');
            console.log(data);
            console.log(data2);
        }
        mostraValor();
        

        function validacao(id){
            console.log(id);
            if (id > 0){
                modificar();
            }else{
                console.log("N/A validação");

            }
        }

        let nomeUserLogado;

        function verificarNomeLogin(){
            if(data == null){
                console.log("vazio")
            }else{
                nomeUserLogado = data.substring(0, data.indexOf(' '));
            }
        }
        verificarNomeLogin();

        function modificar(){
            document.getElementById('btnCadastrarPet').style.display = "block";
            document.getElementById('btnPerfil').style.display = "block";
            document.getElementById('btnEntrar').style.display = "none";
        }

        function modificarSair(){
            document.getElementById('btnCadastrarPet').style.display = "none";
            document.getElementById('btnPerfil').style.display = "none";
            document.getElementById('btnEntrar').style.display = "block";

        }

        function validacaoLogin(){
            if (idUser > 0){
                handleCloseLogin();
            }
        }

        function sair(){
            data2 = null;
            localStorage.clear();
            console.log(data2);
            modificarSair()
        }

        function verificarLogin(){
            if(idUser > 0){
                console.log("não foi")
            }else{
                setTimeout(
                    function(){
                     validacao(data2);
                }, 1);
            }
        }
        verificarLogin();
        function verificarCamposCadastroPet(u){
            if(document.getElementById('nomePet').value == ""){

            }else if(document.getElementById('idadePet').value == ""){

            }else if(document.getElementById('sexoPet').value == ""){

            }else if(document.getElementById('portePet').value == ""){

            }else if(document.getElementById('comportamentoPet').value == ""){

            }else if(document.getElementById('fotoPerfilPet').value == ""){
               
            }else{
                teste();
                const formNext = document.getElementById('formStepOne')
                formNext.addEventListener('submit', e => {
                    e.preventDefault()
                    console.log('Deu certo')
                })
            }
        }

            var vetorVacinas = [];
            function myFunction(h) {
            h.preventDefault();

            //Pegar valores dos inputs
            var nomeVacinaTxt = document.getElementById("nomeVacina").value;
            var dataVacinaTxt = document.getElementById("dataVacina").value;
            var doseVacinaTxt = document.getElementById("doseVacina").value;

            //Pegar id da div
            var divNomeVacina = document.getElementById("divNomeVacina"); 

            //Adiciona os dados em um objeto
            var registroVacina = {nomeVacina: nomeVacinaTxt, dataVacina: dataVacinaTxt, doseVacina: doseVacinaTxt, petId}

            //Adiciona o objeto em um vetor
            vetorVacinas.push(registroVacina);

            
            var textoVacina = "";
            for (var i = 0; i < vetorVacinas.length; i++) {
                console.log(vetorVacinas[i]);
                textoVacina = "Vacina: "+vetorVacinas[i].nomeVacina + ", Data: "+ vetorVacinas[i].dataVacina+", Dose: "+vetorVacinas[i].doseVacina+"<br/>"
                divNomeVacina.innerHTML += textoVacina; 
            }
            console.log(vetorVacinas)
            enviar3();
            }

    return (
        <>
        
            <Navbar fixed="top" className="nav_grande">
                <div className="container">
                    <Navbar.Brand>
                        <Link to={`/`}>
                        <img className="logo_nav" src={logo} alt="Logo" />{' '}
                       <span className="nav_name"> Pet Match</span>
                       </Link>
                    </Navbar.Brand>
                    <input value="DOE UM PET AGORA MESMO" type="button" id="btnCadastrarPet" className="right botton_nav me-2 btn-register-pet-nav"  onClick={() => setLgShowRegisterPet(true)}></input>
                    <input value="Entrar" id="btnEntrar" className="right botton_nav btn_entrar" type="button" onClick={() => setLgShowLogin(true)}></input>
                    <div id="btnPerfil" className="divBtnPerfil">
                    <DropdownButton  className="btn_perfil" title={"Bem Vindo, "+nomeUserLogado}>
                    <Link to={`/`}>
                    <Dropdown.Item href="#/action-1">Inicio</Dropdown.Item>
                    </Link>
                    <Link to={`/perfil/${data2}`}>
                    <Dropdown.Item href="#/action-2">Perfil</Dropdown.Item>
                    </Link>
                    <Link to={`/match`}>
                    <Dropdown.Item href="#/action-3">Matchs</Dropdown.Item>
                    </Link>
                    <Link to={`/`}>
                    <Dropdown.Item href="#/action-4" onClick={() => sair()}>Sair</Dropdown.Item>
                    </Link>
                    </DropdownButton>
                    </div>

                </div>
            </Navbar>
        

            <Modal
                size="lg"
                show={lgShowLogin}
                onHide={() => setLgShowLogin(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            > 
                <Modal.Body>
                <div className="modal-content" ref={divRef}>


                    <div className="modal-body">

                        <Image style={{display : 'block'}} id="img" className="img-login" src={imageModalLogin}  fluid />
                        <Image style={{display : 'none'}} id="img-register" className="img-register" src={imageModalRegister}  fluid />

                       <div id="div-login" className="form-group container content-login">

                        <h1 id="title" className="title-modal-login">Faça Login</h1>
                        <form>
                            <input id="login" type="email" className="form-control input-style-login input-email-login input-placeholder" required placeholder="E-mail:" />
                            <input id="senha" type="password" className="form-control input-style-login input-password-login input-placeholder" required maxlength="18" minlength="4" placeholder="Senha:"/>
                            <a className="text-forget-password" onClick={() => goToLogin()} href="#">Esqueceu sua senha?</a>
                            <p className="text-error-password" id="messageErrorLogin">E-mail ou senha incorretos!</p>
                            <button onClick={(e) => login(document.getElementById("login").value,document.getElementById("senha").value, e)} variant="custom" className="btn btn-login" type="submit" id="btn-login">Entrar</button>

                        </form>
                            <p id="text-register" className="text-register">Não é registrado? <br></br><a className="text-register-href"  onClick={() => goToRegister()} href="#">Crie sua conta agora mesmo!</a></p>

                        </div>
                            <div style={{display : 'none'}} id="div-register"  className="form-group container content-register">
                                    <h1 id="title" className="title-modal-signup">Cadastrar-se</h1>
                                <form onSubmit={(e) => enviarUsuario(e)} className="input-center">
                                    <Container>
                                        <Row>
                                            <Col><input onChange={(e) => handle2(e)} id="nome" value={userData.nome} type="text" className="form-control input-style-register input-name-register input-placeholder" required placeholder="Nome:"/></Col>
                                            <Col><InputMask  mask="999.999.999-99" maskChar={null} onChange={(e) => handle2(e)} id="cpf" value={userData.cpf} type="text" className="form-control input-style-register input-cpf-register input-placeholder" required minLength="14" maxlength="14" placeholder="CPF:"/></Col>
                                        </Row>

                                        <Row>
                                            <Col><input onChange={(e) => handle2(e)} id="email" value={userData.email} type="email" className="form-control input-style-register input-email-register input-placeholder" required placeholder="E-mail:"/></Col> 
                                            <Col><input onChange={(e) => handle2(e)} id="senha" value={userData.senha} type="password" className="form-control input-style-register input-password-register input-placeholder" required maxlength="20" minlength="8" placeholder="Senha:"/></Col> 
                                        </Row>

                                        <Row>
                                            <Col><select onChange={(e) => handle2(e)} id="sexo" value={userData.sexo} required className="form-control dropdown-genre" custom>
                                            <option disabled selected value="">Sexo</option>
                                            <option value="f">Feminino</option>
                                            <option value="m">Masculino</option>
                                            <option value="o">Outro</option>
                                            </select></Col>
                                            <Col><InputMask  mask="99" maskChar={null} onChange={(e) => handle2(e)} id="idade" value={userData.idade} type="text" className="form-control input-style-register input-age-register input-placeholder" required minLength="2" maxlength="2" placeholder="Idade:"/></Col>
                                        </Row>

                                        <Row>
                                        <Col>
                                            <InputMask  mask="(99) 99999-9999" maskChar={null}  onChange={(e) => handle2(e)} id="telefone" value={userData.telefone} type="text" className="form-control input-style-register input-phone-register input-placeholder" minLength="14" maxlength="15" required placeholder=" Telefone:" />
                                           
                                           </Col>
                                            <Col><InputMask  mask="99999-999" maskChar={null}   onChange={(e) => handle2(e)} id="cep" value={userData.cep} type="text" className="form-control input-style-register input-cep-register input-placeholder" minLength="9" maxlength="9" required placeholder="CEP:" /></Col>
                                        </Row>
                                    </Container>

                                    <input onChange={(e) => handle2(e)} id="fotoPerfil" value={userData.usuario_fotoPerfil} type="text" className="form-control input-style-register input-foto-register-user input-placeholder" required placeholder="URL da sua foto:"/>
                                    <button className="btn btn-register" type="submit"  id="btn-register">Cadastrar</button>
                                </form>

                                    <p id="text-login" className="text-login">Já possui conta? <a onClick={() => goToLogin()} className="text-register-href" href="#">Clique aqui para fazer login!</a></p>
                            </div>

                    </div>

                </div>
                </Modal.Body>
            </Modal>

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
                                      <form id="formStepTwo" className="input-center formRegisterPet">

                                       <div id="front-modal"  className="flip-modal-front">
                                   
                                       <Image style={{display : 'block'}}  id="img-register-pet" className="img-fluid img-register-pet" src={imageModalRegisterPet}  fluid />
                                       <div id="div-register-pet" className="form-group container">
                                           <br></br>
                                            <h1 id="title" className="title-modal-register-pet">Cadastre seu Pet</h1>
                                            <form id="formStepOne" className="input-center formRegisterPet">
                                                                    <input onChange={(e) => handle(e)} id="nomePet" value={petData.nome} type="text" className="form-control input-style-register input-nickname-pet input-placeholder" required placeholder="Apelido:" />
                                                                    <select required  className="form-control select-species" onChange={(e) => handle(e)} id="especiePet" value={petData.especie}>
                                                                    <option disabled selected value="">Espécie</option>
                                                                    <option value="Cachorro">Cachorro</option>
                                                                    <option value="Gato">Gato</option>
                                                                    </select>
                                                                <br/>
                                                            
                                                                    <input onChange={(e) => handle(e)} id="racaPet" value={petData.raca} type="text" className="form-control input-style-register input-breed-pet input-placeholder" required placeholder="Raça:" />
                                                                    <InputMask  mask="99" maskChar={null} onChange={(e) => handle(e)} id="idadePet" value={petData.idade} type="text" className="form-control input-style-register input-age-pet input-placeholder" maxlength="2" required placeholder="Idade:"/>
                                                            <br></br>
                                                                
                                                                    <select className="form-control select-genre-pet" onChange={(e) => handle(e)} id="sexoPet" value={petData.sexo} required>
                                                                    <option disabled selected value="">Sexo</option>
                                                                    <option value="F">Fêmea</option>
                                                                    <option value="M">Macho</option>
                                                                    </select>
                                                                    <select className="form-control select-port-pet" onChange={(e) => handle(e)} id="portePet" value={petData.porte} required>
                                                                    <option disabled selected value="">Porte</option>
                                                                    <option value="P">Pequeno</option>
                                                                    <option value="M">Médio</option>
                                                                    <option value="G">Grande</option>
                                                                    </select>
                                                                
                                                            
                                                                    <select  className="form-control select-behavior-pet" onChange={(e) => handle(e)} id="comportamentoPet" value={petData.comportamento} required>
                                                                    <option disabled selected value="">Comportamento</option>
                                                                    <option value="Dócil">Dócil</option>
                                                                    <option value="Bravo">Bravo</option>
                                                                    <option value="Amigavel">Amigável</option>
                                                                    <option value="Calmo">Calmo</option>
                                                                    <option value="Hiperativo">Hiperativo</option>
                                                                    </select>
                                                                
                                                        

                                                    <label className="form-label text-image2" for="customFile">Escolha a imagem do seu pet</label>
                                                    <input onChange={(e) => handle(e)} id="fotoPerfilPet" value={petData.fotoPerfil} type="text" className="form-control input-style-register input-foto-register input-placeholder" required placeholder="URL da sua foto:"/>

                                                    <div className="group-radio-sociable" onChange={(e) => handle(e)} id="sociavelPet" value={petData.sociavel}>
                                                        <span className="text-sociable-pet">Sociável: </span>
                                                        <div className="form-check form-check-inline radio-sociable-pet"> 
                                                            <input
                                                            className="form-check-input input-pet "
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

                                                    <div className="group-radio-castrated" onChange={(e) => handle(e)} id="castradoPet" value={petData.castrado}>
                                                        <span className="text-castrated-pet">Castrado: </span>
                                                        <div className="form-check form-check-inline radio-sociable-pet" >
                                                            <input
                                                            className="form-check-input input-pet radio-castrado"
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


                                            <button type="submit" form="formStepOne" onClick={() => verificarCamposCadastroPet()} className="btn btn-primary btn-register-pet" id="btn-register-pet" >Próximo</button>
                                            </form>
                                            </div>

                                      </div>
                                      <div id="back-modal"className="flip-modal-back">
                                        <div className="divVaccines">
                                       
                                          <h1 id="title" className="title-modal-register-vaccine" >Cadastrar Vacinas do Pet</h1>
              
                                          <h5 className="title-register-vaccine">Vacina</h5>
                                          <h5 className="title-register-vaccine-date">Data</h5>
                                          <h5 className="title-register-vaccine-dose">Dose</h5>
                                          
                                          <input onChange={(e) => handle3(e)} value={vacinaData.nomeVacina} id="nomeVacina"  type="text" className="form-control input-vaccine input-placeholder" placeholder="Ex: Raiva"  />
                                          <InputMask  mask="99/99/9999" maskChar={null} onChange={(e) => handle3(e)} value={vacinaData.dataVacina}  id="dataVacina" type="text" className="form-control input-vaccine-date input-placeholder" placeholder="00/00/0000" />
                                          <InputMask  mask="9/9" maskChar={null} type="text" onChange={(e) => handle3(e)} value={vacinaData.doseVacina}  id="doseVacina" className="form-control input-vaccine-dose input-placeholder" placeholder="0/0" />

                                          <button onClick={(h) => myFunction(h)} className="btn btn-primary btn-add-vaccine" id="btn-register-pet">Adicionar</button>

                                          </div>
                                        <div className="divVaccines2">
                                            <div className="divVaccines4"></div>
                                            <span className="textVaccine" id="divNomeVacina"></span>
                                        </div>

                                          <button type="button" className="btn btn-primary btn-back-pet-finish" id="btn-register-pet" onClick={() => teste2()}>Voltar</button>
                                          <button type="submit" onClick={(e) => enviar(e)} form="formStepTwo" className="btn btn-primary btn-register-pet-finish" id="btn-register-pet">Cadastrar</button>
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


                
                <Modal
                    size="sm"
                    show={lgShowModalLoginError}
                    onHide={() => setLgShowModalLoginError(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <div className="modal-content-option" >
                        <Modal.Body>
                        <br></br>
                        <br></br>

                        <div className="divBodyModal">
                        <h2>E-mail ou senha inválidos, por favor tente novamente!</h2>
                        <br></br>
                        </div>
                            <div className="divFooterModal">
                            <Button variant="secondary" onClick={() =>  handleCloseModalLoginError()}>Ok</Button>
                            </div>
                        </Modal.Body>
                        </div>

                </Modal>


           
        </>
    );
}

          

 

export default NavBar;