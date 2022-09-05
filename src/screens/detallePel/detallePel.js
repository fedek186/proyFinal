import React, {Component} from 'react';
import './detallePel.css'

let apikey = '66374e925f9ce0061d8e10191732f374'
class Detail extends Component{  
    constructor(props){
        super(props);
        this.state = {
            pelicula: '',
            textoFavorito: ''
        }
    }
    
    componentDidMount () {
        const id = this.props.match.params.id;
        console.log(this.props.match,'Fede')
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        console.log(listaLocalStorage);
        if(listaLocalStorage && listaLocalStorage.includes(parseInt(id))){
           
            this.setState({textoFavorito: 'Eliminar de favoritos'});
        } else {
           this.setState({textoFavorito: 'Agregar a favoritos'});
        }
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
        .then(response=>response.json())
        .then(data=> {
            this.setState({pelicula: data})
        })
        .catch(error=>console.log('El error fue: ' + error))
    }

    favoritos(id) {
        console.log('Fede')
        let listaFavs = [];
        let listaLocalStorage = JSON.parse(localStorage.getItem('favoritos'))
        let listaActualizada = []
        if(listaLocalStorage && listaLocalStorage.length !== 0) {
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
            <React.Fragment>
                {
                this.state.pelicula === '' ? <h3>Cargando ...</h3> : 
                    <article className="containerGeneral">
                        <img className= "imagen"src={`https://image.tmdb.org/t/p/w342/${this.state.pelicula.poster_path}`} alt=""/>
                        <div className='info'>
                            <h2 className='title'> {this.state.pelicula.title}</h2>
                            <ul>
                                {this.state.pelicula.genres.map((obj, idx) => <li className='generos' key={idx+obj.name}> {obj.name} </li>)}
                            </ul>
                            <div>
                                <p>{this.state.pelicula.release_date}</p>
                                <p>Rating: {this.state.pelicula.vote_average}</p>
                                <p>Duracion: {this.state.pelicula.runtime} min</p>
                            </div>
                            <p className='sinopsis'>{this.state.pelicula.overview}</p>
                            
                            <div className='favoritosContainer' onClick={() => this.favoritos(this.state.pelicula.id)}>
                                <p className='fav'>{this.state.textoFavorito}</p>
                            </div>

                        </div>
                    </article>
                }
            </React.Fragment>
        )

    }
}

export default Detail;