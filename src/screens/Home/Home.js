import React from "react";
import Listado from "../../components/Listado/Listado";
import Buscador from "../../components/Buscador/Buscador"


function Home() {
    return (
        <React.Fragment>
            <Buscador />
            <Listado  funcionalidades={{verTodas: true, formFiltro: false, cargarMas: false, populares: true, busqueda:false}} />
            <Listado  funcionalidades={{verTodas: true, formFiltro: false, cargarMas: false, populares: false, busqueda:false}} />
        </React.Fragment>

    );
}

export default Home;