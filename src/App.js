import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Pokedex } from './components/Pokedex';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      img: "",
      name: "",
      height: "",
      weight: "",
      types: ""
    }
  }

  componentDidMount = () => {
    axios('https://pokeapi.co/api/v2/pokemon/150').then((resultat) => {

      this.setState({
        img: resultat.data.sprites.other.dream_world.front_default,
        name: resultat.data.name,
        height:Math.round(resultat.data.height * 100.0 / 10) / 100,
        weight: Math.round(resultat.data.weight * 100.0 / 10) / 100,
        types: resultat.data.types[0].type.name
      });
    })
  }

  getPoke = (poke) => {

    poke++;

    axios('https://pokeapi.co/api/v2/pokemon/' + poke).then((resultat) => {

      this.setState({
        img: resultat.data.sprites.other.dream_world.front_default,
        name: resultat.data.name,
        height:Math.round(resultat.data.height * 100.0 / 10) / 100,
        weight: Math.round(resultat.data.weight * 100.0 / 10) / 100,
        types: resultat.data.types[0].type.name
      });
    })
  }

  render() {

    return (
      <>
        <div className="container">

          <div className="card col-8 offset-2 principal_card" id="top" >
            <div className="row justify-content-around">
              <div className="col-md-5">
                <img src={this.state.img} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-5">
                <div className="card-body">
                  <h5 className="card-title text-white">{this.state.name}</h5>
                  <p className="card-text text-white">Height : {this.state.height} m</p>
                  <p className="card-text text-white">Weight: {this.state.weight} kg</p>
                  <p className="card-text text-white">Type : {this.state.types}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#top"><Pokedex get={this.getPoke}></Pokedex></a>
        
      </>
    )
  }
}
