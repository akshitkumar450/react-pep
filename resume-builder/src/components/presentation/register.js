import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { auth, db } from "../../firebase";
import { removeError, signUpFail, signUpReq, signUpSuccess } from "../../redux/actions/authActions";

function Register(props) {
  let history = useHistory();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = async () => {
    dispatch(signUpReq())
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        console.log('signed up');
        await db
          .collection('users')
          .doc(authUser.user.uid)
          .set({
            email: email,
            resumeId: []
          })
        dispatch(signUpSuccess(authUser.user))
        history.push('/')
      })
      .catch((err) => {
        dispatch(signUpFail(err.message))
        setTimeout(() => {
          dispatch(removeError())
        }, 2000)
      })
    setEmail('')
    setPassword('')
  }
  // console.log(props.auth.user.user);
  return (
    <>
      {
        props.auth.loading
          ?
          <h4 style={{ marginTop: '10%', height: '52vh' }}>
            Patiently Wait...we are resgistering you in</h4>
          :
          <div className="container med contact">
            <div className="section funnel-section">
              <div className="form-card">
                <h2 className="form-heading center">Enter your details</h2>
                <div className="form-section">
                  <div className="input-group full"><label>Email</label>
                    <div className="effect"><input type="text" name="email" value={email || ''} onChange={handleEmail} /><span></span>
                    </div>
                  </div>
                  <div className="input-group full"><label>Password</label>
                    <div className="effect"><input type="password" name="password" value={password || ''} onChange={handlePassword} /><span></span>
                    </div>
                  </div>
                  {
                    props.authMine?.ErrorMessage?.message
                      ? <div className="input-group full">
                        <span className="error-message" >
                          {props.authMine?.ErrorMessage?.message}
                        </span>
                      </div> :
                      <></>
                  }
                  <div className="form-buttons">
                    <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Register</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Register)