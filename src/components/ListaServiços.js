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

deleteJobs = (id) => {
    axios.delete(`https://labeninjas.herokuapp.com/jobs/${id}`, {
        headers: {
            Authorization: "40102aed-3e5b-4748-9666-2bd06a9207ba"
        }
    })
    .then((res) => {
        this.getJobs()
        alert("Serviço deletado com sucesso!")
    })
    .catch((err) => {
        alert("Erro! :c")
    })
}

//método abaixo para contratar o serviço
updateJob = (taken, id) => {
    const body = {taken: true};
    axios.post(`https://labeninjas.herokuapp.com/jobs/${id}`,  body, {
        headers: {
            Authorization: "40102aed-3e5b-4748-9666-2bd06a9207ba"
        }
    })
    .then(() => {
        taken? alert("Seu produto foi encaminhado ao carrinho") :
        alert("Seu produto foi retirado do carrinho")
        this.getJobs()
    }).catch((err) => {
        alert("Algo deu errado, tente novamente!")
    })
}

render () {
const convertDate = (date) => {
    const dia = date.substring(8, 10)
    const mes = date.substring(5, 7)
    const ano = date.substring(0, 4)
    return `${dia}/${mes}/${ano}`
};

const renderizaBotaoCarrinho = (servico) => {
    for(let servicoCarrinho of this.props.carrinho){
        if(servicoCarrinho.id === servico.id){
            return <button> Remover do carrinho </button>
        }
    }
    return <button onClick={() => this.props.adicionarCarrinho(servico)}> Adicionar ao carrinho </button>
}

const servicos = this.state.jobs.map((servico) => {
    return(
        <div role="CardsDetalhesBásicos" key={servico.id}>
            <hr/>
            <h3> {servico.title} </h3>
            <p> Preço: {servico.price} </p>
            <p> Prazo: {convertDate(servico.dueDate)}</p>
            <button onClick={() => {this.props.paraListaDeDetalhes(servico)}}> Detalhes </button>
            <button onClick={() => {this.deleteJobs(servico.id)}}> Remover job </button>
            {renderizaBotaoCarrinho(servico)}
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
        <h2> Lista de serviços: </h2>
        {servicos}
    </main>
)
}
}