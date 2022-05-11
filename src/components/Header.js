import React from "react";

export default class Header extends React.Component{
    render(){
        return(
        <div role="Título">
            <h1> Labework </h1>
            <div role="Botões">
                <button onClick={this.props.paraPaginaInicial}> Ir para HomePage </button>
                <button onClick={this.props.paraCarrinho}> ir para Carrinho de Compras </button>
            </div>
        </div>
        )
    }
}