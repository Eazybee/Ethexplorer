import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import routeData from './data';

const Routes = () => (
  <Router>
    <Suspense
      fallback={(
        <LoadingSpinner
          style={{
            position: 'fixed',
            top: '50%',
            right: '50%',
            marginLeft: 30,
            marginBottom: 30,
          }}
        />
      )}
    >
      <Switch>
        {routeData.default.map(({ exact, path, Component }) => (
          <Route key={path} exact={exact} path={path} component={Component} />
        ))}
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
