import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    newTech: '',
    techs: [],
  };

  // Executado assim que o componente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executado sempre que houver alteracoes nas props ou estado
  componentDidUpdate(prevProps, prevState) {
    // this.props, this.state
    const { techs } = this.state;
    if (prevState.state !== techs) {
      localStorage.setItem('techs', JSON.stringify(techs));
    }
  }

  // Executa quando ocomponente deiax de existir
  componentWillUnmount() {}

  hendleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  hendleSubmit = e => {
    e.preventDefault();

    const { techs, newTech } = this.state;

    this.setState({
      techs: [...techs, newTech],
      newTech: '',
    });
  };

  handleDelete = e => {
    const { techs } = this.state;
    this.setState({ techs: techs.filter(t => t !== e) });
  };

  render() {
    const { techs, newTech } = this.state;
    return (
      <>
        <form onSubmit={this.hendleSubmit}>
          <h1>{newTech}</h1>
          <ul>
            {techs.map(tech => (
              <TechItem
                key={tech}
                tech={tech}
                onDelete={() => this.handleDelete(tech)}
              />
            ))}
          </ul>
          <input
            type="text"
            onChange={this.hendleInputChange}
            value={newTech}
          />

          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }
}

export default TechList;
