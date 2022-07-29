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

  const [state, setState] = React.useState({ location: history.location });

  React.useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router children={children} naviagtor={history} location={state.location} />
  );
};

export default BrowserRouter;
