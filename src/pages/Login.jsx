import React from 'react'
import { useRef,useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Header from '../components/Header'
import {AuthContext} from '../contexts/Auth'

const Login = () => {
  const userNameInputRef = useRef()
  const passwordInputRef = useRef()
  const [error,setError] = useState()

  const authcontext = useContext(AuthContext)
  const navigate = useNavigate()

  const loginHandler = (e) => {
    e.preventDefault()
    fetch(`http://127.0.0.1:8000/api/auth/`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: userNameInputRef.current.value,
        password: passwordInputRef.current.value
      })
    })
    .then(res => {
      if(res.ok && res.status !== 400){
        return res.json()
        .then(data => {
          authcontext.login(data.user, data.token)
          navigate('/')
        })
      } else if(!res.ok && res.status===400){
        return res.json()
        .then(responseData => {
          console.log(responseData);
          setError(responseData.non_field_errors[0])
        })
      }
    })
    .catch(err => (
      alert(err)
    ))
  }
  return (
    <>
      <Header />
      <section className='Login__section'>
        <h1>Login to your Account</h1>
        <form className='Login__section-input' onSubmit={loginHandler}>
          <div>
            <input type='text' name='username' required ref={userNameInputRef} placeholder='Enter Username' />
          </div>
          <div>
            <input type='password' name='password' required ref={passwordInputRef} placeholder='Enter Password' />
          </div>
          <div className='d-grid gap-2'>
            <button className='btn btn-info'>Login</button>
          </div>
        </form>
      </section>
      {error && (        
        <p style={{textAlign:'center', marginTop:'20px', color: 'red'}}>{error}</p>
      )}
    </>
  )
}

export default Login
