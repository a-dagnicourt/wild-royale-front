// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResponsiveDrawer from './Layout';
import AdminFamily from './AdminFamily';
import adminProperty from './adminProperty';
import Home from './Home';
import SignIn from './SignIn';
// import CompanySignUp from './SignUp/CompanySignUp';

const LayoutedRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const connected = useSelector((state) => state.auth.isAuth);

  if (!connected) {
    return <Redirect to="/signin" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignIn} />
        {/* <Route path="/signup" component={CompanySignUp} /> */}
        <LayoutedRoute
          path="/adminFamily"
          layout={ResponsiveDrawer}
          component={AdminFamily}
        />
        <LayoutedRoute
          path="/adminProperty"
          layout={ResponsiveDrawer}
          component={adminProperty}
        />
        <LayoutedRoute
          exact
          path="/"
          layout={ResponsiveDrawer}
          component={Home}
        />
      </Switch>
    </BrowserRouter>
  );
}

LayoutedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  layout: PropTypes.node.isRequired,
};
