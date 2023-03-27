import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "./routes/Router";
import { createContext, useState } from "react";
import './styles/login.css'
import Footer from './components/Footer'
export const lenContext = createContext();

function App() {
  const [userName, setUserName] = useState('');
  const [request, setRequest] = useState('');

  const lenVar = {
    userName: userName,
    setUserName: setUserName

  }
  return (
    <div>
      < lenContext.Provider value={lenVar}>
        <Router />
      </lenContext.Provider>
      <Footer/>
    </div>
  );
}

export default App;
