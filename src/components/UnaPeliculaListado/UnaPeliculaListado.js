import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './UnaPeliculaListado.css'

class UnaPeliculaListado extends Component{
    constructor(props){
        super(props);
        this.state = {
            claseDescripcion: 'hide',
            textoDescripcion: 'Ver descripcion',
            textoFavorito: 'Agregar a favoritos'
        }
    }

    componentDidMount () {
        /* Cambiamo el nombre del texto favorito de la pelicula*/
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        if(listaLocalStorage !== null){
            if(listaLocalStorage.includes(this.props.props.id)) {
                this.setState({textoFavorito: 'Eliminar a favoritos'});
            } else{
                this.setState({textoFavorito: 'Agregar a favoritos'});
            }
        }
    }

    verDescripcion(){
        /* Hacemos la funcion de ver la descriocion. Nos preguntamos si en el estado esta oculto y dependiendo de eso la mostramos y alteramos el estado */
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

    funciones() {
        this.props.favs(this.props.props.id)
        this.cambiarFav();
    }

    cambiarFav() {
         let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
         if(listaLocalStorage !== null){
             if(listaLocalStorage.includes(this.props.props.id)) {
                 this.setState({textoFavorito: 'Eliminar a favoritos'});
             } else{
                 this.setState({textoFavorito: 'Agregar a favoritos'});
             }
         }
    }


    render () {
        return (
            <article className='character-card' >
            <Link to={`/unapelicula/id/${this.props.props.id}`}>
            <img src={`https://image.tmdb.org/t/p/w342/${this.props.props.poster_path}`} alt="" />
            </Link> 
            
            <h2 className="card-title"> {this.props.props.title} </h2> 

            <div className='containerFavCard' onClick={() => this.funciones() }>
                <p>{this.state.textoFavorito}</p>
            </div>

            <p onClick={() => this.verDescripcion()} className='more'> {this.state.textoDescripcion} </p>

            <p className={this.state.claseDescripcion} >Descripcion: {this.props.props.overview}</p>

        </article>
        )

    }
}

export default UnaPeliculaListado;