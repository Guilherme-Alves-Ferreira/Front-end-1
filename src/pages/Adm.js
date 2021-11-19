import React, { useState, useEffect } from 'react'
import {Button, Container, Row, Col, Image, Carousel, Modal, Form, FormGroup} from 'react-bootstrap'
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
import apiUsers from '../apiUsers';
import apiRelatorios from '../apiRelatorio';
import apiAllPets from '../apiAllPets';
import ReactDOM from 'react-dom';
import UploadFile from './UploadFile';
import Chart from "react-google-charts";


function Adm(){

    
      //guardar os pets
      const [pets, setPets] = useState([]);

      //buscar os pets
      useEffect(() =>{
          async function buscarPets(){
              const resposta = await apiAllPets.get("");
              setPets(resposta.data);
              //console.log("OLHA O QUE VEIO DA API!!", resposta.data)
          }
          buscarPets();
      }, []);
      

       //guardar os users
       const [users, setUsers] = useState([]);

       //buscar os users
       useEffect(() =>{
           async function buscarUsers(){
               const resposta = await apiUsers.get("");
               setUsers(resposta.data);
               //console.log("OLHA O QUE VEIO DA API!!", resposta.data)
           }
           buscarUsers();
       }, []);
       

    return(
        <>
        <head>
        <meta http-equiv="Content-Type" content="multipart/form-data; charset=utf-8" /> 

               </head>
            <body className="corpo">
                <NavBar/>
                <div className="espaco"></div>
                <div className="espaco"></div>
                {/* SOBRE */}
                    <Row>
                        <Col>
                        <div className="text-dark mt-5 ms-5 ps-5">
                        <h1 className="sobre_titulo"><b>Painel Administrativo</b></h1>
                        <br></br>
                        <p className="fonte">Número de usuários cadastrados: {users.length} </p>
                        <p className="fonte">Número de pets cadastrados: {pets.length}</p>
                    </div>
                        </Col>

                        <Col>
                        <div className="text-dark mt-5 ms-5 ps-5 divBtnRelatorios">
                        <h1 className="sobre_titulo"><b>Relatórios</b></h1>
                        <a href="http://52.3.6.109:8080/app/relatorios/pets">
                        <Button variant="success" className="background2">Relatório Pets</Button></a>

                        <a href="http://52.3.6.109:8080/app/relatorios/usuarios">
                        <Button variant="success" className="background3">Relatório Usuários</Button></a>
                        <br></br>
                        <br></br>
                        <a href="http://52.3.6.109:8080/app/relatorios/usuarios-pets">
                        <Button variant="success" className="background2">Relatório Usuários-Pets</Button></a>

                        <a href="http://52.3.6.109:8080/app/relatorios/petweek">
                        <Button variant="success" className="background3">Relatório PetWeek</Button></a>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            <div className="text-dark mt-5 ms-5 ps-5">
                                <UploadFile />
                            </div>
                        </Col>
                        
                        <Col>
                        <Chart className="chart"
                            width={'800px'}
                            height={'500px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Tipo', 'Users'],
                                ['Doadores', 11],
                                ['Adotantes', 2]
                            ]}
                            options={{
                                title: 'Tipos de Usuários',
                                backgroundColor: {
                                    fill: 'white',
                                    fillOpacity: 1
                                  },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </Col>
                    </Row>


                <div className="espaco4"></div>

                
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
      

     



        </>

    );

}


export default Adm;
