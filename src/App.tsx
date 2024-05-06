import React from 'react';
import './App.css';
import Cars from './features/Cars';


const App: React.FC = () => {
  
  return (
    <div className="App">
      <div className="container">
        <h1>Cars</h1>
        <Cars /> 
      </div>
    </div>
  );
}

export default App;
