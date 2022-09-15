import React, {Component} from 'react';
import UnaPeliculaListado from '../UnaPeliculaListado/UnaPeliculaListado';
import {Link} from 'react-router-dom';
import './Listado.css';

let apikey = '66374e925f9ce0061d8e10191732f374'
class Listado extends Component{  
    constructor(props){
        super(props);
        this.state = {
            datos: '',
            pageNumber: 1,
            input: ''
        }
    }
    componentDidMount () {
        let busqueda = this.props.busqueda;
        /* Nos fijamos si se va a usar el listado para busqueda */
        if(this.props.funcionalidades.busqueda){
                /* Si es así traemos las peliculas buscadas de la API y las guardamos en data dentro del estado*/ 
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${busqueda}`)
                    .then(response=>response.json())
                    .then(data=> {
                        {this.setState({datos: data.results})}
                        console.log(data)
                    })
                    .catch(error=>console.log('El error fue: ' + error))
        } else {
            {
                /*Sino hay dos opciones o populares o cartel, hacemos un if ternario que haga lo mismo*/
                fetch(this.props.funcionalidades.populares ? `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${this.state.pageNumber}` : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${this.state.pageNumber}`) 
                .then(response=>response.json()) 
                .then(data=> {this.setState({datos: data.results})}) 
                .catch(error=>console.log('El error fue: ' + error)) 
            }
        
    }
}

    masPeliculas() {
        //Esta es la funcion + peliculas que lo que hace es traer, sea de populares o cartel la siguiente pagina. Actualizado el pageNumbre
        fetch(this.props.funcionalidades.populares ? `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${this.state.pageNumber}` : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${this.state.pageNumber}`)
        .then(response=>response.json())
        .then(data=> {
            console.log(data)
            this.setState({datos: this.state.datos.concat(data.results), pageNumber: this.state.pageNumber + 1})
            })
        .catch(error=>console.log('El error fue: ' + error))
    }

    filterPeliculas(){

    }

    render () {
        let titulo = '';
        if(this.props.funcionalidades.busqueda) {
            titulo = `Resultados de busqueda para ${this.props.busqueda}`;
        } else {
            this.props.funcionalidades.populares ? titulo = 'Peliculas Populares' : titulo = 'Peliculas en Cartel'
        }
        return (
            <React.Fragment>
                <h1 className="titleListado"> {titulo} </h1>
                <section className='card-container'>
                    {this.state.datos === '' ? <h3>Cargando ...</h3> : 
                    this.state.datos.map((unPersonaje, idx) => <UnaPeliculaListado props={unPersonaje} key={idx} />)
                    }
                </section>
                {this.props.funcionalidades.cargarMas ? <button onClick={() => this.masPeliculas()}> Mas Peliculas </button> : ''}                
                {this.props.funcionalidades.verTodas ? <h1><Link to={this.props.funcionalidades.populares ? '/populares' : '/cartel'}> Ver todas las {this.props.funcionalidades.populares ? 'Peliculas Populares' : 'Peliculas en Cartel'} </Link></h1> : ''}                
            </React.Fragment>
        )

    }
}

export default Listado;