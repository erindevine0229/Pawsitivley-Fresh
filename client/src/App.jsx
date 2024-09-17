import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';

import './index.css'

function App() {

  return (
    <>
        <Header />
        <Outlet />
       
    </>
  )
}

export default App
