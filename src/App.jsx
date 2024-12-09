import Login from './Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Admin from './Admin'
import Home from './Home'
import './App.css'

function App() {
  

  return (
    <div className='root'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>

    </div>
  )
}

export default App
