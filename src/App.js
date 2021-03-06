import React from "react";
import PaginaInicial from "./components/PaginaInicial";
import Carrinho from "./components/Carrinho";
import ListaServiço from "./components/ListaServiços";
import CadastrarServiço from "./components/CadastrarServiço";
import Header from "./components/Header";
import DetalhesServiços from "./components/DetalheServiços";

export default class App extends React.Component{
  state = {
    telaAtual: "paginaInicial",
    servicoAtual: {},
    carrinho: []
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
          carrinho={this.state.carrinho}
        />
      case "cadastro":
        return <CadastrarServiço />
      case "contratar":
        return <ListaServiço
          paraPaginaInicial={this.paraPaginaInicial}
          paraListaDeDetalhes={this.paraListaDeDetalhes}
          adicionarCarrinho={this.adicionarCarrinho}
          carrinho={this.state.carrinho}
        />
      case "detalhes":
        return <DetalhesServiços 
          servico={this.state.servicoAtual}
          paraContratar={this.paraContratar}
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

paraListaDeDetalhes = (servico) => {
  this.setState({ telaAtual: "detalhes", servicoAtual: servico });
};

adicionarCarrinho = (servico) => {
  const novoServico = {...servico}
  const novoCarrinho = [...this.state.carrinho, novoServico]
  this.setState({carrinho: novoCarrinho})
  alert("Serviço adicionado com sucesso!")
}

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