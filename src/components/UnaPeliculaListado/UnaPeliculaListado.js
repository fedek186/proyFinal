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
        /* Cambiamo el nombre del texto favorito de la pelicula*/
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        if(listaLocalStorage && listaLocalStorage.includes(this.props.props.id)){
            this.setState({textoFavorito: 'Eliminar a favoritos'});
        } else {
           this.setState({textoFavorito: 'Agregar a favoritos'});
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

    favoritos(id) {
        /* Hacemos el añadir/quitar favorito */
        let listaFavs = [];
        /* Traemos la lista favoritos, sino existe trae undefined */
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        let listaActualizada = []
        /* Si existe entonces lo que hacemos es guardarlo en nuestra lista favoritos */
        if(listaLocalStorage && listaLocalStorage.length !== 0) {
            listaFavs = listaLocalStorage;
        }
        /* Ahora vamos a chequear si queria agregar o sacar, sacar = el id ya estaba en la lista */
        /* Luego cambiamos el estado del texto y actualizamos el array (agregando o sacando) */
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

        /* Convertimos la lista a JSON */
        let listaFavsJson = JSON.stringify(listaActualizada);
        /* La guardamos en el localStorage */
        localStorage.setItem('favoritos',listaFavsJson);
    }

    render () {
        return (
            <article className='character-card' >
            <Link to={`/unapelicula/id/${this.props.props.id}`}>
            <img src={`https://image.tmdb.org/t/p/w342/${this.props.props.poster_path}`} alt="" />
            </Link> 
            
            <h2 className="card-title"> {this.props.props.title} </h2> 

            <div className='containerFavCard' onClick={() => this.favoritos(this.props.props.id)}>
                <p>{this.state.textoFavorito}</p>
            </div>

            <p onClick={() => this.verDescripcion()} className='more'> {this.state.textoDescripcion} </p>

            <p className={this.state.claseDescripcion} >Descripcion: {this.props.props.overview}</p>

        </article>
        )

    }
}

export default UnaPeliculaListado;