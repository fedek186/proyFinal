import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Buscador extends Component{
    constructor(props){
        super (props);
        this.state={
            input: '',
        }
    }
    prevRecarga(e){ 
        //Evitamos se envie el formulario
        e.preventDefault();
    };
    saveChanges(e){ 
        //Hacemos que en el estado se guarde el valor del onChange xq sino estaria atrasado
        this.setState({input: e.target.value}); 
    };
    render () {
        
        return (
            <React.Fragment>
                <form onSubmit={(e) => this.prevRecarga(e)}>
                    <input type='text' placeholder='pelicula' onChange={(e) => this.saveChanges(e)} value={this.state.input} />
                    <Link to={`/searchresult/id/${this.state.input}`}> <input type='submit' value='submit' /> </Link>    
                </form> 
            </React.Fragment>
        )

    }
}

export default Buscador;