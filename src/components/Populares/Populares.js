import React from "react";
import Listado from "../Listado/Listado";

function Populares() {
    return (
        <React.Fragment>            
            <Listado  funcionalidades={{verTodas: false, formFiltro: true, cargarMas: true, populares: true}} />

        </React.Fragment>

    );
}

export default Populares;