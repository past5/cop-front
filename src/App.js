import React, {PureComponent} from 'react';
import './App.css';

import Navigation from './Navigation';
import Content from './Content';
import Footer from './Footer';
import {withRouter} from 'react-router-dom';
import {
  CartComponent,
  ProductComponent,
  CheckoutButtonComponent,
  cartLocalization,
} from 'react-shopping-cart';
var cloneDeep = require('lodash.clonedeep');
const { getDefaultLocalization } = cartLocalization;
const medicationLocalization = {
  quantities: 'Packages',
  USD: '$',
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    let products = sessionStorage.getItem('products');
    this.state = {
      searchProduct: '',
      products: products !== null ? JSON.parse(products) : {},
      getCheckoutButtonLocalization:
        getDefaultLocalization(
          'checkoutButton',
          'en',
          medicationLocalization,
        ),
      getCartLocalization:
        getDefaultLocalization(
          'cart',
          'en',
          medicationLocalization
        ),
    };
  }

  checkoutButton = () => {
    return <CheckoutButtonComponent
      grandTotal={this.calculateGrandTotal()}
      hidden={Object.keys(this.state.products).length === 0 && this.state.products.constructor === Object}
      checkoutURL="/checkout"
      currency="USD"
      getLocalization={this.state.getCheckoutButtonLocalization}
    />;
  }

  calculateGrandTotal() {
    let total = 0;
    Object.keys(this.state.products).forEach((key) => {
      let product = this.state.products[key];
      let price = product.quantity * product.prices["USD"];
      total += price;
    });
    return total;
  }

  cartComponent = () => {
    return <CartComponent
      products={
        this.state.products
      }
      onUpdateProduct={
        this.updateProduct
      }
      getLocalization={
        this.state.getCartLocalization
      }
      currency="USD"
      onRemoveProduct={
        this.removeProduct
      }
      checkoutButton={
        this.checkoutButton()
      }
      isCartEmpty={
        Object.keys(this.state.products).length === 0 && this.state.products.constructor === Object
      }
      getLocalization={this.state.getCartLocalization}
      altProductImageSrc = "product image"
    />;
  }

  setSearchProduct = (value) => {
    this.setState({searchProduct: value});
    this.props.history.push('/products');
  }

  resetSearchProduct = () => {
    this.setState({searchProduct: ''});
  }

  resetCartProducts = () => {
    this.setState({products: {}});
  }

  putInSessionStorage(product) {
    sessionStorage.setItem('products', JSON.stringify(this.state.products));
    if (product !== undefined) {
      this.props.history.push('/products/' + product.id);
    }
  }

  getProductImage = (key, product) => {
    return '/images/products/';
  }

  addProduct = (key, product, currency) =>
    this.setState(
      (
        {
          products:
            {
              [key]: cartProduct = { quantity: 0 },
              ...restOfProducts
            }
        }
      ) => ({
        products: {
          ...restOfProducts,
          [key]: {
            ...product,
            quantity:
            product.quantity +
            cartProduct.quantity,
          }
        }
      })
    , () => {this.putInSessionStorage(product)});

  generateProductKey = (id, properties) =>
    `${id}/${Object.entries(properties).join('_')}`;

  updateProduct = (key, updatedProduct) => {
    let products = cloneDeep(this.state.products);
    products[key] = updatedProduct;
    this.setState({products: products}, () => {
      this.putInSessionStorage()
    });
  };

  removeProduct = key => {
    let products = cloneDeep(this.state.products);
    delete products[key];
    this.setState({products: products}, () => {
        this.putInSessionStorage();
      });
  };

  render() {
    return (
      <div className="page text-center">
        <Navigation search={this.setSearchProduct} reset={this.resetSearchProduct} checkoutButton={this.checkoutButton()} shoppingCart={this.cartComponent()}/>
        <Content search={this.setSearchProduct} searchProduct={this.state.searchProduct} products={this.state.products}
                 addProduct={this.addProduct} generateProductKey={this.generateProductKey} resetProducts={this.resetCartProducts}
                 checkoutButton={this.checkoutButton()} shoppingCart={this.cartComponent()}
        />
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(App);
