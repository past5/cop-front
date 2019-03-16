import React, {PureComponent} from 'react';
//import {Panel, Row, Col} from 'react-bootstrap';
import Api from '../api/api';
import {Link} from 'react-router-dom'
import {
  cartLocalization,
  ProductComponent
  //,  CheckoutButtonComponent,
} from 'react-shopping-cart';

const { getDefaultLocalization } = cartLocalization;
const medicationLocalization = {
  quantities: 'Package',
  USD: '$',
};

class Products extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      EdProducts: [],
      getProductLocalization:
        getDefaultLocalization(
          'product',
          'en',
          medicationLocalization,
        ),
    };

    if (props.searchProduct) {
      this.postEdProductsSearch(props);
      return;
    }

    this.getEdProducts();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.searchProduct) {
      this.postEdProductsSearch(nextProps);
      return;
    }
    this.getEdProducts();
  }

  setProductState(products) {
    this.setState({EdProducts: products});
  }

  isProductGeneric(generic) {
    if (generic === 1) {
      return 'Generic';
    }
    return 'Brand';
  }

  getAlphabet() {
    return <h4>
      <div align="center">
        <Link onClick={()=>{this.props.search('A')}} to='/products'>A</Link>
        <Link onClick={()=>{this.props.search('B')}} to='/products'>B</Link>
        <Link onClick={()=>{this.props.search('C')}} to='/products'>C</Link>
        <Link onClick={()=>{this.props.search('D')}} to='/products'>D</Link>
        <Link onClick={()=>{this.props.search('E')}} to='/products'>E</Link>
        <Link onClick={()=>{this.props.search('F')}} to='/products'>F</Link>
        <Link onClick={()=>{this.props.search('G')}} to='/products'>G</Link>
        <Link onClick={()=>{this.props.search('H')}} to='/products'>H</Link>
        <Link onClick={()=>{this.props.search('I')}} to='/products'>I</Link>
        <Link onClick={()=>{this.props.search('J')}} to='/products'>J</Link>
        <Link onClick={()=>{this.props.search('K')}} to='/products'>K</Link>
        <Link onClick={()=>{this.props.search('L')}} to='/products'>L</Link>
        <Link onClick={()=>{this.props.search('M')}} to='/products'>M</Link>
        <Link onClick={()=>{this.props.search('N')}} to='/products'>N</Link>
        <Link onClick={()=>{this.props.search('O')}} to='/products'>O</Link>
        <Link onClick={()=>{this.props.search('P')}} to='/products'>P</Link>
        <Link onClick={()=>{this.props.search('Q')}} to='/products'>Q</Link>
        <Link onClick={()=>{this.props.search('R')}} to='/products'>R</Link>
        <Link onClick={()=>{this.props.search('S')}} to='/products'>S</Link>
        <Link onClick={()=>{this.props.search('T')}} to='/products'>T</Link>
        <Link onClick={()=>{this.props.search('U')}} to='/products'>U</Link>
        <Link onClick={()=>{this.props.search('V')}} to='/products'>V</Link>
        <Link onClick={()=>{this.props.search('W')}} to='/products'>W</Link>
        <Link onClick={()=>{this.props.search('X')}} to='/products'>X</Link>
        <Link onClick={()=>{this.props.search('Y')}} to='/products'>Y</Link>
        <Link onClick={()=>{this.props.search('Z')}} to='/products'>Z</Link>
      </div>
    </h4>;
  }

  getProductsForDisplay() {
    if (!this.state.EdProducts || this.state.EdProducts.length < 1) {
      return undefined;
    }

    return this.state.EdProducts.map((product, index) => {
      let displayedProduct = {};
      displayedProduct.scrollPosition = 0;
      displayedProduct.name = product.medication_name + ' ' + product.medication_strength + ' ' + product.medication_strengthunits + ' ' + this.isProductGeneric(product.medication_isgeneric);
      displayedProduct.id = product.medication_id.toString();
      displayedProduct.path = '/products/' + product.medication_id;
      displayedProduct.properties = {};
      displayedProduct.properties.quantities = [];
      let qty = {};
      qty.additionalCost = {};
      qty.additionalCost.USD = product.price;
      qty.value = product.quantity_amount + ' ' + product.quantity_unit + 's';
      displayedProduct.properties.quantities.push(qty);
      displayedProduct.propertiesToShowInCart = ['quantities'];
      displayedProduct.prices = { USD: 0 };
      displayedProduct.currency = 'USD';
      displayedProduct.imageSrc = '/images/products/' + product.medication_image;

      return <div className="offset-top-30">
      <div className="product product-list product-list-wide unit unit-sm-horizontal unit-xs-top">
          <div className="unit-body text-left">
            <div className="unit unit-lg-horizontal unit-lg-top">
              <div className="unit-body">
                <h2 className="product-title offset-top-0">
                  <a href={'/products/' + displayedProduct.id}>
                    {displayedProduct.name}
                  </a>
                </h2>
                <h3>{this.isProductGeneric(product.medication_isgeneric)}</h3>
                <p className="product-brand text-italic text-dark">{product.generic_name}</p>
                <p className="product-desc">{product.medication_short}</p><a
                className="text-bold text-picton-blue veil reveal-lg-inline-block"
                href={'/products/' + displayedProduct.id}>Learn More</a>
              </div>
              <div className="unit-right product-list-right">
                <a href={'/products/' + displayedProduct.id}><img
                  className="img-responsive product-image-area" src={displayedProduct.imageSrc}
                  alt="" /></a>
                <ProductComponent {...displayedProduct}
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
    });
  }

  getEdProducts() {
    const apiResource = 'pricelist';
    return Api
      .get(apiResource)
      .then(result =>{
        this.setProductState(result.data.response);
      })
      .catch(error => {console.log(error);});
  }

  postEdProductsSearch(props) {
    const apiResource = 'pricelist/search';
    const searchString = {searchString: props.searchProduct};

    return Api
      .post(apiResource, searchString)
      .then(result =>{
        this.setProductState(result.data.response);
      })
      .catch(error => {console.log(error);});
  }
  render() {
    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-pill icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">Medications</span></h2>
              </div>
              <div className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li>Products
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <span className="big">{this.props.searchProduct !== '' ? 'Searching for: ' + this.props.searchProduct : ' All Medications'}</span>
              <hr className="divider bg-mantis"/>
              <div className="row text-left offset-top-30 offset-md-top-20">
                {this.getProductsForDisplay()}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Products;
