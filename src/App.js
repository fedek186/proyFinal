import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import Cartel from './screens/Cartel/Cartel';
import Populares from './screens/Populares/Populares';
import Favoritos from './screens/Favoritos/favoritos'
import Detalle from './screens/DetallePel/detallePel'
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import NotFound from './screens/NotFound/NotFound';

function App() {
  return (
    <React.Fragment>
      <header>
        <Navbar/>
      </header>

      <main>
        <Switch>
          
          <Route path='/' exact={true} component={Home} />
          <Route path='/login' exact={true} component={Login} />
          <Route path='/register' exact={true} component={Register} />
          <Route path='/cartel' exact={true} component={Cartel} />
          <Route path='/populares' exact={true} component={Populares} />
          <Route path='/favoritos' exact={true} component={Favoritos} />
          <Route path='/unapelicula/id/:id' component={Detalle}/>
          <Route path='' component={NotFound} />
          this.match.params.identificador
        </Switch>


      </main>

      <footer>
        <Footer/>
      </footer>
    </React.Fragment>
      
  );
}

export default App;
