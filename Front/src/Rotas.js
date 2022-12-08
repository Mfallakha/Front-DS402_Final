import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';

import AuthService from './services/Auth.service';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

import MeusProdutos from './components/meusProdutos/meusProdutos';
import CrudProduto from './components/CrudProdutos/CrudProduto';
import TelaCliente from './components/telaCliente/telaCliente';
import CrudCadastro from './components/cadastro/CrudCadastro';

export default function Rotas() {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            
            setCurrentUser(user);

        }
        
    }, []);
    return (
        <Routes>
           
            {currentUser ? (
                <Route exact path='/cursos'
                    element={
                        <Main title="Cursos">
                            <div>Página de cursos...</div>
                        </Main>
                    }
                />
            ) : (
                <Route exact path='/cursos'
                    element={
                        <Main title="Cursos">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            <Route exact path='/carometro'
                element={
                    <Main title="Carômetro">
                        <div>Carômetro...</div>
                    </Main>
                }
            />
            
            <Route path='/' element={<Login />} />
            <Route path='/loja' element={<TelaCliente />} />
            <Route path='/meusProdutos' element={<MeusProdutos />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />
            <Route path="/produto" element={<CrudProduto/>}/>
            <Route path="/cadastro" element={<CrudCadastro/>}/>
   
         
        </Routes>
    )
}