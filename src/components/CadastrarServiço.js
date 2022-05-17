import  axios  from "axios";
import React from "react";
import styled from "styled-components";

const CardCadastro = styled.div`
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

const Data = styled.div`
    margin-top: 15px;
`

const LabelForm = styled.div`
    margin-left: 30%;
    margin-right: 30%;
`

export default class CadastrarServiço extends React.Component {
    state = {
        title:"",
        description:"",
        price: 0,        
        paymentMethods:[],
        dueDate:""
    }

handleInputValues = (event)=>{
    this.setState({[event.target.name]: event.target.value});
}

handlePaymentMethods = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({paymentMethods:value});
};

createJob = (e) => {   
    e.preventDefault();
    const body = {
        title: this.state.title,
        description:this.state.description,
        price: Number(this.state.price),
        paymentMethods:this.state.paymentMethods,
        dueDate:this.state.dueDate,
    };
    const headers = {
        headers: {
            Authorization: "40102aed-3e5b-4748-9666-2bd06a9207ba"
        }
        };
    axios.post("https://labeninjas.herokuapp.com/jobs",
    body, headers)
    .then(()=>{
        this.setState({
            title:"",
            description:"",
            price: 0,        
            paymentMethods:[],
            dueDate:""
        });
        alert("Cadastrado com sucesso!!!!!!!!");
    })
    .catch((err)=>{
        alert("Erro! :c");
    });
}

    render() {
        return (
        <CardCadastro>
        <div role="Cadastro">
            <h2> CADASTRE UM NOVO SERVIÇO </h2>
            <form onSubmit={this.createJob}>
            <LabelForm>
            <label htmlFor={'title'}> Título: </label>
                    <input
                        id={'title'}
                        name={'title'}
                        value={this.state.title}
                        onChange={this.handleInputValues}
                    />
            <label htmlFor={'description'}> Descrição: </label>
                    <input
                        id={'description'}
                        name={'description'}
                        value={this.state.description}
                        onChange={this.handleInputValues}
                    />
            <label htmlFor={'price'}> Preço: </label>
                    <input
                        id={'price'}
                        type="number"
                        name={'price'}
                        value={this.state.price}
                        onChange={this.handleInputValues}
                    />
            </LabelForm>
                <section>
                        <h4> Formas de Pagamento </h4>
                        <select multiple onChange={this.handlePaymentMethods}>
                            <option selected disabled> Selecione uma opção </option>
                            <option value={"boleto"}> Boleto </option>
                            <option value={"credito"}> Cartão de Credito </option>
                            <option value={"debito"}> Cartão de Débito </option>
                            <option value={"paypal"}> PayPal </option>
                            <option value={"pix"}> Pix </option>                        
                        </select>  
                </section>
                <Data>
                <label htmlFor={'date'}> Data: </label>
                    <input
                        id={'date'}
                        type={'date'}
                        name={'dueDate'}
                        value={this.state.dueDate}
                        onChange={this.handleInputValues}
                    />
                </Data>
                    <br/>
                    <button type={"submit"}><b> Cadastrar Serviço </b></button>     
            </form>
        </div>
        </CardCadastro>
    );
}
}