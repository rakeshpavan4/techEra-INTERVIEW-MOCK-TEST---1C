import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import SpecificTech from './components/SpecificTech'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={SpecificTech} />
    <NotFound />
  </Switch>
)

export default App
