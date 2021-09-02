import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import LikeItem from '../components/LikeItem'
import MatchItem from '../components/MatchItem'
import foto2 from '../assets/images/cao.png'
import foto5 from '../assets/images/cat1.jpg'
import foto1 from '../assets/images/pessoa.png'
import foto3 from '../assets/images/pessoa 3.jpg'
import foto4 from '../assets/images/pessoa10.png'
import foto7 from '../assets/images/pessoa7.jpg'
import apiUsers from '../apiUsers'
import apiPets from '../apiPet'
import MatchItemAdotante from '../components/MatchItemAdotante'

     

function Match(){

     //guardar os pets
     const [likes, setLikes] = useState([]);

     //buscar os pets
     useEffect(() =>{
         async function buscarLikes(){
             const resposta = await apiUsers.get("/listar-pets-curtidos", ).then(resposta => {
                 if(resposta.status == 200){
                     setLikes(resposta.data);
                     document.getElementById("petsWithLike").style.display = "none"
                 }
             });
         }
         buscarLikes();
     }, []);


        //guardar os matchs
        const [matchs, setMatchs] = useState([]);

        //buscar os matchs
        useEffect(() =>{
            async function buscarMatchs(){
                const resposta = await apiUsers.get("/listar-match", ).then(resposta => {
                    if(resposta.status == 200){
                        setMatchs(resposta.data);
                        console.log(resposta.data)
                        document.getElementById("petsWithMatch").style.display = "none"
                    }
                });
            }
            buscarMatchs();
        }, []);


    return(
    <>
        <NavBar/>
        <div className="espaco"></div>
        <div className="container match">
            <div className="cadastrados">
                <h1 className="titleMatch" id="messageMatch">Match's</h1>
            
                <h5 className="titleMatch descriptionMatch" id="petsWithMatch">Por enquanto você não possui nenhum match :(</h5>
                    {matchs.map((match => 
                    <MatchItem imagemAdotante={match.fotoAdotante} nomeAdotante={match.nomeAdotante} id={match.idAdotante} infoEmailAdotante={`E-mail: ${match.emailAdotante}`} infoTelAdotante={`Telefone: ${match.telefoneAdotante}`} isPetWeek={`Quer pet week: ${match.querPetWek == true ? "Sim" : "Não"}`}  imagemPet={match.fotoPet} nome_pet={match.nomePet} id_pet={match.idPet} 
                    imagemDoador={match.fotoDoador} nomeDoador={match.nomeDoador} id={match.idAdotante} infoEmailDoador={`E-mail: ${match.emailDoador}`} infoTelDoador={`Telefone: ${match.telefoneDoador}`} />
                    ))}     
                <br></br>
            </div>

            <div className="cadastrados">
                <hr></hr>
                <h1 className="titleMatch " id="messageLikes">Match's Pendentes</h1>
                    {likes.map((like => 
                        <LikeItem imagem1={like.fotoAdotante} nome={like.nomeAdotante} id={like.idAdotante} infoEmail={`E-mail: ${like.emailAdotante}`} infoTel={`Telefone: ${like.telefoneAdotante}`} isPetWeek={`Quer pet week: ${like.querPetWek == true ? "Sim" : "Não"}`} imagem={like.fotoPet} nome_pet={like.nomePet} id_pet={like.idPet}/>
                    ))}              
                <h5 className="titleMatch" id="petsWithLike">Por enquanto você não possui nenhum pet curtido :(</h5>
            </div>

        
        </div>

    </>
    );
};

export default Match;