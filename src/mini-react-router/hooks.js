import React from 'react';
import { matchPath, matchRoutes } from 'react-router-dom';
import { NavigationContext, RouteContext } from './Context';

export function useRoutes(routes) {
  const location = useLocation();
  const pathname = location.pathname;
  const matches = matchRoutes(routes, { pathname });

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

export function useResolvedPath(to) {
  const { matches } = React.useContext(RouteContext);
  const { pathname } = useLocation();
  const routePathnamesJson = JSON.stringify(
    matches.map((match) => match.pathnameBase)
  );

  return React.useMemo(
    () => ({ pathname: to, hash: '', search: '' }), //resolveTo(to, JSON.parse(routePathnamesJson), locationPathname),
    [routePathnamesJson, pathname]
  );
}

export function useMatch(pattern) {
  const { pathname } = useLocation();

  return React.useMemo(() => matchPath(pattern, pathname), [pattern, pathname]);
}

// children
export function useOutlet() {
  const { outlet } = React.useContext(RouteContext);

  return outlet;
}
