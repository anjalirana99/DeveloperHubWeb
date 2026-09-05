import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Body from "./components/Body"
import { Provider } from "react-redux"
import appStore from "./store/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"

function App() {
 
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Body/>}>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/" element={<Feed/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/requests" element={<Requests/>}/>

        </Route>
            
        </Routes>
      </BrowserRouter>
    </Provider>
    
    </>
    
  )
}

export default App
