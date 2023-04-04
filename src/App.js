import LoginForm from "./LoginForm";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import RequireAuth from "./RequireAuth";
import Dashboard from "./Dashboard";


function App() {
  return (
   <Router>
  
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={LoginForm} />
      <Route exact path="/dashboard">
        <RequireAuth component={Dashboard} />
      </Route>
    </Switch>
   </Router>
  );
}

export default App;
