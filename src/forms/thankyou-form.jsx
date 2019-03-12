import React, {PureComponent} from 'react';
import {Row} from 'react-bootstrap';

class ThankyouForm extends PureComponent {
  constructor(props) {
    super(props);
    props.resetParentState();
  }
  render() {
    return(<div className="order-form">
        <Row className="form-info">
          <h5><b>Thank you for your business!</b></h5>
        </Row>
        <Row className="form-info">
          <b>Your order has been submitted to our pharmacy.  Our customer service agent will contact you soon.</b>
          <hr className="form-divider"/>
        </Row>
    </div>);
  }
}
export default ThankyouForm;
