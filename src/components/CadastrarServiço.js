import  axios  from "axios";
import React from "react";

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
        alert("Cadastrado com sucesso!");
        this.setState({
            title: "",
            description: "",
            price: 0,
            dueDate: "",
            paymentMethods: []
        });
    })
    .catch((err)=>{
        alert("Erro! :c");
    });
}

    render() {
        return (
        <div role="Cadastro">
            <h2> Cadastre um Novo Serviço </h2>
            <form onSubmit={this.createJob}>
            <label htmlFor={'title'}> Título: </label>
                    <input
                        id={'title'}
                        name={'title'}
                        value={this.props.title}
                        onChange={this.handleInputValues}
                    />
            <label htmlFor={'description'}> Descrição: </label>
                    <input
                        id={'description'}
                        name={'description'}
                        value={this.props.description}
                        onChange={this.handleInputValues}
                    />
            <label htmlFor={'price'}> Preço: </label>
                    <input
                        id={'price'}
                        type="number"
                        name={'price'}
                        value={this.props.price}
                        onChange={this.handleInputValues}
                    />
                <section>
                        <h4> Formas de Pagamento </h4>
                        <select onChange={this.handlePaymentMethods} multiple>
                            <option selected disabled> Selecione uma opção </option>
                            <option value={"boleto"}> Boleto </option>
                            <option value={"credito"}> Cartão de Credito </option>
                            <option value={"debito"}> Cartão de Débito </option>
                            <option value={"paypal"}> PayPal </option>
                            <option value={"pix"}> Pix </option>                        
                        </select>  
                </section>
                <label htmlFor={'date'}> Data: </label>
                    <input
                        id={'date'}
                        type={'date'}
                        name={'dueDate'}
                        value={this.props.dueDate}
                        onChange={this.handleInputValues}
                    />
                    <br/>
                    <button type={"submit"}> Cadastrar Serviço </button>     
            </form>
        </div>
    );
}
}