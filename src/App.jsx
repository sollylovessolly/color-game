
import ColorGame from "./ColorGame";
import {ReactTyped} from "react-typed"
import './App.css';


function App() {
  return (
    <div className="main-container roboto-mono" >
      <h1>
      <ReactTyped strings={["welcome to solly's color game"]} typeSpeed={40} backSpeed={50} loop />
        </h1> 
      
      <ColorGame />
    </div>
  );
}

export default App;
