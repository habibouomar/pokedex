import React from "react";
import axios from 'axios';

export class Pokedex extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemons: [],
			  
        }
    }

    componentDidMount() {
        const URL = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
        axios(URL).then(reponse => {
            const pokemons = reponse.data.results;
            pokemons.forEach((pokemon,index) => {
                axios(pokemon.url).then((reponse) => {
                    let newPokemons = [...this.state.pokemons];

                    const pokemonDetail = reponse.data
                    // newPokemons.push(pokemonDetail)
                    newPokemons[index] = pokemonDetail;

                    this.setState({
                        pokemons: newPokemons,
                    })
                });
            })
        })
    }

    render() {
        return (
        <>
            <h2>Pokédex</h2>

            <div className="container cards">

            <div class="row justify-content-around">  
                {
                    this.state.pokemons.map((pokemon, index) => {
                        return (
                            <div onClick={ () => this.props.get(index)} className="card cardPokemon" style={{width: "18rem"}} key={pokemon?.id}>
                                <img src={pokemon?.sprites.other.dream_world.front_default}  className="card-img-top" alt="pokemon"/>
                                     <div className="card-body">
                                         <p className="card-text text-white">{pokemon?.name}</p>
                                    </div>
                            </div> 
                        )
                    })
                }
			</div>	

            </div>
        </>
        )
    }
}