import React from 'react'
import './App.css'
import LandingPage from './Components/LandingPage'
import RecipeInfo from './Components/RecipeInfo'
  // import Food from './Comp/Food'
  // import Recipe from './Comp/Recipe'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
   
    {/* <LandingPage/> */}
     <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/:mealid' element={<RecipeInfo/>}/>
     </Routes>
    </>
  )
}

export default App