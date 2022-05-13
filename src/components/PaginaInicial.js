import React from "react";
import styled from "styled-components";

const SubPagina = styled.div`
    text-align: center;
    font-family: Helvetica, sans-serif;
    hr {
        margin: 20px;
        width: 100%;
        height: 2px;
        border: 0px;
        border-top: 2px solid #010C25;
        background-color: #87FFE5;
    } h2 {
        color: #010C25;
        font-size: 25px;
    } button {
        border: none;
        border-radius: 5px;
        background-color: #010C25;
        color: #87FFE5;
        font-size: 15px;
        margin: 5px;
        padding: 8px;
    } button: hover {
        background-color: #87FFE5;
        color: #010C25;
    }
`

export default class PaginaInicial extends React.Component{
    render() {
        return (
        <SubPagina>
        <main>
        <hr/>
        <div role="Subtítulo">
            <h2> Bem-vindo(a) a Labework! </h2>
            <button onClick={this.props.paraCadastro}><b> Cadastrar um Job </b></button>
            <button onClick={this.props.paraContratar}><b> Contratar Jobs </b></button>
        </div>
        </main>
        </SubPagina>
        )
    }
}