import React from "react";

export default class Carrinho extends React.Component {
    state = {
        listaCarrinho: []
    }

render() {
    const finalizarCompra = () => {
        return (
            alert ("Compra finalizada com sucesso!")
        ) 
    }

return (
    <div role="Carrinho">
        <h2> Dados de Compra </h2>
            <p> Preço total R$: </p>
            <button onClick={() => this.props.paraContratar()}> Voltar para lista de Jobs </button> 
            <button onClick={finalizarCompra}> Finalizar Compra </button>
        <h3> Carrinho </h3>
    </div>
)
}}