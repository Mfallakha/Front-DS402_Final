import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import "./CrudProduto.css"
import Main from "../template/Main";
import axios from "axios";
import Card from "./Cards.js";
import AuthService from "../../services/Auth.service.js";

const title = "Venda de Produtos";

const urlAPI = "http://localhost:5092/api/Produto";

export default function CrudProduto() {
 
  const [lista, setLista] = useState ([])
  
  const [Produto, setProduto] = useState([{
    id: 0,
    codProduto: 0,
    nomeProduto: "",
    valorProduto: "",
    imagem:"",
    comprado:false
    
  }])

const [Atualizar, setAtualizar] = useState(false)

  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setProduto(resp.data);
           setLista(resp.data);
      });
  },[lista]) 

   const limpar = () => {
     setLista([]);
   };
  
    const salvar = () => {
    const codProduto= document.getElementById("codProduto").value;
    const nomeProduto= document.getElementById("nomeProduto").value;
    const valorProduto= document.getElementById("valorProduto").value;
    const imagem = document.getElementById("imagem").value;
    const json = {
      id: 0,
      codProduto: codProduto,
      nomeProduto: nomeProduto,
      valorProduto: valorProduto,
      imagem: imagem,
      comprado:false,
      compradoPor: null
    }
    const metodo = "post";
    axios[metodo](urlAPI, json).then((resp) => {
    setProduto(Produto)
    });
  }

  const atualizar = (id) => {
    const Produtos = {id: document.getElementById("idProduto").value, codProduto: document.getElementById("codProduto").value, nomeProduto: document.getElementById("nomeProduto").value, valorProduto: document.getElementById("valorProduto").value, imagem: document.getElementById("imagem").value,comprado:false,compradoPor:null}
    const metodo = "put";
    axios[metodo](urlAPI + "/" + Produtos.id, Produtos).then((resp) => {
      const lista = getListaAtualizada(resp.data);
      setProduto(resp.data);
      setLista(lista);
    });
    setAtualizar(false);

    window.location.reload()
  }

  const getListaAtualizada = (Produto)=> {
      const lista = lista.filter((a) => a.id !== Produto.id);
      lista.unshift(Produto);
      axios(urlAPI).then((resp) => {
        setLista(resp.data);
    });
    return lista;
  }

  const atualizaCampo = (event) => {
    const Produtos = Produto
    Produtos[event.target.nomeProduto] = event.target.value;
    setProduto(Produtos)
  }

  const renderForm = () => {
    return (
      <div className="inserir-container">
     
      {Atualizar && <>
      
        <label> <p className="textLabel">ID:</p> </label>
        <input

          disabled = {true}
          type="text"
          id="idProduto"
          placeholder="idProduto"
          className="form-input"
          name="codProduto"
          value={Produto.id}
        />
       </> }
      
        <label> <p className="textLabel">Código do Produto:</p> </label>
        <input
          type="text"
          id="codProduto"
          placeholder="Código do Produto"
          className="form-input"
          name="codProduto"
          value={Produto.codProduto}
        />
        <label> <p className="textLabel">Nome do Produto:</p> </label>
        <input
          type="text"
          id="nomeProduto"
          placeholder="Nome do Produto"
          className="form-input"
          name="nomeProduto"
          value={Produto.nomeProduto}         
        />
        <label> <p className="textLabel">Valor do Produto:</p> </label>
        <input
          type="text"
          id="valorProduto"
          className="form-input"
          name="valorProduto"
          placeholder="Valor a Pagar"
          value={Produto.valorProduto}
        />
         <label> <p className="textLabel">Url da imagem:</p> </label>
        <input
          type="text"
          id="imagem"
          className="form-input"
          name="imagem"
          placeholder="imagem"
          value={Produto.imagem}
        />
        {!Atualizar ?
        <button className="botao" onClick={(e) => salvar(e)}>
          Salvar
        </button> : 
        <button className="botao" onClick={(e) => atualizar()}>
          Atualizar
        </button>
        }
        <button className="botao" onClick={(e) => limpar(e)}>
          Cancelar
        </button>
      </div>
    );
  }

  const carregar = (Produto) => {
    setAtualizar(true)
    setProduto(Produto)
  }

  const remover = (Produto) => {
    const url = urlAPI + "/" + Produto.id;
    if (window.confirm("Confirma remoção de Produto: " + Produto.id)) {
      axios["delete"](url, Produto).then((resp) => {
      });
    }
  }

  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Produto) => (
              <tr key={Produto.id}>
                <Card nomeProduto={Produto.nomeProduto} valorProduto={Produto.valorProduto} codProduto={Produto.codProduto} imgem={Produto.imagem}/>
                <td>
                  <button className="button"
                  onClick={() => carregar(Produto)}>Alterar</button>
                </td>
                <td>
                  <button className="button"
                   onClick={() => remover(Produto)}>Remover</button>
                </td>
              </tr> 
            ))}
      </div>
    );
  }
  
    return (
      <Main title={title}>
       
        {renderForm()}
        {renderTable()}
        
      </Main>
    );
  
}