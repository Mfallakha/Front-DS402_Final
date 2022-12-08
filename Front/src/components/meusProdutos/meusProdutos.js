import React, { useState, useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../ListaProduto/Cards.js";
import "./meusProdutos.css"
import CrudProduto from "../CrudProdutos/CrudProduto.js";
import AuthService from "../../services/Auth.service.js";

const title = "Meus Produtos";

const urlAPI = "http://localhost:5092/api/Produto";

export default function MeusProdutos() {

  const [lista, setLista] = useState([])

  const [listaIdProduto, setListaIdProduto] = useState([])

  const [Produto, setProduto] = useState([{
    id: 0,
    codProduto: 0,
    nomeProduto: "",
    valorProduto: "",
    imagem: "",
    comprado: false,
    compradoPor: null,
  }])


  const [Atualizar, setAtualizar] = useState(false)

  useEffect(() => {

    axios(urlAPI).then((resp) => {
      setProduto(resp.data);
      setLista(resp.data)
    });

    Produto.forEach(element => {
      console.log(element);
      if (element.compradoPor == AuthService.getCurrentUser().user.username) {

        setLista(element)
      }
    });






  }, [])


  const deletar = (Produto) => {
    axios.put(urlAPI + `/${Produto.id}`, {
      id: Produto.id,
      codProduto: Produto.codProduto,
      nomeProduto: Produto.nomeProduto,
      valorProduto: Produto.valorProduto,
      imagem: Produto.imagem,
      comprado: false,
      compradoPor: null

    }).then((resp) => {
      alert('Cancelamento de compra confirmada')
    }); window.location.reload();
  }


  const renderTable = () => {
    return (
      <div className="divPrincipal">
        {lista.map((Produto) => (
          <>
            {Produto.compradoPor == AuthService.getCurrentUser().user.username && <tr key={Produto.id}>
              <Card nomeProduto={Produto.nomeProduto} valorProduto={Produto.valorProduto} codProduto={Produto.codProduto} imagem={Produto.imagem} />
              <button className="botao" onClick={e => deletar(Produto)}>Cancelar compra</button>
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