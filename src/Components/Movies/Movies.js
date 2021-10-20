import Banner from './Banner'
import Nav from './Nav'
import Row from './Row'
import requests from './requests'
import {
    BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import Favourites from './Favourites';

function Movies() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path='/' exact>
                    <Banner />
                    <Row title="Top Rated" fetchUrl={requests.discoverAll} />
                </Route>

                <Route path='/favourites' exact>
                    <Favourites />
                </Route>
            </Switch>
        </Router>
    )
}

export default Movies
