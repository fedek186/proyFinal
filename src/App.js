import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Cartel from './components/Cartel/Cartel';
import Populares from './components/Populares/Populares';


function App() {
  let apikey = '66374e925f9ce0061d8e10191732f374'
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
          {/*}
          <Route path='/favoritos' exact={true} component={} />
          <Route path='/unapelicula/id/:id' component={}/>
          <Route path='' component={} />
          {*/}
        </Switch>


      </main>

      <footer>
        <Footer/>
      </footer>
    </React.Fragment>
      
  );
}

export default App;
