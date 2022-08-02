import React from 'react';
import { matchRoutes } from 'react-router-dom';
import { NavigationContext, RouteContext } from './Context';

export function useRoutes(routes) {
  const location = useLocation();

  const pathname = location.pathname;

  const matches = matchRoutes(routes, { pathname });
  console.log('matches', matches);

  return renderMatches(matches);
}

function renderMatches(matches) {
  if (matches === null) {
    return null;
  }

  return matches.reduceRight((outlet, match) => {
    return (
      <RouteContext.Provider
        value={{ outlet, matches }}
        children={match.route.element || outlet}
      />
    );
  }, null);
}

export function useNavigate() {
  // 跳转
  const { naviagtor } = React.useContext(NavigationContext);

  const navigate = React.useCallback(
    (to, options = {}) => {
      if (typeof to === 'number') {
        navigator.go(to);
        return;
      }

      (!!options.replace ? naviagtor.replace : naviagtor.push)(
        to,
        options.state
      );
    },
    [naviagtor]
  );

  return navigate;
}

export function useLocation() {
  const { location } = React.useContext(NavigationContext);

  return location;
}

export function useParams() {
  const { matches } = React.useContext(RouteContext);

  const routeMatch = matches[matches.length - 1];

  return routeMatch ? routeMatch.params : {};
}

// children
export function useOutlet() {
  const { outlet } = React.useContext(RouteContext);

  return outlet;
}
