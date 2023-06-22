import React from 'react';
import logo from './logo.svg';
import { ConfigProvider } from 'antd';
import './App.css';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <div className="App">
          app
        </div>
    </ConfigProvider>
  );
}

export default App;
