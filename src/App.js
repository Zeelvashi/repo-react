
import './App.css';
// import Dashboard from "./component/admindash"
import Header from './component/Header';
import dotenv, { config } from 'dotenv'
dotenv.config();
function App() {
  return (
    <div className="App">
    
      <Header/>
     
    </div>
  );
}

export default App;
