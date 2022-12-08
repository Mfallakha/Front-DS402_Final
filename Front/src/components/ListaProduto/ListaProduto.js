import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import "./ListaProduto.css";
import Card from "./Cards.js";
import CrudProduto from "../CrudProdutos/CrudProduto.js";


const title = "Consulta Produtos";

const urlAPI = "http://localhost:5092/api/Produto";

export default function ListaProduto() {
 
  const [lista, setLista] = useState ([])
  
  const [Produto, setProduto] = useState([{
    id: 0,
    codProduto: 0,
    nomeProduto: "",
    valorProduto: "",
    imagem: ""
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
    const codProduto = document.getElementById("codProduto").value;
    const nomeProduto = document.getElementById("nomeProduto").value;
    const valorProduto = document.getElementById("valorProduto").value;
    const imagem = document.getElementById("imagem").value;
    const json = {
      id: 0,
      codProduto: codProduto,
      nomeProduto: nomeProduto,
      valorProduto: valorProduto,
      imagem: imagem
    }
    const metodo = "post";
    axios[metodo](urlAPI, json).then((resp) => {
    setProduto(Produto)
      
    });
  }

  const atualizar = (id) => {
    const Produtos = {id: document.getElementById("idProduto").value, codProduto: document.getElementById("codProduto").value, nomeProduto: document.getElementById("nomeProduto").value, valorProduto: document.getElementById("valorProduto").value, imagem: document.getElementById("imagem").value}
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

  <div className="inserir-container">

  </div>
  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Produto) => (
              <tr key={Produto.id}>
                <Card nomeProduto={Produto.nomeProduto} valorProduto={Produto.valorProduto} codProduto={Produto.codProduto} imgem={Produto.imagem}/>
            
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