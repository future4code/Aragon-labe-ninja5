import React from "react";

export default class DetalhesServiços extends React.Component{
    render() {
        const convertDate = (date) => {
            const dia = date.substring(8, 10)
            const mes = date.substring(5, 7)
            const ano = date.substring(0, 4)
            return `${dia}/${mes}/${ano}`
        };
        return(
            <div role="Detalhes">
                <h2> {this.props.servico.title} </h2>
                    <p> Preço: R${this.props.servico.price} </p>
                    <p> Prazo: {convertDate(this.props.servico.dueDate)}</p>
                    <p> Descrição: {this.props.servico.description} </p>
                <h3> Formas de pagamento: 
                    {this.props.servico.paymentMethods.map(metodo => <span> 
                        <li>{metodo}</li>
                    </span>)} 
                    </h3>
            <button onClick={() => {this.props.paraContratar()}}> Voltar para lista de Jobs </button> 
            </div>
        )
    }
}