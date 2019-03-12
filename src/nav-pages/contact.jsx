import React, {PureComponent} from 'react';
import {Form, FormGroup, FormControl, Checkbox, Row, Col, ControlLabel, HelpBlock, Dropdown, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import InputRules from './../rules/rules';
import Api from "../api/api";
var cloneDeep = require('lodash.clonedeep');

const rulesLocalization = {
  inquiry_firstname: 'Your First Name',
  inquiry_lastname: 'Your Last Name',
  inquiry_phone: 'Your Phone',
  inquiry_email: 'Your Email',
  inquiry_message: 'Message',
};


class Contact extends PureComponent {
  constructor(props) {
    super(props);
    this.rules = new InputRules(rulesLocalization);
    this.rules.convertInts();

    this.state = this.getStateObject();

    this.defineRulesets();
    this.setData();
  }

  defineRulesets() {
    this.rules.addRuleset('inquiry_firstname', 'AlphaNumeric');
    this.rules.addRuleset('inquiry_lastname', 'AlphaNumeric');
    this.rules.addRuleset('inquiry_phone', 'Regex').addOptions('inquiry_phone', {regex: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$'});
    this.rules.addRuleset('inquiry_email', 'Regex').addOptions('inquiry_email', {regex: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'});
    this.rules.addRuleset('inquiry_message', 'Text');
  }

  setData(data) {
    if (data) {
      this.rules.setRequiredInputs({inquiry_firstname: data.inquiry_firstname, inquiry_lastname: data.inquiry_lastname, inquiry_phone: data.inquiry_phone, inquiry_email: data.inquiry_email,
        inquiry_message: data.inquiry_message});
      return;
    }
    this.rules.setRequiredInputs({inquiry_firstname: '', inquiry_lastname: '', inquiry_phone: '', inquiry_email: '',
      inquiry_message: ''});
  }

  getStateObject() {
    return {
      error: '',
      success: '',
      inquiry: {
        inquiry_firstname: '',
        inquiry_lastname: '',
        inquiry_phone: '',
        inquiry_email: '',
        inquiry_message: '',
      }
    }
  }

  setParentStates(id, value) {
    let inquiry = cloneDeep(this.state.inquiry);
    inquiry[id] = value;
    let rulesValue = value.toString();
    this.rules.updateRulesStates(id, rulesValue);
    this.setState({inquiry: inquiry});
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

  submitInquiry(inquiry) {
    const data = cloneDeep(inquiry);
    const apiResource = 'inquiry';
    return Api
      .post(apiResource, {inquiry: data})
      .then(result =>{
        this.setState({success: "Your message is sent.  We will get back to you soon."});
        return true;
      })
      .catch(error => {
        console.log(error);
        this.setState({error: "Failed to submit your inquiry due to Server Error.  Please try later."});
        return false;
      });
  }

  handleOkClick(e) {
    this.rules.checkRequiredFieldValues(false);
    this.rules.requiredDisabled ?  e.stopPropagation(): this.submitInquiry(this.state.inquiry);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-phone icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">Contact</span></h2>
              </div>
              <div className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li>Contact
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <h2><span className="big"> Contact</span></h2>
              <hr className="divider bg-mantis" />
              <div className="row text-left offset-top-30 offset-md-top-20">

                  <p>There are a variety of ways to get in touch if you have any questions or would like to place an order.
                    Feel free to leave your information below and a staff member will get in touch. Alternatively, give us a call on our toll-free number 1-866-363-1899, email us at canadaoutreachpharmacy.com or
                    come visit us at</p>
                  <div className="order-form">
                    <Row>
                      <Col sm={12}>
                        <p className="grey-error">{this.state.error}</p>
                        <p>{this.state.success}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <FormGroup controlId="formInquiryFirstName" rulesState={this.rules.getRulesState('inquiry_firstname')}>
                          <ControlLabel>First Name</ControlLabel>
                          <FormControl type="text" placeholder="First Name" value={this.state.inquiry.inquiry_firstname} onChange={e=>{this.onChange('inquiry_firstname', e);}}/>
                          <FormControl.Feedback />
                          <HelpBlock>{this.rules.getErrorMessage('inquiry_firstname')}</HelpBlock>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup controlId="formInquiryLastName" rulesState={this.rules.getRulesState('inquiry_lastname')}>
                          <ControlLabel>Last Name</ControlLabel>
                          <FormControl type="text" placeholder="Last Name" value={this.state.inquiry.inquiry_lastname} onChange={e=>{this.onChange('inquiry_lastname', e);}}/>
                          <FormControl.Feedback />
                          <HelpBlock>{this.rules.getErrorMessage('inquiry_lastname')}</HelpBlock>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <FormGroup controlId="formInquiryPhone" rulesState={this.rules.getRulesState('inquiry_phone')}>
                          <ControlLabel>Phone</ControlLabel>
                          <FormControl type="tel" placeholder="Phone" value={this.state.inquiry.inquiry_phone} onChange={e=>{this.onChange('inquiry_phone', e);}}/>
                          <FormControl.Feedback />
                          <HelpBlock>{this.rules.getErrorMessage('inquiry_phone')}</HelpBlock>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup controlId="formEmail" rulesState={this.rules.getRulesState('inquiry_email')}>
                          <ControlLabel>Email</ControlLabel>
                          <FormControl type="email" placeholder="Email" value={this.state.inquiry.inquiry_email} onChange={e=>{this.onChange('inquiry_email', e);}}/>
                          <FormControl.Feedback />
                          <HelpBlock>{this.rules.getErrorMessage('inquiry_email')}</HelpBlock>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <FormGroup controlId="formInquiryMessage" rulesState={this.rules.getRulesState('inquiry_message')}>
                          <ControlLabel>Message</ControlLabel>
                          <FormControl componentClass="textarea" placeholder="Type Your Message Here" value={this.state.inquiry.inquiry_message} onChange={e=>{this.onChange('inquiry_message', e);}}/>
                          <FormControl.Feedback />
                          <HelpBlock>{this.rules.getErrorMessage('inquiry_message')}</HelpBlock>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Button className="btn btn-add" onClick={e=>{this.handleOkClick(e);}} disabled={this.rules.unvalidated || (this.state.success!=='')}>Send Inquiry</Button>
                      </Col>
                    </Row>
                  </div>
                </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Contact;
