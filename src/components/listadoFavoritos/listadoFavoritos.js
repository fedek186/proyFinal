import React, {Component} from 'react';
import UnaPeliculaListado from '../UnaPeliculaListado/UnaPeliculaListado';


let apikey = '66374e925f9ce0061d8e10191732f374'
class ListadoFavs extends Component{  
    constructor(props){
        super(props);
        this.state = {
            datos: []
        }
    }
    componentDidMount () {

        let listaFavs = []
        /* Obtengo los elemento de favoritos y hago un fetch de cada*/
        if(localStorage.getItem('favoritos')) {listaFavs = JSON.parse(localStorage.getItem('favoritos'));}
        listaFavs.map((id)=> {
            fetch( `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
            .then(response=>response.json())
            .then(data=> {
                /* Como obtengo 1 pelicula, entonces lo que hacemos es añadir a cada uno de ellos a una lista de peliculas */
                let listaDatos = this.state.datos;
                listaDatos.push(data)
                this.setState({datos: listaDatos})
            })
            .catch(error=>console.log('El error fue: ' + error))
        })
    }

    
    favoritos(id) {
        /* Hacemos el añadir/quitar favorito */
        let listaFavs = [];
        /* Traemos la lista favoritos, sino existe trae undefined */
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        let listaActualizada = []
        /* Si existe entonces lo que hacemos es guardarlo en nuestra lista favoritos */
        if(listaLocalStorage !== null) {
            listaFavs = listaLocalStorage;
        }
        /* Ahora vamos a chequear si queria agregar o sacar, sacar = el id ya estaba en la lista */
        /* Luego cambiamos el estado del texto y actualizamos el array (agregando o sacando) */
        if(listaFavs.includes(id)){
            listaActualizada = listaFavs.filter( (elm) => {
                return elm !== id;
            });
        } else {
           listaActualizada = listaFavs;
           listaActualizada.push(id);
        }

        /* Convertimos la lista a JSON */
        let listaFavsJson = JSON.stringify(listaActualizada);
        /* La guardamos en el localStorage */
        localStorage.setItem('favoritos',listaFavsJson);
        /*Inicializamos devuelta el estado y lo cargamos con nuestra neuva lista*/
        this.setState({datos: []})
        listaActualizada.map((id)=> {
            fetch( `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
            .then(response=>response.json())
            .then(data=> {
                /* Como obtengo 1 pelicula, entonces lo que hacemos es añadir a cada uno de ellos a una lista de peliculas */
                let listaDatos = this.state.datos;
                listaDatos.push(data)
                this.setState({datos: listaDatos})
            })
            .catch(error=>console.log('El error fue: ' + error))
        })
    }

    render () {
        return (
            <React.Fragment>
                <h1 className='titleListado'>Peliculas Favoritas</h1>  
                      
                <section className='card-container'>
                    {
                    localStorage.getItem('favoritos') === null ? <h2 className='titleListado'>No hay peliculas en favoritos </h2> :
                    JSON.parse(localStorage.getItem('favoritos')).length === 0 ? <h2 className='titleListado'>No hay peliculas en favoritos </h2> :
                    this.state.datos.length === 0 ? <img className='loader' src="./img/loader.gif" /> : 
                    this.state.datos.map((unaPelicula, idx) => <UnaPeliculaListado props={unaPelicula} favs={(id) => this.favoritos(id)} key={idx} />)
                    }
                </section>
            </React.Fragment>
        )

    }
}

export default ListadoFavs;