import { RouteProps } from 'react-router-dom';

export interface BaseRouteItem extends RouteProps {
  type?: string;
  routes?: BaseRouteItem[];
}
