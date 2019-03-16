import React, {PureComponent} from 'react';
import {Form, FormGroup, FormControl, Row, Col, ControlLabel, HelpBlock} from 'react-bootstrap';
import Api from "../api/api";
var cloneDeep = require('lodash.clonedeep');

class OrderForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shippingOptions: [],
      paymentOptions: [],
    }
    this.getShippingOptions();
    this.getPaymentOptions();
  }

  componentWillReceiveProps(props) {
  }

  componentWillUnmount() {
    this.addShoppingCartItemsToState(this.props);
  }

  addShoppingCartItemsToState(props) {
    if (props === undefined || props.shoppingCart === undefined || props.shoppingCart.props === undefined || props.shoppingCart.props.products === undefined) {
      return;
    }

    let orderItemsArray = [];

    Object.keys(props.shoppingCart.props.products).forEach((key) => {
      let shoppingCartItem = props.shoppingCart.props.products[key];
      let orderItem = {};
      orderItem.order_id = -1;
      orderItem.medication_id = shoppingCartItem.id;
      orderItem.medication_din = '';
      orderItem.item_name = shoppingCartItem.name;
      orderItem.item_total_quantity = shoppingCartItem.quantity * parseInt(shoppingCartItem.properties.quantities);
      orderItem.item_package_size = parseInt(shoppingCartItem.properties.quantities);
      orderItem.item_total_price = shoppingCartItem.quantity * shoppingCartItem.prices['USD'];
      orderItem.item_package_price = shoppingCartItem.prices['USD'];

      orderItemsArray.push(orderItem);
    });

    this.props.checkParent('order_items', orderItemsArray, 'order');
  }

  isValidated() {
    this.props.rules.checkRequiredFieldValues(false, {'rx_original_file': true});
    this.props.rules.resetRulesState(['rx_original_file']);
    this.forceUpdate();
    return !this.props.rules.unvalidated;
  }

  setShippingOptions(options) {
    if(Array.isArray(options) && options.length > 0) {
      this.setState({shippingOptions: options, shippingPrice: options[0].shipping_price});
    }
  }

  getShippingOptions() {
    const apiResource = 'shipping';
    return Api
      .get(apiResource)
      .then(result =>{
        this.setShippingOptions(result.data.response);
      })
      .catch(error => {console.log(error);});
  }

  getShippingSelectionOptions() {
    return this.state.shippingOptions.map((option, index) => {
      return <option key={index + 1} value={option.shipping_price}>
        {option.shipping_option + ': $' + option.shipping_price.toFixed(2)}
      </option>;
    });
  }

  setPaymentOptions(options) {
    if(Array.isArray(options) && options.length > 0) {
      this.setState({paymentOptions: options});
    }
  }

  getPaymentOptions() {
    const apiResource = 'payment';
    return Api
      .get(apiResource)
      .then(result =>{
        this.setPaymentOptions(result.data.response);
      })
      .catch(error => {console.log(error);});
  }

  getPaymentSelectionOptions() {
    return this.state.paymentOptions.map((option, index) => {
      return <option key={index + 1} value={option.payment_method}>
        {option.payment_method}
      </option>;
    });
  }

  getShoppingCartGrandTotal() {
    return this.props.checkoutButton.props.grandTotal;
  }

  getShoppingCart() {
    let shoppingCart = cloneDeep(this.props.shoppingCart);
    shoppingCart.props.hideHeader = true;
    shoppingCart.props.checkoutButton = null;
    return shoppingCart;
  }

  setParentStates(id, value) {
    this.props.checkParent(id, value, 'order');
  }

  switchChange = (id, value) => {
    let handledEvents = {
      [id]: () => this.setParentStates(id, value),
    };

    return handledEvents[id]();
  }

  onChange(id, e) {
    this.switchChange(id, e.target.value);
  }

  render() {
    return(<div className="order-form">
      <Form>
        <Row className="form-info">
          <h5><b>Step 2</b></h5>
        </Row>
        <Row className="form-info">
          <b>Ordered Items</b>
        </Row>
        <Row>
          {this.getShoppingCart()}
        </Row>
        <Row className="form-info">
          <b>Shipping Info</b>
        </Row>
        <Row>
          <Col sm={3} className="order-totals">
            <Row>
              <Col sm={8}>
                Order Items Total:
              </Col>
              <Col sm={4}>
                <b>${this.getShoppingCartGrandTotal().toFixed(2)}</b>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                Shipping Total:
              </Col>
              <Col sm={4}>
                <b>${parseInt(this.props.order.order_shipping_amount).toFixed(2)}</b>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                Grand Total:
              </Col>
              <Col sm={4}>
                <b>${(this.getShoppingCartGrandTotal() + parseInt(this.props.order.order_shipping_amount)).toFixed(2)}</b>
              </Col>
            </Row>
          </Col>
          <Col sm={3}>
          </Col>
          <Col sm={6}>
            <FormGroup controlId="formShippingOption" validationState={this.props.rules.getRulesState('order_shipping_amount')}>
              <ControlLabel>Select Shipping</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="Shipping"
                value={this.props.order.order_shipping_amount}
                onChange={e => {this.onChange('order_shipping_amount', e);}}
              >
                <option key={0} value={''}>
                  {'-- Select Shipping Option --'}
                </option>
                {this.getShippingSelectionOptions()}
              </FormControl>
              <FormControl.Feedback />
              <HelpBlock>{this.props.rules.getErrorMessage('order_shipping_amount')}</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
          </Col>
          <Col sm={6}>
            <FormGroup controlId="formPaymentMethod" validationState={this.props.rules.getRulesState('order_payment_type')}>
              <ControlLabel>Select Payment Option</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="Payment"
                value={this.props.order.order_payment_type}
                onChange={e => {this.onChange('order_payment_type', e);}}
              >
                <option key={0} value={''}>
                  {'-- Select Payment Option --'}
                </option>
                {this.getPaymentSelectionOptions()}
              </FormControl>
              <FormControl.Feedback />
              <HelpBlock>{this.props.rules.getErrorMessage('order_payment_type')}</HelpBlock>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>);
  }
}
export default OrderForm;
