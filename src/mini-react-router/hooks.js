import React from 'react';
import { NavigationContext, RouteContext } from './Context';
import Outlet from './Outlet';
import { normalizePathname } from './utils';

export function useRoutes(routes) {
  // 遍历routes，渲染匹配的route

  const location = useLocation();

  let pathname = location.pathname;

  return routes.map((route) => {
    let match = pathname.startsWith(route.path);

    // return match ? route.element : null;

    // let matches = pathname.startsWith(route.path) ? {}: false;
    console.log("route", pathname, route);
    return (
      match &&
      route.children.map((child) => {
        let m = normalizePathname(child.path || '/') === pathname;

        return (
          m && (
            <RouteContext.Provider
              value={{ outlet: child.element }}
              children={
                route.element !== undefined ? route.element : <Outlet />
              }
            />
          )
        );
      })
    );
  });
}

export function useNavigate() {
  // 跳转
  const { naviagtor } = React.useContext(NavigationContext);

  return naviagtor.push;
}

export function useLocation() {
  const { location } = React.useContext(NavigationContext);
  return location;
}

// children
export function useOutlet() {
  const { outlet } = React.useContext(RouteContext);
  return outlet;
}
