import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { Login, Main } from './views/index'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
