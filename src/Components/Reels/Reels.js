import React from 'react'
import SignUp from './SignUp'
import { useStateValue } from './stateProvider'
import './Reels.css'
import {
    BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import Login from './Login';

function Reels() {
    const [state, dispatch] = useStateValue()

    return (
        <div className='reels'>
            <Router>
                <Switch>
                    {
                        state.user === null ?
                            (
                                <Route path='/signup' exact>
                                    <SignUp />
                                </Route>
                            ) : (
                                <>
                                    <Route path='/' exact>
                                        <h1>instagram</h1>
                                    </Route>


                                    <Route path='/login' exact>
                                        <Login />
                                    </Route>
                                </>
                            )
                    }


                </Switch>
            </Router>
        </div>

    )
}

export default Reels
