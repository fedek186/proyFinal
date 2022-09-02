import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './UnaPeliculaListado.css'

class UnaPeliculaListado extends Component{
    constructor(props){
        super(props);
        this.state = {
            claseDescripcion: 'hide',
            textoDescripcion: 'Ver descripcion'
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

    render () {
        return (
            <article className='character-card' >
            <Link to={`/unapelicula/id/${this.props.props.id}`}>
            <img src={`https://image.tmdb.org/t/p/w342/${this.props.props.poster_path}`} alt="" />
            </Link> 
            <h2> {this.props.props.title} </h2> 

            <p onClick={() => this.verDescripcion()} className='more'> {this.state.textoDescripcion} </p>

            <p className={this.state.claseDescripcion} >Descripcion: {this.props.props.overview}</p>

            <p>agregar favorito falta</p>

        </article>
        )

    }
}

export default UnaPeliculaListado;