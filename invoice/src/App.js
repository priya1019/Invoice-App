
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React, { Suspense } from "react";
import Setting from './Components/Setting';
const Home =React.lazy(()=>import ('./Components/Home'))
const Login = React.lazy(() => import('./Components/Login'));
const Register = React.lazy(() => import('./Components/Register'));
const Dashboard = React.lazy(() => import('./Components/Dashboard'));
const Invoice = React.lazy(() => import('./Components/Invoice'));
const Preview = React.lazy(() => import('./Components/Preview'));

function App() {
  return (
    <div className="App">
    <Suspense fallback={
    <p>Loading...</p>}>
  
    <Router>
     
      <Routes>
        <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/setting" element={<Setting/>}></Route>
          <Route path="/invoice" element={<Invoice/>}></Route>
          <Route path="/preview" element={<Preview/>}></Route>
          <Route path="*" element={<p>Loading...</p>}></Route>  
      </Routes>
    </Router>
    </Suspense>
  </div>
  );
}

export default App;
