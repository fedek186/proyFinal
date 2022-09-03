import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './UnaPeliculaListado.css'

class UnaPeliculaListado extends Component{
    constructor(props){
        super(props);
        this.state = {
            claseDescripcion: 'hide',
            textoDescripcion: 'Ver descripcion',
            textoFavorito: ''
        }
    }

    componentDidMount () {
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        if(listaLocalStorage.includes(this.props.props.id)){
            this.setState({textoFavorito: 'Eliminar a favoritos'});
        } else {
           this.setState({textoFavorito: 'Agregar a favoritos'});
        }
    }

    verDescripcion(){
        if(this.state.claseDescripcion === 'hide'){
            this.setState({
                claseDescripcion: 'show', textoDescripcion: 'Ocultar descripcion'
            })
        } else {
            this.setState({
                claseDescripcion: 'hide', textoDescripcion: 'Ver descripcion'
            })
        }
    }

    favoritos(id) {
        let listaFavs = [];
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        let listaActualizada = []
        if(listaLocalStorage.length !== 0) {
            listaFavs = listaLocalStorage;
        }
        if(listaFavs.includes(id)){
            this.setState({textoFavorito: 'Agregar a favoritos'});
            listaActualizada = listaFavs.filter( (elm) => {
                return elm !== id;
            });
        } else {
           this.setState({textoFavorito: 'Eliminar a favoritos'});
           listaActualizada = listaFavs;
           listaActualizada.push(id);
        }

        let listaFavsJson = JSON.stringify(listaActualizada);
        localStorage.setItem('favoritos',listaFavsJson);
    }

    render () {
        return (
            <article className='character-card' >
            <Link to={`/unapelicula/id/${this.props.props.id}`}>
            <img src={`https://image.tmdb.org/t/p/w342/${this.props.props.poster_path}`} alt="" />
            </Link> 
            <h2> {this.props.props.title} </h2> 

            <p onClick={() => this.verDescripcion()} className='more'> {this.state.textoDescripcion} </p>

            <p className={this.state.claseDescripcion} >Descripcion: {this.props.props.overview}</p>

            <p onClick={() => this.favoritos(this.props.props.id)}>{this.state.textoFavorito}</p>

        </article>
        )

    }
}

export default UnaPeliculaListado;