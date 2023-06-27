import React from 'react';
import { Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { Home, Result } from './containers';
import './assets/styles/app.scss';
import locale from 'antd/es/locale/en_US';
import history from './history';

function App() {

  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => history.listen(setState),[history])

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#374151' } }} locale={locale}>
      <Router basename="/" navigator={history} location={state.location} navigationType={state.action}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="result" element={<Result />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
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
