import React from "react";
import ListadoFav from "../../components/ListadoFavoritos/ListadoFavoritos";


function Favoritos() {
    return (
        <React.Fragment>
            {/* formulario de busqueda */}
            
            <ListadoFav  funcionalidades={{tipo:'peliculas',formFiltro: true}} />

        </React.Fragment>

    );
}

export default Favoritos;