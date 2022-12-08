import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import AuthService from "../../services/Auth.service";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(evento) {
        console.log(username,password)
        evento.preventDefault();
        const userForm = { username, password };
        if (!username || !password) {
            setMessage("Preencha o campo de username e senha para continuar!");
        } else {
            AuthService.login(username, password).then(
                (e) => {
                   
                    if(AuthService.getCurrentUser().user.role != "admin") {
                        navigate('/loja')
                    }
                    else {
                        navigate('/produto')
                    }
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                }
            );
        }
    };
    return (
        <div className="content">
            <h1 className="tituloAuth">Login</h1>
            <form onSubmit={handleSubmit} className="formLogin" >
                <div>
                    <label className="lblLogin" htmlFor="username">Username:

                    </label>

                    <input
                        type="text"
                        value={username}
                        placeholder="Digite o e-mail"
                        className="inputAuth"
                        onChange={({ target }) => {
                            setUsername(target.value);

                            setMessage("");
                        }}
                    />
                </div>
                <div>
                    <label className="lblLogin" htmlFor="senha">Senha:

                    </label>

                    <input
                        type="password"
                        value={password}
                        placeholder="Digite a senha"
                        className="inputAuth"
                        onChange={({ target }) => {
                            setPassword(target.value);

                            setMessage("");
                        }}
                    />
                </div>
                <button className="login" type="submit">Login</button><h4 className="msgErro">{message}</h4>
            </form>
            
           <div className = "cadastrar" ><Link to="/cadastro">cadastrar</Link></div> 
        </div>
    );
}