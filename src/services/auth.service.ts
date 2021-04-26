import {BindingScope, injectable} from '@loopback/core';
import _ from 'lodash';
import {UserPermission, UserRoute} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor() {}

  getRoutesFromPermissions(permissions: UserPermission[]) {
    const flatRoutes = permissions.flatMap(permission => permission.routes);

    const routesMap = flatRoutes.reduce((acc, route) => {
      if (!acc.has(route.source)) return acc.set(route.source, route);

      const currentRoute = acc.get(route.source);
      currentRoute.actions = [
        ...(currentRoute.actions || []),
        ..._.difference(currentRoute.actions, route.actions || []),
      ];
      acc.set(route.source, currentRoute);

      return acc;
    }, new Map());

    let routes = [] as UserRoute[];
    routesMap.forEach(route => {
      routes.push(route);
    });

    return routes;
  }
}
