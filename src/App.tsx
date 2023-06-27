import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { Home, Result } from './containers';
import './assets/styles/app.scss';
import locale from 'antd/es/locale/en_US';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#374151' } }} locale={locale}>
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
