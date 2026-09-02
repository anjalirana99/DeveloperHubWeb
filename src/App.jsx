import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    <h1 className="text-3xl font-bold underline">Hello World</h1>
    <button classNa="btn btn-primary">
    </button>
    </>
    
  )
}

export default App
