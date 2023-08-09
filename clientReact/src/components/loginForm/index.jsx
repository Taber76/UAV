import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Input } from '../index.js'

import './styles.css'
//import swal from 'sweetalert'
import { useEffect, useState } from 'react'

const LoginForm = () => {
  const [data, setData] = useState({
    Username: '',
    Password: ''
  })
  const [warningUsername, setWarningUsername] = useState(false)
  const [warningPassword, setWarningPassword] = useState(false)
  const navigate = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console.log('entro al submit')
    if (data.Username === '' && data.Password === '') {
      navigate('/main')
      //setWarningUsername(true)
      //setWarningPassword(true)
      //return swal('Completar!', 'Username and Password!', 'warning')
    }
    if (data.Username === '') {
      //setWarningUsername(true)
      //return swal('Completar!', 'Username!', 'warning')
    }
    if (data.Password === '') {
      //setWarningPassword(true)
      //return swal('Completar!', 'Password!', 'warning')
    }
    const response = await axios.post(
      'http://localhost:8080/api/users/login',
      {
        username: data.Username,
        clave: data.Password
      }
    )
    if (response.status === 200) {
      localStorage.setItem("jwtToken", response.data.token);
      navigate('/students')
    } else {
      //return swal('Error!', 'Usuario o contraseña incorrectos!', 'error')
    }
  }

  const onChange = (e) => {
    console.log('esto es name ', e.target.name)
    if (warningUsername && e.target.name === 'Username') {
      setWarningUsername(false)
    }
    if (warningPassword && e.target.name === 'Password') {
      setWarningPassword(false)
    }
    const value = e.target.value
    const name = e.target.name
    setData({
      ...data,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <form className='formLogin' onSubmit={handleOnSubmit}>
      <Input name='Username' type='text' onChange={onChange} warning={warningUsername} />
      <Input name='Password' type='password' onChange={onChange} warning={warningPassword} />
      <Button name='Login' type='submit' />
    </form>
  )
}

export default LoginForm