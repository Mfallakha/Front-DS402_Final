import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../telaCliente/Cards.js";
import "./telaCliente.css";
import CrudProduto from "../CrudProdutos/CrudProduto.js";
import AuthService from "../../services/Auth.service.js";

const title = "Produtos Disponíveis";

const urlAPI = "http://localhost:5092/api/Produto";

export default function TelaCliente() {
 
  const [lista, setLista] = useState ([])
  
  const [Produto, setProduto] = useState([{
    id: 0,
    codProduto: 0,
    nomeProduto: "",
    valorProduto: "",
    imagem: "",
    comprado: false,
  }])


  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setProduto(resp.data);
           setLista(resp.data);
      });
  },[lista]) 

  const comprar = (Produto) =>{
    console.log(Produto);
    axios.put(urlAPI+`/${Produto.id}`,{
      id: Produto.id,
      codProduto: Produto.codProduto,
      nomeProduto:Produto.nomeProduto,
      valorProduto: Produto.valorProduto,
      imagem: Produto.imagem,
      comprado: true,
      compradoPor: AuthService.getCurrentUser().user.username

    }).then((resp) => {
        alert('Produto adicionado a lista!')
 });
  }

<div className="inserir-container">

</div>

  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Produto) => (
            <>
             {Produto.comprado == false && <tr key={Produto.id}>
                <Card nomeProduto={Produto.nomeProduto} valorProduto={Produto.valorProduto} codProduto={Produto.codProduto} imagem={Produto.imagem}/>
                <button className="botao1" onClick={e=>comprar(Produto)}>Comprar</button>
              </tr>}
            </> 
            ))}
      </div>
    );
  }
  
    return ( 
      <Main title={title}>
       
      {renderTable()}
      
    </Main>   
    );
  
}