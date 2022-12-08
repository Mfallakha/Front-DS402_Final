import React, {useState,useEffect} from "react";
import Menu from '../template/Menu.js'
import "./CrudCadastro.css"
import Main from "../template/Main";
import axios from "axios";
import AuthService from "../../services/Auth.service.js";
import { useHistory, useLocation } from 'react-router-dom';


const title = "Consulta e Cadastro de usuarios";

const urlAPI = "http://localhost:5092/api/Cliente";



export default function Crudusuario() {
 
  
  const [usuario, setusuario] = useState([{
    id: 0,
    username: "",
    senha: "",
    role: "cliente"
    
  }])

const [Atualizar, setAtualizar] = useState(false)
  
    const salvar = () => {
    const username= document.getElementById("username").value;
    const senha= document.getElementById("senha").value;
    const json = {
      id: 0,
      username: username,
      senha: senha,
      role: "cliente"
    
    }
    const metodo = "post";
    axios[metodo](urlAPI, json).then((resp) => {
    setusuario(usuario)
    window.location.href = 'http://localhost:3000'
    });
  }

  const renderForm = () => {
    return (
      <div className="inserir-container">
       
        <label> <p className="textLabel">Nome do usuario:</p> </label>
        <input
          type="text"
          id="username"
          placeholder="Nome do usuario"
          className="form-input"
          name="username"
          value={usuario.username}         
        />
        <label> <p className="textLabel">Senha:</p> </label>
        <input
          type="text"
          id="senha"
          className="form-input"
          name="senha"
          placeholder="senha"
          value={usuario.senha}
        />
        
         <button className="botao" onClick={(e) => salvar(e)}>Salvar</button>
        
        <button className="botao">
          Cancelar
        </button>
      </div>
    );
  }
 
  
    return (
      <Main title={title}>
       
        {renderForm()}
        
      </Main>
    );
  
}
