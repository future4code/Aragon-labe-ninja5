import React from "react"
import axios from "axios"

export default class CadastrarServiço extends React.Component{
    state = {
        title: "",
        description: "",
        price: 0,
        paymentMethods: [],
        dueDate: ""
    }

handleInputValues = (event)=>{
    this.setState({[event.target.value]:event.target.value});
}
//handlePaymentMethods = (event) => {
    //this.setState({paymentMethods: []});
    //this.setState({[event.target.value]:event.target.value})
//};

//handlePaymentMethods = (event) => {
    //const value = Array.from(event.target.selectedOptions, option => option.value);
    //this.setState({paymentMethods:value});
//};

createJobs = () => {
    const body = {
        title: this.state.title,
        description: this.state.description,
        price: Number(this.state.price),
        paymentMethods: this.state.paymentMethods,
        dueDate: this.state.dueDate
    }
    axios.post("https://labeninjas.herokuapp.com/jobs",
        body,
        { 
            headers: {
                Authorization: "40102aed-3e5b-4748-9666-2bd06a9207ba"
            } 
        })
        .then((res) => {
            this.setState({
                title: "",
                description: "",
                price: 0,
                paymentMethods: [],
                dueDate: ""
            })
            this.setState({jobs: res.data.jobs})
        })
        .catch((err) => {
            alert("Erro! :c")
        })
}

    render(){
        return(
            <div>
            <h2> Cadastre um Novo Serviço </h2>
            <form onSubmit={this.createJob}>
            <label htmlFor={'title'}> Título: </label>
                <input>
                    id={'title'}
                    name={'title'}
                    value={this.state.title}
                    onChange={this.handleInputValues}
                </input>
            <label htmlFor={'description'}> Descrição: </label>
                <input>
                    id={'description'}
                    name={'description'}
                    value={this.state.description}
                    onChange={this.handleInputValues}
                </input>
            <label htmlFor={'price'}> Descrição: </label>
                <input>
                    id={'price'}
                    type ="number"
                    name={'price'}
                    value={this.state.price}
                    onChange={this.handleInputValues}
                </input>
            <section>
                <h4> Formas de Pagamento </h4>
                    <select onChange={this.handlePaymentMethods}>
                        <option selected disabled> Selecione uma opção </option>
                        <option value={"boleto"}> Boleto </option>
                        <option value={"credito"}> Cartão de Credito </option>
                        <option value={"debito"}> Cartão de débito </option>
                        <option value={"paypal"}> Paypal </option>
                        <option value={"pix"}> Pix </option>                        
                    </select>
            </section>

            <label htmlFor={'date'}> Data: </label>
                <input>
                    id={'date'}
                    type={'date'}
                    name={'dueDate'}
                    value={this.state.dueDate}
                    onChange={this.handleInputValues}
                </input>
                <br/>
                <button type={"submit"}> Cadastrar Serviço </button>
            </form>
            </div>
        )
    }
}