import React, {PureComponent} from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import Api from '../api/api';
import {Link} from 'react-router-dom'
import {
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

class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayedProduct: {
        name: '',
        id: '',
        path: '',
        properties: {
          quantities: [
            {
              additionalCost:
                {
                  USD: 0,
                },
              value: '0 tablets',
            },
          ]
        },
        propertiesToShowInCart: ['quantities'],
        prices: { USD: 0 },
        currency: 'USD',
        imageSrc: '',
      },
      medications: [],
      prices: [],
      getProductLocalization:
        getDefaultLocalization(
          'product',
          'en',
          medicationLocalization,
        ),
    };

    this.getCurrentProduct(props);
  }

  componentWillReceiveProps(nextProps){
    this.getCurrentProduct(nextProps);
  }

  setMedicationState(medications) {
    let displayedProduct = cloneDeep(this.state.displayedProduct);
    let medication = medications[0];
    displayedProduct.scrollPosition = 0;
    displayedProduct.name = medication.medication_name + ' ' + medication.medication_strength + ' ' + medication.medication_strengthunits + ' ' + this.isProductGeneric(medication.medication_isgeneric);
    displayedProduct.id = this.props.match.params.id;
    displayedProduct.path = '/products/' + this.props.match.params.id;
    displayedProduct.currency = 'USD';
    displayedProduct.imageSrc = '/images/products/' + medication.medication_image;

    this.setState({displayedProduct: displayedProduct, medications: medications});
  }

  setPricesState(prices) {
    let displayedProduct = cloneDeep(this.state.displayedProduct);
    displayedProduct.properties = {};
    displayedProduct.properties.quantities = [];
    prices.forEach((price) => {
      let qty = {};
      qty.additionalCost = {};
      qty.additionalCost.USD = price.price;
      qty.value = price.quantity_amount + ' ' + price.quantity_unit + 's';
      displayedProduct.properties.quantities.push(qty);
    });
    displayedProduct.propertiesToShowInCart = ['quantities'];

    this.setState({displayedProduct: displayedProduct, prices: prices});
  }

  isProductGeneric(generic) {
    if (generic === 1) {
      return 'Generic';
    }
    return 'Brand';
  }

  getCurrentProduct(props) {
    const currentProductId = props.match.params.id;
    if (!currentProductId) {
      return;
    }
    this.getMedication(currentProductId);
    this.getPrices(currentProductId);
  }

  getMedication(productId) {
    const apiResource = 'medications/' + productId;
    return Api
      .get(apiResource)
      .then(result =>{
        this.setMedicationState(result.data.response);
      })
      .catch(error => {console.log(error);});
  }

  getPrices(productId) {
    const apiResource = 'prices/' + productId;
    return Api
      .get(apiResource)
      .then(result =>{
        this.setPricesState(result.data.response);
      })
      .catch(error => {console.log(error);});
  }

  getProductForDisplay() {
    let medication = {};

    if (Array.isArray(this.state.medications) && this.state.medications.length > 0) {
      medication = this.state.medications[0];
    }

    return <div className="offset-top-30">
      <div className="product product-list product-list-wide unit unit-sm-horizontal unit-xs-top">
        <div className="unit-body text-left">
          <div className="unit unit-lg-horizontal unit-lg-top">
            <div className="unit-body">
              <h2 className="product-title offset-top-0">
                <a href={'/products/' + this.state.displayedProduct.id}>
                  {this.state.displayedProduct.name}
                </a>
              </h2>
              <h3>{this.isProductGeneric(medication.medication_isgeneric)}</h3>
              <p className="product-brand text-italic text-dark">{medication.generic_name}</p>
              <p></p>
              <div dangerouslySetInnerHTML={{ __html: medication.medication_long }} />
            </div>
            <div className="unit-right product-list-right">
              <a href={'/products/' + this.state.displayedProduct.id}><img
                className="img-responsive product-image-area" src={this.state.displayedProduct.imageSrc}
                alt="" /></a>
              <ProductComponent {...this.state.displayedProduct}
                                checkoutButton={this.props.checkoutButton}
                                onAddProduct={
                                  this.props.addProduct
                                }
                                generateProductKey={
                                  this.props.generateProductKey
                                }
                                getLocalization={this.state.getProductLocalization}
              />
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  render() {
    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-information-outline icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">Information</span></h2>
              </div>
              <div className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/products">Products</Link></li>
                  <li>{this.props.match.params.id}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <div className="row text-left offset-top-30 offset-md-top-20">
                {this.props.shoppingCart}
                {this.getProductForDisplay()}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default ProductDetails;
