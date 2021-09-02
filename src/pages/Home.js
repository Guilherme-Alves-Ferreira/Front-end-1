import React, { useState, useEffect } from 'react'
import {Button, Container, Row, Col, Image, Carousel, Modal} from 'react-bootstrap'
import apiPets from '../apiPet';
import NavBar from '../components/NavBar'
import imagem from '../assets/images/sobre.PNG'
import imagem1 from '../assets/images/1.png'
import imagem2 from '../assets/images/2.png'
import imagem3 from '../assets/images/3.png'
import logo from '../assets/images/logo.png'
import tw from '../assets/images/tw.png'
import face from '../assets/images/face.png'
import insta from '../assets/images/insta.png'
import macho from '../assets/images/macho.png'
import foto1 from '../assets/images/cat1.jpg'
import PetItem from '../components/PetItem'
import {Link} from 'react-router-dom'
import iconMale from '../assets/images/icon_male.png'
import iconFemale from '../assets/images/femea.png'
import CarouselGeneric from '../components/Carousel'
import axios from 'axios'
import apiAllPets from '../apiAllPets';


function Home(){
/*
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
*/

        //guardar os pets
        const [pets, setAllPets] = useState([]);

        //buscar os pets
        useEffect(() =>{
            async function buscarAllPets(){
                const resposta = await apiPets.get("");
                setAllPets(resposta.data);
                //console.log("OLHA O QUE VEIO DA API!!", resposta.data)
            }
            buscarAllPets();
        }, []);

        function getIdLogado(){
            var x = window.localStorage.getItem('valorId');
            console.log("ID do logado"+x)

        }
        getIdLogado()

    const [lgShowSearchPet, setLgShowSearchPet] = useState(false);

    const handleCloseSearch = () => setLgShowSearchPet(false);
    

        const [filtroData, setFiltros] = useState({
            idade: null,
            nome: null,
            especie: null,
            raca: null,
            porte: null, 
            sexo: null,
            castrado: null,
            sociavel: null,
            parametros: "",
            comportamento: null
        });

           //Captura os dados do form para guardar no filtroData
        function handleFiltro(e){
            const newFiltro = {...filtroData};
            newFiltro[e.target.id] = e.target.value;
            setFiltros(newFiltro);
            console.log("OLHA O QUE INDO PRO musicData",newFiltro);
        }

        var txtIdade = filtroData.idade;
        var txtNome = filtroData.nome;
        var txtEspecie = filtroData.especie;
        var txtRaca = filtroData.raca;
        var txtPorte = filtroData.porte;
        var txtSexo = filtroData.sexo;
        var txtCastrado = filtroData.castrado;
        var txtSociavel = filtroData.sociavel;
        var txtComportamento = filtroData.comportamento;

        function openModalFilter(){
            setLgShowSearchPet(true)
        }
        

    return(
        <>
            <body className="corpo">
                <NavBar/>

                {/* HOME */}
                <section id="home" className="home">
                    <Container>
                        <div className="container text-light pt-5">
                            <h1 className="home_titulo">Achar o pet perfeito nunca <br/>
                                foi tão fácil!</h1>
                            <p className="home_sub">Use nossos filtros para <br/>
                                encontra o seu novo 
                                melhor amigo! 🥳 <br></br>
                                Há uma variedade de pets procurando <br></br> por um novo dono, ajude um deles a <br></br> encontrar um novo lar!</p>
                        </div>
                    </Container>
                </section>

                {/* ANIMAIS */}
                <section className="bg-image animais">
                <Container>
                    <div className="container">
                        <div className="row">
                            
                        </div>
                        <div id="testeDiv" className="mt-5">
                            <Row>
                                <Col sm={6}>
                                    <div>
                                        <h1 className="text-light mt-2 filtro_titulo">Encontre seu novo pet</h1>
                                    </div>
                                    <br/>
                                    <div>
                                        <p className="texto_pet">
                                            Aqui você poderá buscar por <br/>
                                            todas as características que <br/>
                                            procura em um animalzinho<br/>
                                             de estimação, basta filtrar!<br/>
                                            
                                        </p>
                                    </div>
                                    <br/>
                                    <div className="col-4 mt-4">
                                        <button type="button" onClick={() => openModalFilter()} className="btn btn-light botton_animais"
                                            data-mdb-ripple-color="dark" data-mdb-toggle="modal"
                                            data-mdb-target="#searchPet">Filtrar</button>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <Carousel fade>
                                        {pets.map((pet) => (
                                            <Carousel.Item className="bg-carousel">
                                                <Col className="tentar">
                                                    <PetItem
                                                        id={pet.id}
                                                        nome={pet.nome}
                                                        castrado={pet.castrado ? "Sim" : "Não"}
                                                        comportamento={pet.comportamento}
                                                        porte={pet.porte == "P" ? "Pequeno" : pet.porte == "M" ? "Médio" : "Grande"}
                                                        porteModal={pet.porte}  
                                                        faixa={pet.idade <= 1 ? "Filhote" : pet.idade > 1 && pet.idade <= 5 ? "Adulto" : "Idoso"}
                                                        imagem={pet.fotoPerfil} 
                                                        sexoIcon={pet.sexo == "M" ? iconMale : iconFemale}
                                                        raca={pet.raca}
                                                        especie={pet.especie}
                                                        sociavel={pet.sociavel ? "Sim" : "Não"}
                                                        idade={pet.idade}
                                                    />
                                                </Col>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    </Container>
                </section>

                {/* SOBRE */}
                <section className="bg-image sobre">
                    <div className="d-flex">

                    <div className="col-8 text-dark mt-5 ms-5 ps-5">
                        <h1 className="sobre_titulo"><b>Porque adotar?</b></h1>
                        <p className="fonte">Existem muitos bichinhos que foram abandonados nas<br/>
                        ruas que precisam de amor e carinho assim como<br/>
                        qualquer outro animal!</p>
                        <p className="fonte">No Brasil existem cerca de 30 milhões de animais<br/>
                        abandonados, sendo 20 milhões de cachorros e 10<br/>
                        milhões de gatos.</p>
                        <Image src={imagem}  fluid />
                        <p className="fonte">Nas cidades grandes, a cada 5 pessoas existe um<br/>
                        animal doméstico, sendo que 10% deles são<br/>
                        abandonados.</p>
                    </div>
                    <div className="col-4 bg_sobre">

                    </div>

                    </div>
                </section>

                {/* PET-WEEK */}
                <section className="bg-image pet-week">
                    <div className="d-flex">

                    <div className="col-8 text-dark mt-5 pt-5 ms-5 ps-5">
                        <h1 className="sobre_titulo"><b>Pet Week</b></h1>
                        <p className="fonte">Está em dúvida ao escolher seu bichinho? <br/>
                        Participe do Pet Week, aqui você pode levar <br/>
                        o bichinho pré-adotado para casa e passar uma <br/>
                        semana. Se estiver satisfeito com o bichinho<br/>
                        ele é seu! </p>
                        <button type="button" className="btn text-light botton">Começar</button>
                    </div>
                    <div className="col-4 justify-content-center fundo_num">
                        <div className="row p-2">
                        <div>
                            <div className="circulo">
                            <Image src={imagem1}  fluid className="fotos-numeros"/>
                            </div>
                            <div className="bg-dark text-white frases-week mt-3">
                            Escolha o pet
                            </div>
                        </div>
                        </div>
                        <div className="row p-2">
                        <div>
                            <div className="circulo">
                            <Image src={imagem2}  fluid className="fotos-numeros"/>
                            </div>
                            <div className="bg-dark text-white frases-week mt-3">
                            Fique com ele por 7 dias
                            </div>
                        </div>
                        </div>
                        <div className="row p-2">
                        <div>
                            <div className="circulo">
                            <Image src={imagem3}  fluid className="fotos-numeros"/>
                            </div>
                            <div className="bg-dark text-white frases-week mt-3">
                            Se gostar, ele é seu :)
                            </div>
                        </div>
                        </div>
                    </div>

                    </div>
                </section>

                {/* FOLTER */}
                    <div className="row text-light folter">
                    <div className="col-2 folter_logo">
                        <div className="mt-5 alinhamento">
                        <Image src={logo}  fluid height="70px"/>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="mt-5">
                        <h5>Início</h5>
                        <span className="clicavel">Dicas e cuidados</span>
                        <br/>
                        <span className="clicavel">Onde encontrar...</span>
                        <br/>
                        <span className="clicavel">Você está pronto?</span>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="mt-5">
                        <h5>Sobre nós</h5>
                        <span className="clicavel">Equipe</span>
                        <br/>
                        <span className="clicavel">Empresa</span>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="mt-5">
                        <h5>Suporte</h5>
                        <span className="clicavel">Ajuda</span>
                        <br/>
                        <span className="clicavel">Contato</span>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="mt-5 alinhamento">
                        <Image src={tw}  fluid height="40px" className="clicavel"/>
                        <Image src={face}  fluid height="35px" className="ms-3 me-3 clicavel"/>
                        <Image src={insta}  fluid height="35px" className="clicavel"/>
                        <br/>
                        <button type="button" className="btn text-light mt-3 botton-folter">Contato</button>
                        </div>
                    </div>
                    </div>

                <div className="coppy pt-1">
                <p> &copy; Todos diretos reservados a PETMATCH &copy; </p>
                </div>
            </body>
      

             {/* Modal Search Pet */}

            <Modal
                size="lg"
                show={lgShowSearchPet}
                onHide={() => setLgShowSearchPet(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            > 
                <Modal.Body>
                <div className="modal-content-search">

                    <div className="modal-header container">
                        <button
                        type="button"
                        className="btn-close container"
                        data-mdb-dismiss="modal"
                        aria-label="Close" onClick={handleCloseSearch}></button>
                      </div>
                    <div className="modal-body-search">
                                                 
                     <div id="div-login" className="form-group container content">
                        <h1 id="title" className="title-modal-search">Busque pelo pet <br></br> perfeito </h1>
                    <form> 
                        <div className="radio-animal">
                            <label  className="btn-search-cat "><input onChange={(e) => handleFiltro(e)} id="especie" value={"Gato"} type="radio" name="toggle"/><span>Gato</span></label>
                            <label className="btn-search-dog"><input onChange={(e) => handleFiltro(e)} id="especie" value={"Cachorro"} type="radio" name="toggle" /><span>Cachorro</span></label>
                        </div>

                        <div className="input-group-filter">
                            <div className="input-group">
                                <input  onChange={(e) => handleFiltro(e)} id="nome" value={filtroData.nome} type="text" className="form-control input-nickname-search-pet input-placeholder-search background-input-search" placeholder=" Apelido:" />
                                <input onChange={(e) => handleFiltro(e)} id="idade" value={filtroData.idade} type="text" className="form-control input-age-search-pet input-placeholder-search background-input-search" maxlength="2" placeholder=" Idade:" />
                            </div>
                                        
                            <div className="input-group">
                            <select onChange={(e) => handleFiltro(e)} id="comportamento" value={filtroData.comportamento} className="form-control select-port-search-pet input-placeholder-search background-input-search">
                                    <option disabled selected value="">Comportamento</option>
                                    <option value="Dócil">Dócil</option>
                                    <option value="Bravo">Bravo</option>
                                    <option value="Amigavel">Amigável</option>
                                    <option value="Calmo">Calmo</option>
                                    <option value="Hiperativo">Hiperativo</option>
                                  </select>                                  <select onChange={(e) => handleFiltro(e)} id="sexo" value={filtroData.sexo} className="form-control select-genre-search-pet input-placeholder-search background-input-search">
                                    <option disabled selected value=""> Sexo</option>
                                    <option value="F">Fêmea</option>
                                    <option value="M">Macho</option>
                                  </select>                        
                                 <input onChange={(e) => handleFiltro(e)} id="raca" value={filtroData.raca} type="text" className="form-control input-breed-search-pet input-placeholder-search background-input-search" placeholder="  Raça:"  />

                            </div>

                            <div className="input-group">
                                <select onChange={(e) => handleFiltro(e)} id="porte" value={filtroData.porte} className="form-control select-port-search-pet input-placeholder-search background-input-search">
                                    <option disabled selected value="">Porte</option>
                                    <option value="P">Pequeno</option>
                                    <option value="M">Médio</option>
                                    <option value="G">Grande</option>
                                  </select>  

                                <select onChange={(e) => handleFiltro(e)} id="sociavel" value={filtroData.sociavel} className="form-control select-sociable-search-pet input-placeholder-search background-input-search">
                                    <option disabled selected value="">Sociável</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                  </select>      
                                  
                                  <select onChange={(e) => handleFiltro(e)} id="castrado" value={filtroData.castrado} className="form-control select-castrated-search-pet input-placeholder-search background-input-search">
                                    <option disabled selected value="">Castrado</option>
                                    <option  value="true">Sim</option>
                                    <option  value="false">Não</option>
                                  </select>  

                            </div>
                        </div>
                        <Link to={`/pet/${txtIdade}/${txtNome}/${txtEspecie}/${txtRaca}/${txtPorte}/${txtSexo}/${txtCastrado}/${txtSociavel}/${txtComportamento}`}>
                          <button type="submit" className="btn btn-primary btn-search-pet" id="btn-login">Pesquisar</button>
                          </Link>
                        </form>
                    </div>
                </div>
                </div>

                </Modal.Body>
            </Modal>




        </>

    );


}

export default Home;