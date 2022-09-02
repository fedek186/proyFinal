import React from "react";
import Listado from "../Listado/Listado";

function Cartel() {
    return (
        <React.Fragment>            
            <Listado  funcionalidades={{verTodas: false, formFiltro: true, cargarMas: true, populares: false}} />

        </React.Fragment>

    );
}

export default Cartel;