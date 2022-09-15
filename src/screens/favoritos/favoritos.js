import React from "react";
import ListadoFav from "../../components/ListadoFavoritos/ListadoFavoritos";


function Favoritos() {
    return (
        <React.Fragment>
            <ListadoFav  funcionalidades={{formFiltro: true}} />
        </React.Fragment>

    );
}

export default Favoritos;