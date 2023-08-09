import reactLogo from '../../assets/react.svg';
import { LoginForm } from '../../components/index';
import './styles.css';

const Login = () => {

  console.log('Login')
  return (
    <div className='fullFormContainer'>
    <div className='imageAndFormContainer'>
      <div className='half'>
        <img className='logo' src={reactLogo} alt='logo' />
      </div>
      <hr className='hrFullForm' />
      <div className='half'>
        <div className='formAndH1container'>
          <h1 className='h1FullForm'>Welcome</h1>
            <LoginForm />
          <h4 className='h4FullForm'>Don`t have an account? <a href='/signup' className='link'>Sign Up</a></h4>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login