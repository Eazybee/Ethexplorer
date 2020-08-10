import HomePage from '../pages/HomePage';

type RouteData = {
  default: {
    exact: boolean;
    path: string;
    protected?: boolean;
    Component: () => JSX.Element;
  }[];
};

const Routes: RouteData = {
  default: [
    {
      exact: true,
      path: '/',
      Component: HomePage,
    },
  ],
};

export default Routes;
