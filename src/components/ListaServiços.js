import React from "react";
import axios from "axios";
import styled from "styled-components";

const InputsCards = styled.div`
text-align: center;
background-color: #010C25;
margin-left: 35%;
margin-top: 25px;
font-family: Helvetica, sans-serif;
border: solid black 1px;
width: 450px;
border-radius: 20px;
color: #FFF;
button {
    border: none;
    border-radius: 5px;
    background-color: #87FFE5;
    color: #010C25;
    font-size: 20px;
    margin-bottom: 15px;
    height: 30px;
} button: hover {
    background-color:#010C25 ;
    color: #87FFE5;
} input {
    border-radius: 10px;
    border-color: #87FFE5;
    border-width: 3px; 
} h2 {
    color: #87FFE5;
}
`
const LabelTituloOuNome = styled.div`
    input {
        margin-right: 8px;
    }
`
const CardServicos = styled.div`
    h3 {
        color: #87FFE5;
    } button {

    }
`

export default class ListaServiços extends React.Component{
state = {
    varMin: "",
    varMax: "",
    nomeTitulo: "",
    jobs: [],
    order: "Sem ordenação"
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

onChangeOrder = (e) => {
    this.setState({
        order: e.target.value
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

const todosServicos = this.state.jobs.filter((servico) => {
    if(this.state.varMin) {
        return servico.price >= this.state.varMin;
    } else {
        return true
    };
})
    .filter((servico) => {
        if (this.state.varMax) {
            return servico.price <= this.state.varMax;
        } else {
            return true
        };
})
    .filter((servico) => {
        const nomeServico = servico.title.toLowerCase();
        const descricaoServico = servico.description.toLowerCase();
        const pesquisarTexto = this.state.nomeTitulo.toLowerCase();
        return nomeServico.includes(pesquisarTexto) || 
            descricaoServico.includes(pesquisarTexto);
})
    .sort((a, b) => {
        console.log(this.state.order)
        switch (this.state.order) {
            case "varMin":
                return a.price - b.price;
            case "varMax":
                return b.price - a.price;
            case "title":
                return a.title.localeCompare(b.title);
            case "dueDate":
                return a.dueDate.localeCompare(b.dueDate);
            default: 
            return 0;
        }
    })
    .map((servico) => {
        return (
        <CardServicos>
        <div role="CardsDetalhesBásicos" key={servico.id}>
            <hr/>
            <h3> {servico.title} </h3>
            <p> Preço: {servico.price} </p>
            <p> Prazo: {convertDate(servico.dueDate)}</p>
            <button onClick={() => {this.props.paraListaDeDetalhes(servico)}}> Detalhes </button>
            <button onClick={() => {this.deleteJobs(servico.id)}}> Remover job </button>
            {renderizaBotaoCarrinho(servico)}
        </div>
        </CardServicos>
        )
    })

    return (
        <InputsCards>
        <main>
        <div role="Título">
            <h2> BUSCA POR SERVIÇOS </h2>
        </div>

        <div role="Inputs">
        <label>
            <p> Valor mínimo: </p>
            <input type={"number"} value={this.state.varMin} onChange={this.onChangeMin}/>
        </label>
        <label>
            <p> Valor máximo: </p>
            <input type={"number"} value={this.state.varMax} onChange={this.onChangeMax}/>
        </label>
        <LabelTituloOuNome>
        <label>
            <p> Título ou nome: </p>
            <input type={"text"} value={this.state.nomeTitulo} onChange={this.onChangeTitulo}/>
        </label>
        <label>
            <select value={this.state.order} onChange={this.onChangeOrder}>
                <option value={"Sem ordenação"}> Sem ordenação </option>
                <option value={"varMin"}> Crescente </option>
                <option value={"varMax"}> Decrescente </option>
                <option value={"title"}> Ordem alfabética </option>
                <option value={"dueDate"}> Prazo </option>
            </select>
        </label>
        </LabelTituloOuNome>
        </div>
        <h2> LISTA DE SERVIÇOS: </h2>
        {todosServicos}
    </main>
    </InputsCards>
)
}
}