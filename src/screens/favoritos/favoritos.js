import React from "react";
import ListadoFav from "../../components/listadoFavoritos/listadoFavoritos";


function Favoritos() {
    return (
        <React.Fragment>
            {/* formulario de busqueda */}
            
            <ListadoFav  funcionalidades={{tipo:'peliculas',formFiltro: true}} />

        </React.Fragment>

    );
}

export default Favoritos;