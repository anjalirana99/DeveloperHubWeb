import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Body from "./components/Body"

function App() {
 
  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
       </Route>
          
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App
