import './App.css';
import './main.scss';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/home/home';
import About from './containers/about/about';
import Faq from './containers/faq/faq';
import ProductList from './containers/products/productList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './containers/cart/Cart';
import Login from './containers/auth/login';
import PrivateRoute from './private/PrivateRoute';
import Store from './store';
import { Provider } from 'react-redux';
import { ProductProvider } from './context'
import Register from './containers/auth/Register';
import RouteL from './private/RouteL';
import notFound from './containers/auth/Notfound';
import ForgetPassword from './containers/auth/forgetPassword';
import Create from './containers/create/create';
import Blog from './containers/blogdisplay/blog';
import Details from './containers/details/details';



function App() {
  return (
    <ProductProvider>
      <Provider store={Store}>
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Home}></PrivateRoute>
            <RouteL path="/Login" component={Login}></RouteL>
            <RouteL path="/Register" component={Register}></RouteL>
            <Route path="/forgetPassword" component={ForgetPassword}></Route>
            <PrivateRoute path="/create" exact component={Create}></PrivateRoute>
            <PrivateRoute path="/dashboard/:page?" exact component={Blog}></PrivateRoute>
            <PrivateRoute path="/details/:id?" exact component={Details}></PrivateRoute>
            <Route path="/products" component={ProductList}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/faq" component={Faq}></Route>
            <Route component={notFound}></Route>
          </Switch>
        </Router>
      </Provider>
    </ProductProvider>
  );
}

export default App;
