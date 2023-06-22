import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { Home, Result } from './containers';

import './App.css';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
       <BrowserRouter basename="/">
          <Routes>
            <Route index element={<Home />} />
            <Route path="result" element={<Result />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
    </ConfigProvider>
  );
}

const NoMatch = () => (
  <div>
    <h1>404</h1>
    <p>Sorry, page not found</p>
  </div>
);

export default App;
