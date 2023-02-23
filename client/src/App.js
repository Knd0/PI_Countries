import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from '../src/components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import LandingPage from './components/LandingPage/LandingPage';
import CreateActivity from './components/CreateActivity/CreateActivity';

//Todas las rutas que voy a utilizar..
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route path= "/home" component = {Home}/>
        <Route path= "/countries/:id" component= {CountryDetail}/>
        <Route path= "/activity" component= {CreateActivity}/> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
