import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { connect, useDispatch } from "react-redux";
import { signInFail, signInReq, signInSuccess } from "../../redux/actions/authActions";

function Login({ user }) {
  let history = useHistory();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // useEffect(() => {
  //   if(props.auth?.uid){
  //     history.push('/')
  //   }
  // }, [props])
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = () => {
    dispatch(signInReq())
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log('logges in', authUser);
        dispatch(signInSuccess(authUser))
        history.push('/')

      })
      .catch((err) => {
        dispatch(signInFail(err.message))
      })
  }
  return (
    <>
      {
        user.loading && <h1>Please wait ...</h1>
      }
      <div className="container med contact">
        <div className="section funnel-section">
          <div className="form-card">
            <h2 className="form-heading center">Enter Login details</h2>
            <div className="form-section">
              <div className="input-group full"><label>Email</label>
                <div className="effect">
                  <input type="text" name="email" value={email} onChange={handleEmail} />
                </div>
              </div>
              <div className="input-group full"><label>Password</label>
                <div className="effect">
                  <input type="password" name="password" value={password} onChange={handlePassword} />
                </div>
              </div>
              <div className="form-buttons">
                <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(Login)