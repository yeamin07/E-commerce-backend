import '../App.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const SignUp = () => {
  const [errors, setErrors] = useState([])
  const userNameInputRef = useRef()
  const passwordInputRef = useRef()
  const emailInputRef = useRef()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify({ username: userNameInputRef.current.value, email: emailInputRef.current.value, password: passwordInputRef.current.value,})
    })
      .then(res => {
        if (res.ok) {
          navigate('/login')
        } else {
          console.log(res);
          return res.json()
        }
      })
      .then(result => {
        let errorArray = []
        for (let error in result) {
          errorArray.push(result[error])
        }
        setErrors(errorArray)
      })
  }

  return (
    <>
      <Header />
      <div className='Form__section' style={{marginTop:'10px'}}>
        <h2>Create Your Account</h2>
        <br />
        <form className='Form__section-input' onSubmit={handleSubmit}>
          <input type='email' name='email' ref={emailInputRef} placeholder='Enter your Email' />
          <br />
          <br />
          <input type='text' name='username' ref={userNameInputRef} placeholder='Enter Username' />
          <br />
          <br />
          <input type='password' name='password' ref={passwordInputRef} placeholder='Enter Password' />
          <br />
          <br />
          <div className=' d-grid gap-2'>
            <input type='submit' value="Sign Up" className='btn btn-info' />
          </div>
        </form>
      </div>
      {errors.length !== 0 ? (
      <>
        {errors.map(error => (
          <p style={{ marginTop: '10px',textAlign: 'center', color: 'red' }}>{error}</p>
        ))}
      </>
    ) : null}
    </>
  )
}

export default SignUp