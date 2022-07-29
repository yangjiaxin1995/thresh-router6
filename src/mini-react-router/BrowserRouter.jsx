import React from 'react';
import { createBrowserHistory } from 'history';
import Router from './Router';

const BrowserRouter = ({ children }) => {
  // 组件卸载之前用
  let historyRef = React.useRef();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  const history = historyRef.current;

  return <Router children={children} naviagtor={history} />;
};

export default BrowserRouter;
