import { useState } from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Body from './components/Body'
import Create from './components/Create'
import Checklist from './components/CheckList'
import {Routes, Route} from 'react-router-dom'
import UseContext from './Context';


function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth/register' element={<Signup />}/>
        <Route path='/auth/login' element={<Signin />}/>
      </Routes>
  )
}

function Home() {
  const [createCardModel, setCreateCardModel] = useState(false)
  const [CheckListModel, setCheckListModel] = useState(false)
  const [cardResult, setCardResult] = useState([]);
  const [checkListResult, setCheckListResult] = useState([]);


  const contextValue = {
    createCardModel,
    setCreateCardModel,
    cardResult,
    setCardResult,
    CheckListModel,
    setCheckListModel,
    checkListResult,
    setCheckListResult,
  }

  return (
  <UseContext.Provider value={contextValue}>
    <Body />
    <Create />
    <Checklist />
  </UseContext.Provider> 
  )
  
}



export default App
