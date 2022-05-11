import React from "react";

export default class PaginaInicial extends React.Component{
    render() {
        return (
        <main>
        <hr/>
        <div role="Subtítulo">
            <h2> Bem-vindo(a) a Labework! </h2>
            <button onClick={this.props.paraCadastro}> Cadastrar um Job </button>
            <button onClick={this.props.paraContratar}> Contratar Jobs </button>
        </div>
        </main>
        )
    }
}