import React, {PureComponent} from 'react';
import {Form, FormGroup, FormControl, Checkbox, Row, Col, ControlLabel, HelpBlock, Dropdown, Button, Label} from 'react-bootstrap';
import Api from "../api/api";
var cloneDeep = require('lodash.clonedeep');

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {error: ''};
  }

  isValidated() {
    return this.submitOrder();
  }

  submitOrder() {
    const data = cloneDeep(this.props.orderInfo);
    const apiResource = 'order';
    return Api
      .post(apiResource, data)
      .then(result =>{
        return true;
      })
      .catch(error => {
        console.log(error);
        this.setState({error: "Failed to submit the order due to Server Error.  Please try later."});
        return false;
      });
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

  getOrderItemsTotal() {
    let total = 0;
    this.props.orderInfo.order.order_items.forEach((item) => {
      total += item.item_total_price;
    });
    return total;
  }

  getOrderItems() {
    return this.props.orderInfo.order.order_items.map((item, index) => {
      return <Row key={index}>
        <Col sm={4} className="table-col-center">{item.item_name}</Col>
        <Col sm={2} className="table-col-center">{item.item_package_size}</Col>
        <Col sm={2} className="table-col-center">{item.item_package_price}</Col>
        <Col sm={2} className="table-col-center">{item.item_total_quantity}</Col>
        <Col sm={2} className="table-col-center">{item.item_total_price}</Col>
      </Row>;
    });
  }

  getAllergies() {
    return this.props.orderInfo.rx.allergies.map((allergy, index) => {
      return <Row>
        {allergy.allergy_name}
      </Row>;
    });
  }

  getMedications() {
    return this.props.orderInfo.rx.medications.map((medication, index) => {
      return <Row>
        {medication.medication_name}
      </Row>;
    });
  }

  render() {
    return(<div className="order-form">
      <Form>
        <Row className="form-info">
          <h5><b>Step 4</b></h5>
        </Row>
        <Row className="form-info">
          <b>Review Your Information</b><br />
          Please review your information before submitting your order.  Press the 'Back' button to make any changes.
          <p className="grey-error">{this.state.error}</p>
          <hr className="form-divider"/>
        </Row>
        <Row className="form-info">
          <b>Patient Information</b>
        </Row>
        <Row>
          <Col sm={3}>
            <Label className="review">First Name</Label><br />
            <b>{this.props.orderInfo.patient.patient_firstname}</b>
          </Col>
          <Col sm={2}>
            <Label className="review">Middle Name</Label><br />
            <b>{this.props.orderInfo.patient.patient_middlename}</b>
          </Col>
          <Col sm={4}>
            <Label className="review">Last Name</Label><br />
            <b>{this.props.orderInfo.patient.patient_lastname}</b>
          </Col>
          <Col sm={3}>
            <Label className="review">Date of Birth</Label><br />
            <b>{this.props.orderInfo.patient.patient_dob.format('YYYY-MM-DD')}</b>
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <Label className="review">Street Address</Label><br />
            <b>{this.props.orderInfo.patient.patient_street}</b>
          </Col>
          <Col sm={2}>
            <Label className="review">Suite / Apartment</Label><br />
            <b>{this.props.orderInfo.patient.patient_street2}</b>
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Label className="review">City</Label><br />
            <b>{this.props.orderInfo.patient.patient_city}</b>
          </Col>
          <Col sm={3}>
            <Label className="review">State</Label><br />
            <b>{this.props.orderInfo.patient.patient_state}</b>
          </Col>
          <Col sm={4}>
            <Label className="review">Zip Code</Label><br />
            <b>{this.props.orderInfo.patient.patient_zip}</b>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Label className="review">Cell Phone</Label><br />
            <b>{this.props.orderInfo.patient.patient_cell}</b>
          </Col>
          <Col sm={3}>
            <Label className="review">Home Phone</Label><br />
            <b>{this.props.orderInfo.patient.patient_phone}</b>
          </Col>
          <Col sm={6}>
            <Label className="review">Email</Label><br />
            <b>{this.props.orderInfo.patient.patient_email}</b>
          </Col>
        </Row>
        <Row>
          <hr className="form-divider"/>
        </Row>
        <Row className="form-info">
          <b>Order Information</b>
        </Row>
        <Row>
          <Col sm={4} className="table-col-center"><Label className="review">Medication</Label></Col>
          <Col sm={2} className="table-col-center"><Label className="review">Package Qty.</Label></Col>
          <Col sm={2} className="table-col-center"><Label className="review">Price</Label></Col>
          <Col sm={2} className="table-col-center"><Label className="review">Ordered Qty.</Label></Col>
          <Col sm={2} className="table-col-center"><Label className="review">Tot. Price</Label></Col>
        </Row>
        {this.getOrderItems()}
        <Row>
          <Col className="table-col-right">
            <Label className="review">Total Item Price:</Label> <b>${this.getOrderItemsTotal().toFixed(2)}</b>
          </Col>
        </Row>
        <Row>
          <Col className="table-col-right">
            <Label className="review">Shipping:</Label> <b>${parseInt(this.props.orderInfo.order.order_shipping_amount).toFixed(2)}</b>
          </Col>
        </Row>
        <Row>
          <Col className="table-col-right">
            <Label className="review">Grand Total:</Label> <b>${(this.getOrderItemsTotal() + parseInt(this.props.orderInfo.order.order_shipping_amount)).toFixed(2)}</b>
          </Col>
        </Row>
        <Row>
          <hr className="form-divider"/>
        </Row>
        <Row className="form-info">
          <b>Medical Information</b>
        </Row>
        <Row>
          <Label className="review">Prescription</Label>
        </Row>
        <Row>
          <a href={'http://35.230.0.73:8888/api/v1/rx/file/' + this.props.orderInfo.rx.rx_original_file} target="_blank">View Uploaded Prescription</a>
        </Row>
        <Row>
          <Label className="review">Allergies</Label>
        </Row>
        {this.getAllergies()}
        <Row>
          <Label className="review">Medications Taken</Label>
        </Row>
        {this.getMedications()}
        <Row>
          <hr className="form-divider"/>
        </Row>
        <Row className="form-info">
          <b>Patient Notes and Questions</b>
        </Row>
        <Row>
          <FormGroup controlId="formControlsTextarea">
            <FormControl className="form-control" componentClass="textarea" placeholder="Please type in any notes or questions here"
                         value={this.props.orderInfo.order.order_patient_notes} onChange={e=>{this.onChange('order_patient_notes', e);}}/>
          </FormGroup>
        </Row>
      </Form>
    </div>);

  }
}
export default ReviewForm;
