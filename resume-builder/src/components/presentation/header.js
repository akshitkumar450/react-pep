import React, { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { signOutSuccess, signOutFail } from "../../redux/actions/authActions";
import logo from "../../static/images/logo.png";

const Header = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOutSuccess())
        history.push('/login')
      })
      .catch((err) => {
        dispatch(signOutFail(err))
      })

  }

  // console.log(props.auth.user.email);
  return (
    <header className="header">
      <nav className="nav">
        <a href="/" className="holder-logo">
          <img className='logo' src={logo}></img>
        </a>
        <div className="header-links full-height">
          <ul>
            {
              props.auth?.user?.uid
                ?
                <Fragment>
                  <li className="signin ">
                    <NavLink className="  " to="/">
                      Logged in as {props.auth.user.email}
                    </NavLink>
                  </li>
                  <li className="signin">
                    <button className="text-blue btnv-3"
                      onClick={handleLogOut}>
                      Signout
                    </button>
                  </li>
                </Fragment>
                :
                <Fragment>
                  <Link to='/login'>
                    <li className="signin">
                      <button className="text-blue btnv-3" >
                        Login
                      </button>
                    </li>
                  </Link>
                  <Link to='/register'>
                    <li className="signin">
                      <button className="text-blue btnv-3" >
                        signup
                      </button>
                    </li>
                  </Link>
                </Fragment>
            }
          </ul>
          <ul id="nav-mid">
            <li>
              <NavLink className="btn-nvt-gm" to="/resume-templates">
                Resume Templates
              </NavLink>
            </li>
            <li className="holder-pricing">
              <NavLink className="btn-nvt-gm" to="/about-us">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header >

  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header);
