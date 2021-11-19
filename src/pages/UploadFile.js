import React, { Component } from 'react';
import axios from 'axios'
import {Button, Container, Row, Col, Image, Carousel, Modal, Form, FormGroup} from 'react-bootstrap'

class UploadFile extends Component {

	state = {
		file: null
	}

	handleFile(e){
		let file = e.target.files[0]
		this.setState({file: file})

	}

	handleUploadPet(e){
		console.log(this.state , "The State")

		let file = this.state.file

		let formdata = new FormData()

		formdata.append('arquivo', file)

		axios({
			url: `https://52.3.6.109:8080/app/relatorios/anexo-pet`,
			method: "POST",
			headers:{
				authorization: `your token`
			},
			data: formdata
		}).then((res) => {
			if(res.status == 200){
				alert("Upload feito com sucesso!")
				window.location.reload();
			}else{
				alert("Desculpe nossos servidores estão congestionados no momento, por favor tente novamente!")
			}
		},(err) => {

		})
	}

	
	handleUploadUser(e){
		console.log(this.state , "The State")

		let file = this.state.file

		let formdata = new FormData()

		formdata.append('arquivo', file)

		axios({
			url: `https://52.3.6.109:8080/app/relatorios/anexo-usuarios`,
			method: "POST",
			headers:{
				authorization: `your token`
			},
			data: formdata
		}).then((res) => {
			if(res.status == 200){
				alert("Upload feito com sucesso!")
				window.location.reload();
			}else{
				alert("Desculpe nossos servidores estão congestionados no momento, por favor tente novamente!")
			}
		},(err) => {

		})
	}



	
	handleUploadUserPet(e){
		console.log(this.state , "The State")

		let file = this.state.file

		let formdata = new FormData()

		formdata.append('arquivo', file)

		axios({
			url: `https://52.3.6.109:8080/app/relatorios/anexo-usuarios-pets`,
			method: "POST",
			headers:{
				authorization: `your token`
			},
			data: formdata
		}).then((res) => {
				if(res.status == 200){
					alert("Upload feito com sucesso!")
					window.location.reload();
				}else{
					alert("Desculpe nossos servidores estão congestionados no momento, por favor tente novamente!")
				}
		},(err) => {

		})
	}
	
	render() {
		return (
			<div id="container">
				<Row>
					<Col>
						<h1>Upload Anexo Pets</h1>
						<h3>Escolha um arquivo para fazer upload</h3>
						<input  type="file" name="file" onChange={(e) => this.handleFile(e)}></input>
						<button type="button" onClick={(e) => this.handleUploadPet(e)}>Upload</button>

						<br></br>
						<br></br>
						<br></br>

						<h1>Upload Anexo Usuários</h1>
						<h3>Escolha um arquivo para fazer upload</h3>
						<input  type="file" name="file" onChange={(e) => this.handleFile(e)}></input>
						<button type="button" onClick={(e) => this.handleUploadUser(e)}>Upload</button>	

						<br></br>
						<br></br>
						<br></br>

						<h1>Upload Anexo Usuários Pets</h1>
						<h3>Escolha um arquivo para fazer upload</h3>
						<input  type="file" name="file" onChange={(e) => this.handleFile(e)}></input>
						<button type="button" onClick={(e) => this.handleUploadUserPet(e)}>Upload</button>
					</Col>

					<Col>
						
					</Col>
				</Row>
		

			
			</div>
			
		)
	}

}

export default UploadFile;