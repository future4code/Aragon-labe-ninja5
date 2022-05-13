import React from "react";
import styled from "styled-components";

const Cabecalho = styled.div`
    text-align: center;
    font-family: Helvetica, sans-serif;
    h1 {
        font-size: 70px;
        color: #87FFE5;
        margin: 15px;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #010C25;
        text-shadow: black 0.1em 0.1em 0.2em};
    } button {
        border: none;
        border-radius: 5px;
        background-color: #010C25;
        color: #87FFE5;
        font-size: 20px;
        margin: 5px;
        padding: 8px;
    } button: hover {
        background-color: #87FFE5;
        color: #010C25;
    }
`

export default class Header extends React.Component{
    render(){
        return(
        <div role="Título">
            <Cabecalho>
            <h1> LabeService </h1>
            <div role="Botões">
                <button onClick={this.props.paraPaginaInicial}><b> Ir para HomePage </b></button>
                <button onClick={this.props.paraCarrinho}><b> Ir para Carrinho de Compras </b></button>
            </div>
            </Cabecalho>
        </div>
        )
    }
}