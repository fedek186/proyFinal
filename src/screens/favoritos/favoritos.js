import React from "react";
import ListadoFav from '../../components/listadoFavoritos/listadoFavoritos'

function Favoritos() {
    return (
        <React.Fragment>
            <ListadoFav  funcionalidades={{formFiltro: true}} />
        </React.Fragment>

    );
}

export default Favoritos;