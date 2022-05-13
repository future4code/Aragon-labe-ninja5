import axios from "axios";
import React from "react";
import styled from "styled-components";

const CardServiços = styled.div`
    text-align: center;
    background-color: #010C25;
    margin-left: 35%;
    margin-top: 25px;
    font-family: Helvetica, sans-serif;
    border: solid black 1px;
    width: 450px;
    border-radius: 20px;
    button {
        border: none;
        border-radius: 5px;
        background-color: #87FFE5;
        color: #010C25;
        font-size: 20px;
        margin: 5px;
        height: 30px;
    } button: hover {
        background-color:#010C25 ;
        color: #87FFE5;
    } h3 {
        font-size: 20px;
        color: #87FFE5;
    } h2 {
        font-size: 23px;
        color: #87FFE5;
    } p {
        color:#FFF;
        font-size: 18px;
    }
`

const DisplayCarrinho = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    button {
        margin-top: 15px;
        border: none;
        border-radius: 50px;
        height: 25px;
        background-color: #87FFE5;
        color: #010C25;
    } button: hover {
        background-color:#010C25 ;
        color: #87FFE5;
    } p {
        color:  #FFF;
    }
`

export default class Carrinho extends React.Component {

removerJobNoCarrinho = (id) => {
    const body = {
        taken: false
    };
    axios.post(`https://labeninjas.herokuapp.com/jobs/${id}`, body, { 
        headers: {
            Authorization: "40102aed-3e5b-4748-9666-2bd06a9207ba"
        }
    }).then(() => {
        alert("Serviço removido com sucesso!")
        this.pegarJobsTaken()
    }).catch((err) => {
        alert(err.response.data.message)
    })
}

pegarJobsTaken = () => {
    axios.get("https://labeninjas.herokuapp.com/jobs", {
        headers: {
            Authorization: "40102aed-3e5b-4748-9666-2bd06a9207ba"
        }
    }).then((res) => {
        
    }).catch((err) => {
        alert(err.response.data.message)
    })
}

render() {
    const cardServicosNoCarrinho = this.props.carrinho.map((servico) => {
        return(
            <div key={servico.id}>
                <DisplayCarrinho>
                <b><p> {servico.title} </p></b>
                <b><p> R$ {servico.price} </p></b>
                <button onClick={() => this.removerJobNoCarrinho(servico.id)}><b> X </b></button>
                </DisplayCarrinho>
            </div>
        )
    })

    const finalizarCompra = () => {
        return (
            alert ("Compra finalizada com sucesso!")
        ) 
    }

const precoTotal = this.props.carrinho.reduce((prev, curr) => {
    return prev + curr.price
}, 0)

return (
    <div role="Carrinho">
        <CardServiços>
        <h2> DADOS DE COMPRA </h2>
            <p> Preço total R${precoTotal} </p>
            <button onClick={() => this.props.paraContratar()}><b> Voltar para lista de Jobs </b></button> 
            <button onClick={finalizarCompra}><b> Finalizar Compra </b></button>
        <h3> LISTA DE SERVIÇOS SELECIONADOS </h3>
        {cardServicosNoCarrinho}
        </CardServiços>
    </div>
)
}}