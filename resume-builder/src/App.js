import React, { useEffect } from 'react';
import './static/scss/app.scss';
import 'react-router-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/presentation/header';
import Footer from './components/presentation/footer';
import LandingPage from './components/presentation/landingPage';
import GettingStarted from './components/presentation/gettingStarted';
import Login from './components/presentation/login';
import Register from './components/presentation/register';
import AboutUs from './components/presentation/aboutUs';
import Contacts from './components/presentation/contact';
import Education from './components/presentation/education';
import Finalize from './components/presentation/finalizePage';
import { auth } from './firebase';
import { signInSuccess, signOutSuccess } from './redux/actions/authActions';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          dispatch(signInSuccess(authUser))
        } else {
          dispatch(signOutSuccess())
        }
      })
    return () => {
      unsubscribe()
    }
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/education" component={Education}></Route>
        <Route path="/contact" component={Contacts}></Route>
        <Route path="/getting-started" component={GettingStarted}></Route>
        <Route path="/resume-templates" component={GettingStarted}></Route>
        <Route path="/about-us" component={AboutUs}></Route>
        <Route path="/finalize" component={Finalize}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/" component={LandingPage}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
