import React from "react";
import axios from "axios";

export default class ListaServiços extends React.Component{
state = {
    varMin: "",
    varMax: "",
    nomeTitulo: "",
    jobs: []
}

componentDidMount = () => {
    this.getJobs()
}

onChangeMin = (e) => {
    this.setState({
        varMin: e.target.value
    })
}

onChangeMax = (e) => {
    this.setState({
        varMax: e.target.value
    })
}

onChangeTitulo = (e) => {
    this.setState({
        nomeTitulo: e.target.value
    })
}

getJobs = () => {
    axios.get("https://labeninjas.herokuapp.com/jobs",
    {
        headers: {
            Authorization: "40102aed-3e5b-4748-9666-2bd06a9207ba"
        }
    })
    .then((res) => {
        this.setState({jobs: res.data.jobs})
    })
    .catch((err) => {
        alert("Erro! :c")
    })
}

render () {
const servicos = this.state.jobs.map((servico) => {
    return(
        <div role="CardsDetalhesBásicos">
            <h4> {servico.title} </h4>
            <h4> Preço: {servico.price} </h4>
            <h4> Validade: {servico.dueDate} </h4>
            <button onClick={""}> Detalhes </button>
            <button onClick={""}> Remover job </button>
            <button onClick={""}> Adicionar ao carrinho </button>
        </div>
    )
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
        {servicos}
    </main>
)
}
}