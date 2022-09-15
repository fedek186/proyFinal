import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import Cartel from './screens/Cartel/Cartel';
import Populares from './screens/Populares/Populares';
import Favoritos from './screens/Favoritos/Favoritos';
import Detalle from './screens/DetallePel/DetallePel';
import NotFound from './screens/NotFound/NotFound';
import ResBusqueda from './screens/ResBusqueda/ResBusqueda'

function App() {
  return (
    <React.Fragment>
      <header>
        <Navbar/>
      </header>

      <main>
        <Switch>
          
          <Route path='/' exact={true} component={Home} />
          <Route path='/populares' exact={true} component={Cartel} />
          <Route path='/cartel' exact={true} component={Populares} />
          <Route path='/favoritos' exact={true} component={Favoritos} />
          <Route path='/unapelicula/id/:id' component={Detalle}/>
          <Route path='/searchresult/id/:id' component={ResBusqueda}/>

          <Route path='' component={NotFound} />
          
        </Switch>


      </main>

      <footer>
        <Footer/>
      </footer>
    </React.Fragment>
      
  );
}

export default App;
