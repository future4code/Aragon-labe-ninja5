import React from "react";
import axios from "axios";

export default class ListaServiços extends React.Component{
state = {
    varMin: "",
    varMax: "",
    nomeTitulo: ""
}

getJobs = () => {
    axios.get("https://labeninjas.herokuapp.com/jobs",
    {
        headers: {
            Authorization: "labework"
        }
    })
    .then((res) => {
        this.setState({listaDeServiços: res.data.result.list})
    })
    .catch((err) => {
        alert("Erro! :c")
    })
}

render () {

const serviços = this.props.listaDeServiços.map((serviço) => {
    return <div> {serviços.title} </div>
})

    return (
        <main>
        <div role="Título">
            <h2> Busca por serviços </h2>
        </div>

        <div role="Inputs">
        <label>
            <p> Valor mínimo: </p>
            <input type={"number"} value={this.props.varMin} onChange={this.props.onChangeMin}/>
        </label>
        <label>
            <p> Valor máximo: </p>
            <input type={"number"} value={this.props.varMax} onChange={this.props.onChangeMax}/>
        </label>
        <label>
            <p> Título ou nome: </p>
            <input type={"text"} value={this.props.nomeTitulo} onChange={this.props.onChangeTitulo}/>
        </label>
        <label>
            <select>
                <option value={"Sem ordenação"}> Sem ordenação </option>
                <option value={"Menor valor"}> Menor valor </option>
                <option value={"Maior valor"}> Maior valor </option>
                <option value={"Título"}> Título </option>
                <option value={"Valor"}> Valor </option>
            </select>
        </label>
        </div>

        <div role="CardsDetalhesBásicos">
            <h4> {serviços.title} </h4>
            <h4> {serviços.price} </h4>
            <h4> {serviços.dueDate} </h4>
            <button onClick={""}> Detalhes </button>
            <button onClick={""}> Remover job </button>
            <button onClick={""}> Adicionar ao carrinho </button>
        </div>
    </main>
)
}
}