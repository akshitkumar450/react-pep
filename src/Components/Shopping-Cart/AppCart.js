import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import SingleItem from "./components/SingleItem/SingleItem";
import { connect } from 'react-redux';

function AppCart({ currentItem }) {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Products} />
                    <Route exact path="/cart" component={Cart} />
                    {/**if user to refresh the page for specific item page then the currentItem will be set to null and we will get an error  to avoid this we will redirect to */}
                    {!currentItem ?
                        <Redirect to="/" />
                        :
                        <Route exact path="/product/:id" component={SingleItem} />
                    }
                    <Route exact path="/product/:id" component={SingleItem} />
                </Switch>
            </div>
        </Router>
    )
}
const mapStateToProps = (state) => {
    return {
        currentItem: state.cart.currentItem
    }
}

export default connect(mapStateToProps)(AppCart)