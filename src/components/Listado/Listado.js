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
            input: '',
            data2: ''
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
                .then(data=> {
                    this.setState({datos: data.results})
                })
                .catch(error=>console.log('El error fue: ' + error)) 
            }
        this.setState({pageNumber:this.state.pageNumber + 1})
        
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

    prevRecarga(e){ 
        e.preventDefault();
    };
    saveChanges(e){ 
        this.setState({input: e.target.value}); 
        if (e.target.value !== ''){
            let result = this.state.datos.filter((unaPelicula) => {
                return unaPelicula.title.toLowerCase().includes(e.target.value)
                })
            console.log(result);
            this.setState({data2: result}, () => console.log(this.state.data2))    
        } else {
            this.setState({data2: ''})
        }
    };

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

        let titulo = '';
        if(this.props.funcionalidades.busqueda) {
            titulo = `Resultados de busqueda para ${this.props.busqueda}`;
        } else {
            this.props.funcionalidades.populares ? titulo = 'Peliculas Populares' : titulo = 'Peliculas en Cartel'
        }

        let mostrar;
        if(this.state.datos === '') {
            mostrar = 'Cargando...'
        } else {
            if(this.state.data2 === '') {
            mostrar = this.state.datos

            } else if (this.state.data2.length === 0){
                mostrar = 'No se encontraron resultados para ese filtro'
         
            } else {
                mostrar = this.state.data2
            }
        }

        return (
            <React.Fragment>
                <h1 className="titleListado"> {titulo} </h1>
                {this.props.funcionalidades.formFiltro ? 
                        <form className='search' onSubmit={(e) => this.prevRecarga(e)}>
                            <div className="IconContainer"> 
                                <img src='/img/iconSearch.svg' alt='Search' className="search-icon" />
                            </div>
                            <input className="text" type='text' placeholder='pelicula' onChange={(e) => this.saveChanges(e)} value={this.state.input} />  
                        </form> 
                        :
                        '' 
                }
                <section className='card-container'>
                    {mostrar === 'Cargando...' || mostrar === 'No se encontraron resultados para ese filtro' ? <h3 className='noResults'>{mostrar}</h3> :
                      this.state.datos === [] ? <img src="./img/loader.gif" /> : 
                        mostrar.map((unaPelicula, idx) => <UnaPeliculaListado props={unaPelicula} favs={(id) => this.favoritos(id)} key={idx} />)
                    }

                </section>
                {this.props.funcionalidades.cargarMas ? <button className='traerMas'onClick={() => this.masPeliculas()}> Mas Peliculas </button> : ''}                
                {this.props.funcionalidades.verTodas ? <h3 className='vertTodas'><Link to={this.props.funcionalidades.populares ? '/populares' : '/cartel'}> Ver todas las {this.props.funcionalidades.populares ? 'Peliculas Populares' : 'Peliculas en Cartel'} </Link></h3> : ''}                
            </React.Fragment>
        )

    }
}

export default Listado;