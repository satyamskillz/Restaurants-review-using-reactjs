import React from 'react';
import { BrowserRouter as Router , Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantsdetailsPage from "./routes/RestaurantsdetailsPage";
import { RestaurantsContextProvider } from './context/RestaurantsContext';
const App = () => {
    return <div className="container">
        <RestaurantsContextProvider>
        <Router>
            <Switch></Switch>
            <Route exact path="/" component = {Home} />
            <Route exact path="/restaurants/:id/update" component = {UpdatePage} />
            <Route exact path="/restaurants/:id" component = {RestaurantsdetailsPage} />
        </Router>
        </RestaurantsContextProvider>
    </div>
};

export default App;