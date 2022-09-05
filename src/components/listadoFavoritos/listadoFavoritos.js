import React, {Component} from 'react';
import UnaPeliculaListado from '../UnaPeliculaListado/UnaPeliculaListado';


let apikey = '66374e925f9ce0061d8e10191732f374'
class ListadoFavs extends Component{  
    constructor(props){
        super(props);
        this.state = {
            datos: [],
            input: ''
        }
    }
    componentDidMount () {
        let listaFavs = []
        if(this.props.funcionalidades.tipo === 'peliculas') {listaFavs = JSON.parse(localStorage.getItem('favoritos'));}
        listaFavs.map((id)=> {
            fetch(this.props.funcionalidades.tipo === 'peliculas' ? `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`:'error')
            .then(response=>response.json())
            .then(data=> {
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
                <h1>{this.props.funcionalidades.tipo === 'peliculas' ? 'Peliculas Favoritas' : 'Series favoritas'}</h1>
                <p>{this.props.funcionalidades.formFiltro ? 'aca va el input y el form' : ''}</p>           
                <section className='card-container'>
                    {this.state.datos === [] ? <h3>Cargando ...</h3> : 
                    this.state.datos.map((unPersonaje, idx) => <UnaPeliculaListado props={unPersonaje} key={idx} />)
                    }
                </section>
            </React.Fragment>
        )

    }
}

export default ListadoFavs;