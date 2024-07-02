
import React from 'react';
import RegistrationForm from './Components/Register';  
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './index.css'; 
function App() {
    return (
        <div className="App">
            <RegistrationForm />
        </div>
    );
}

export default App;
