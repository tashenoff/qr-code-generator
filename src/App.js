import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import './index.css';

function App() {
  return (
    <div className="App bg-gray-200 h-screen flex flex-col justify-center items-center">
      <QRCodeGenerator />
    </div>
  );
}

export default App;