import React, { useEffect } from 'react'
import SignUp from './SignUp'
import { useStateValue } from './stateProvider'
import './Reels.css'
import {
    BrowserRouter as Router, Switch, Route, Link,
} from "react-router-dom";
import Login from './Login';
import { auth } from './firebase';
import Welcome from './Welcome';

function Reels() {
    const [state, dispatch] = useStateValue()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            // console.log(authUser);
            // console.log(authUser?.email);
            // console.log(authUser?.displayName);
            // console.log(authUser?.uid);
            if (authUser) {
                console.log('app logged in');

                dispatch({
                    type: 'SIGN_IN',
                    payload: {
                        uid: authUser.uid,
                        email: authUser.email,
                        name: authUser.displayName
                    }
                })
            } else {
                console.log('app logges out');
                dispatch({
                    type: 'SIGN_OUT',
                    payload: null
                })
            }
        })

        return () => {
            unsubscribe()
        }
    }, [dispatch])

    console.log(state.user);
    return (
        <div className='reels'>
            <Router>
                <Switch>
                    {
                        !state.user ?
                            (<>
                                <Route path='/' exact>
                                    <Login />
                                </Route>
                                <Route path='/signup' exact>
                                    <SignUp />
                                </Route>
                            </>)
                            :
                            (<>
                                <Route path='/login' exact>
                                    <Login />
                                </Route>
                                <Route path='/signup' exact>
                                    <signUp />
                                </Route>
                                <Route path='/' exact>
                                    <Welcome />
                                </Route>
                            </>)
                    }

                </Switch>
            </Router>
        </div>

    )
}

export default Reels
