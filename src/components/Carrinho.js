import axios from "axios";
import React from "react";

export default class Carrinho extends React.Component {
    state = {
        listaCarrinho: [],
        totalPrice: 0
    }

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
        let valorTotal = 0;
        const servicosSelecionados = res.data.servico.filter((servico) => {
            return servico.taken === true;
        });
        for(let servico of valorTotal){valorTotal += servico.price};
        this.setState({listaCarrinho: servicosSelecionados, valorTotal: valorTotal})
    }).catch((err) => {
        alert(err.response.data.message)
    })
}

render() {
    const cardServicosNoCarrinho = this.props.carrinho.map((servico) => {
        return(
            <div key={servico.id}>
                <p> {servico.title} </p>
                <p> R$ {servico.price} </p>
                <button onClick={() => this.removerJobNoCarrinho(servico.id)}> Remover Job </button>
            </div>
        )
    })

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
        <h3> Lista de serviços selecionados </h3>
        {cardServicosNoCarrinho}
    </div>
)
}}