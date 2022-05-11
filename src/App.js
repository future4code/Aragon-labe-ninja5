import React from "react";
import PaginaInicial from "./components/PaginaInicial";
import Carrinho from "./components/Carrinho";
import ListaServiço from "./components/ListaServiços";
import CadastrarServiço from "./components/CadastrarServiço";
import Header from "./components/Header";

export default class App extends React.Component{
  state = {
    telaAtual: "paginaInicial"
  }

  escolherTela = () => {
    switch (this.state.telaAtual) {
      case "paginaInicial":
        return <PaginaInicial 
          paraCarrinho={this.paraCarrinho}
          paraCadastro={this.paraCadastro}
          paraContratar={this.paraContratar}
          paraPaginaInicial={this.paraPaginaInicial}
        />
      case "carrinho":
        return <Carrinho 
          paraContratar={this.paraContratar}
        />
      case "cadastro":
        return <CadastrarServiço />
      case "contratar":
        return <ListaServiço
          paraPaginaInicial={this.paraPaginaInicial}
        />
            default:
          <PaginaInicial />
    }
  }

paraPaginaInicial = () => {
    this.setState({ telaAtual: "paginaInicial" });
  };

paraCarrinho = () => {
    this.setState({ telaAtual: "carrinho" });
  };

paraCadastro = () => {
    this.setState({ telaAtual: "cadastro" });
  };

paraContratar = () => {
    this.setState({ telaAtual: "contratar" });
  };

render () {
  return (
    <div>
      <div role="Header">
        <Header
          paraCarrinho={this.paraCarrinho}
          paraPaginaInicial={this.paraPaginaInicial}
        />
      </div>
      {this.escolherTela()}
    </div>
  )
}
}