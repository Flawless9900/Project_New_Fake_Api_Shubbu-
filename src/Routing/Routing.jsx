import React from 'react'
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Header from '../Layout/Header/Header'
import Registration from '../Component/Registration'
import LogIn from '../Component/LogIn'
import ProductPage from '../Component/ProductPage'
import Error from '../Component/Errors'
import ProtectedRoutes from '../Component/ProtectedRoutes'

const Routing = () => {
  return (
    <Router>
      <Header/>
        <Routes>
            <Route path="registration" element={<Registration/>}/>

            <Route element={<ProtectedRoutes/>}>
            <Route path="login" element={<LogIn/>}/>
            </Route>
            <Route path="error" element={<Error/>}/>
            <Route path="productdetails" element={<ProductPage/>}/>
        </Routes>
    </Router>
  )
}

export default Routing