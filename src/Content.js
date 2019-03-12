import React, {PureComponent} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'

import 'animate.css/animate.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Home from './nav-pages/home';
import About from './nav-pages/about';
import Contact from './nav-pages/contact';
import HowToOrder from './nav-pages/how-to-order';
import Products from './nav-pages/products';
import ProductDetails from './nav-pages/product-details';
import Checkout from './nav-pages/checkout';

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const productsWithProps = () => {
      return (
        <Products search={this.props.search} searchProduct={this.props.searchProduct}
                  checkoutButton={this.props.checkoutButton} addProduct={this.props.addProduct} generateProductKey={this.props.generateProductKey}/>
      );
    };

    const howToOrderWithProps = () => {
      return (
        <HowToOrder search={this.props.search} searchProduct={this.props.searchProduct} />
      );
    };

    const homeWithProps = () => {
      return (
        <Home search={this.props.search} searchProduct={this.props.searchProduct} />
      );
    }


    return (
      <main>
        <Switch>
          <Route exact path='/' component={homeWithProps}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/howtoorder' component={howToOrderWithProps}/>
          <Route exact path='/products' component={productsWithProps}/>
          <Route path='/products/:id' render={(props) => (
            <ProductDetails {...props} checkoutButton={this.props.checkoutButton} addProduct={this.props.addProduct}
                            generateProductKey={this.props.generateProductKey} shoppingCart={this.props.shoppingCart} />)}
          />
          <Route path='/checkout' render={(props) => (
            <Checkout {...props} checkoutButton={this.props.checkoutButton} shoppingCart={this.props.shoppingCart} resetProducts={this.props.resetProducts}/>
            )}
          />
        </Switch>
      </main>
    );
  }
}

export default Content;
