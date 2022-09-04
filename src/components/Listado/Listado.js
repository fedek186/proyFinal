import React, {Component} from 'react';
import UnaPeliculaListado from '../UnaPeliculaListado/UnaPeliculaListado';
import {Link} from 'react-router-dom';

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
        fetch(this.props.funcionalidades.populares ? `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${this.state.pageNumber}` : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${this.state.pageNumber}`)
        .then(response=>response.json())
        .then(data=> {
           /*  console.log(data) */
            this.setState({datos: data.results, pageNumber: this.state.pageNumber + 1})
            })
        .catch(error=>console.log('El error fue: ' + error))
    }

    masPeliculas() {
        fetch(this.props.funcionalidades.populares ? `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${this.state.pageNumber}` : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${this.state.pageNumber}`)
        .then(response=>response.json())
        .then(data=> {
            console.log(data)
            this.setState({datos: this.state.datos.concat(data.results), pageNumber: this.state.pageNumber + 1})
            })
        .catch(error=>console.log('El error fue: ' + error))
    }

    prevRecarga(e){ 
        e.preventDefault();
    };
    saveChanges(e){ 
        this.setState({input: e.target.value, pageNumber: 0}); 
        fetch (`https://api.themoviedb.org/3/movie/${this.state.input}/lists?api_key=66374e925f9ce0061d8e10191732f374&page=${this.state.pageNumber}`)
        .then(response=>response.json())
        .then(data=> {
            console.log(data)
            this.setState({datos: this.state.datos, pageNumber: this.state.pageNumber})
        })
        .catch(error=> console.log('el error fue' + error))
        console.log(this.state.input);
    };

    filterPeliculas(){

    }

    render () {
        /* console.log(this.props.funcionalidades) */
        return (
            <React.Fragment>
                <h1>{this.props.funcionalidades.populares ? 'Peliculas Populares' : 'Peliculas en Cartel'}</h1>
                
                <form onSubmit={(e) => this.prevRecarga(e)}>
                    
                    <input type='text' placeholder='pelicula' onChange={(e) => this.saveChanges(e)} value={this.state.input} />

                    <input type='reset' value='Submit' />

                </form>   

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