import React from "react";
import Listado from "../Listado/Listado";


function Home() {
    return (
        <React.Fragment>
            {/* formulario de busqueda */}
            
            <Listado  funcionalidades={{verTodas: true, formFiltro: false, cargarMas: false, populares: true}} />
            <Listado  funcionalidades={{verTodas: true, formFiltro: false, cargarMas: false, populares: false}} />

        </React.Fragment>

    );
}

export default Home;