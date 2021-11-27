import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import PetItem from '../components/PetItem'
import foto1 from '../assets/images/cat1.jpg'
import foto2 from '../assets/images/cachorro 2.jpg'
import foto3 from '../assets/images/cachorro 3.jpg'
import foto4 from '../assets/images/cachorro 4.jpg'
import foto5 from '../assets/images/cat2.jpg'
import foto6 from '../assets/images/cat1.jpg'
import foto7 from '../assets/images/cat1.jpg'
import femea from '../assets/images/femea.png'
import macho from '../assets/images/macho.png'
import apiPets from '../apiPet';
import iconMale from '../assets/images/icon_male.png'
import iconFemale from '../assets/images/femea.png'
import { useParams } from 'react-router'
import axios from 'axios'


import {Card, Button, Container, Row, Col} from 'react-bootstrap'





function Pet(){


            const {idadeFiltro, nomeFiltro, especieFiltro, racaFiltro, porteFiltro, sexoFiltro, castradoFiltro, sociavelFiltro, comportamentoFiltro} = useParams();

            const [filtros, setFiltros] = useState([]);

            useEffect(() =>{
                async function filtrar(){
                    const resposta = await axios.post("http://52.3.6.109:8080/app/pets/filtrar", {
                        idade: idadeFiltro,
                        nome: nomeFiltro,
                        especie: especieFiltro,
                        raca: racaFiltro,
                        porte: porteFiltro, 
                        sexo: sexoFiltro,
                        castrado: castradoFiltro,
                        sociavel: sociavelFiltro,
                        parametros: true,
                        comportamento: comportamentoFiltro
                    }).then(resposta => {
                        console.log("PETS FILTRADOS!", resposta.data)
                        if(resposta.data == ""){
                            console.log("n tem pet")
                            document.getElementById("messageNoPet").style.display = "block";
                        }
                        setFiltros(resposta.data)
                    });
                }
                filtrar();
            }, [])

            

          //guardar os pets
          const [pets, setPets] = useState([]);

          //buscar os pets
          useEffect(() =>{
              async function buscarPets(){
                  const resposta = await apiPets.get("");
                  setPets(resposta.data);
                  console.log("OLHA O QUE VEIO DA API!!", resposta.data)
              }
              buscarPets();
          }, [])

           
   return(
        <>
            <NavBar/>
            <div className="container pet">
                <h1 className="result">Resultados:</h1>
                <div className="music-boxes">
                <h1 className="noPet" id="messageNoPet">Por enquanto não há nenhum pet com essas características  :(</h1>

                    <Container>
                            <Row>
                            {filtros.map((pet) => (
                                <Col className="tentar">                       
                                        <PetItem
                                            id={pet.id}
                                            nome={pet.nome}
                                            castrado={pet.castrado ? "Sim" : "Não"}
                                            comportamento={pet.comportamento}
                                            porte={pet.porte == "P" ? "Pequeno" : pet.porte == "M" ? "Médio" : "Grande"}
                                            porteModal={pet.porte} 
                                            faixa={pet.idade <= 1 ? "Filhote" : pet.idade > 1 && pet.idade <= 5 ? "Adulto" : "Idoso"}
                                            imagem={"data:image/png;base64," + pet.fotoPerfil} 
                                            sexoIcon={pet.sexo == "M" ? iconMale : iconFemale}
                                            raca={pet.raca}
                                            especie={pet.especie}
                                            sociavel={pet.sociavel ? "Sim" : "Não"}
                                            idade={pet.idade}
                                        />
                                    </Col>
                                ))}
                            </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

//disponibilizar para os outros documentos essa 'classNamee'
export default Pet;