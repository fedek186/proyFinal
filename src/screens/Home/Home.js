import React, {Component} from "react";
import Listado from "../../components/Listado/Listado";
import UnaPeliculaListado from "../../components/UnaPeliculaListado/UnaPeliculaListado"
import './home.css'

let apikey = '66374e925f9ce0061d8e10191732f374'

class Home extends Component {
    constructor(props){
        super(props)
        this.state ={
            input: '',
            data: []
        }
    }

    prevRecarga(e){
        e.preventDefault()
    }

    saveChanges(e){
        this.setState({input: e.target.value}, () => {
        this.busqueda()})
    }


busqueda(){
    if (this.state.input !=='') {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${this.state.input}`)
        .then (res => res.json())
        .then(data => {
            this.setState ({data:data.results}, () => console.log(data.results))
        })
        .catch (e => console.log(e))
    }
}

render(){
    return(
        this.state.input.length === 0 ?

    <React.Fragment>
        <form className="search" onSubmit={(e) => this.prevRecarga(e)}>
            <div className="IconContainer"> 
                <img src='/img/iconSearch.svg' alt='Search' className="search-icon" />
            </div>
            <input className="text" type='text' placeholder='Buscar pelicula' onChange={(e) => this.saveChanges(e)} value={this.state.input} />  
        </form> 

        <Listado  funcionalidades={{verTodas: true, formFiltro: false, cargarMas: false, populares: true, busqueda:false}} />
        <Listado  funcionalidades={{verTodas: true, formFiltro: false, cargarMas: false, populares: false, busqueda:false}} />
    
    </React.Fragment>

    :

    <React.Fragment>
        <form className="search" onSubmit={(e) => this.prevRecarga(e)}>
            <div className="IconContainer">
                <img src='/img/iconSearch.svg' alt='Search' className="search-icon" />
            </div>
            <input className="text" type='text' placeholder='pelicula' onChange={(e) => this.saveChanges(e)} value={this.state.input} /> 
        </form> 

        {this.state.data === '' ? <h3>Cargando</h3> :
        <section className='card-container'>
        {this.state.data.map((unaPelicula, idx) => <UnaPeliculaListado key={idx} props={unaPelicula}/>)}        
        </section>
        }
    </React.Fragment>
    )}
}

export default Home;