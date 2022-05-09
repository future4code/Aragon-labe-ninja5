import React from "react";

export default class App extends React.Component{
  state = {
    varMin: "",
    varMax: "",
    nomeTitulo: "",
    listaDeServiços: []
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

render () {
  return (
    <main>
      <div>
        <h1> Labework </h1>
        <button> Ir para HomePage </button>
        <button> ir para Carrinho de Compras </button>
      </div>
      <hr/>
      <div>
        <h2> Bem-vindo(a) a Labework! </h2>
        <button onClick={this.CadastrarServiço}> Cadastrar um Job </button>
        <button onClick={this.ListaServiços}> Contratar Jobs </button>
      </div>
    </main>
  )
}
}