import React, {PureComponent} from 'react';
import {Panel, Row, Col, FormControl, FormGroup, Button, ControlLabel, Alert} from 'react-bootstrap';
import Api from '../api/api';
import InputRules from './../rules/rules'
import {Link} from 'react-router-dom'
import StepZilla from 'react-stepzilla';
import PatientForm from './../forms/patient-form';
import OrderForm from './../forms/order-form';
import PrescriptionForm from './../forms/prescription-form';
import ReviewForm from './../forms/review-form';
import ThankyouForm from './../forms/thankyou-form';

let cloneDeep = require('lodash.clonedeep');

const rulesLocalization = {
  patient_firstname: 'Your First Name',
  patient_lastname: 'Your Last Name',
  patient_middlename: 'Your Middle Name',
  patient_street: 'Your Street Address',
  patient_street2: 'Your Suite Number',
  patient_city: 'Your City',
  patient_state: 'Your State',
  patient_zip: 'Your Zip',
  patient_cell: 'Your Cell Phone',
  patient_phone: 'Your Home Phone',
  patient_email: 'Your Email',
  patient_dob: 'Your Date of Birth',
  patient_gender: 'Your Gender',
  order_shipping_amount: 'Shipping amount',
  order_payment_type: 'Payment Type',
  rx_original_file: 'Prescription File',
};

class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.rules = new InputRules(rulesLocalization);
    this.rules.convertInts();

    this.state = this.getStateObject();

    this.defineRulesets();
    this.setData();
  }

  getStateObject(data) {
    if (data) {
      return {
        agreementAccepted: false,
        declineText: '',
        orderInfo: {
          patient: {
            id: data.id,
            patient_firstname: data.patient_firstname,
            patient_lastname: data.patient_lastname,
            patient_middlename: data.patient_middlename,
            patient_gender: data.patient_gender,
            patient_street: data.patient_street,
            patient_street2: data.patient_street2,
            patient_city: data.patient_city,
            patient_state: data.patient_state,
            patient_zip: data.patient_zip,
            patient_cell: data.patient_cell,
            patient_phone: data.patient_phone,
            patient_email: data.patient_email,
            patient_dob: data.patient_dob,
          },
          order: {
            patient_id: data.id,
            order_status: data.order_status,
            order_shipping_amount: data.order_shipping_amount,
            order_payment_type: data.order_payment_type,
            order_items: data.order_items,
          },
          rx: {
            rx_original_file: data.rx_original_file,
            allergies: data.allergies,
            medications: data.medications,
          }
        },
      };
    }

    return {
      agreementAccepted: false,
      declineText: '',
      orderInfo: {
        patient: {
          id: -1,
          patient_firstname: '',
          patient_lastname: '',
          patient_middlename: '',
          patient_gender: '',
          patient_street: '',
          patient_street2: '',
          patient_city: '',
          patient_state: '',
          patient_zip: '',
          patient_cell: '',
          patient_phone: '',
          patient_email: '',
          patient_dob: undefined,
        },
        order: {
          patient_id: -1,
          order_status: 'new',
          order_shipping_amount: 0,
          order_payment_type: '',
          order_items: [],
          order_patient_notes: '',
        },
        rx: {
          rx_original_file: '',
          allergies: [],
          medications: [],
        }
      },
    };
  }

  defineRulesets() {
    this.rules.addRuleset('patient_firstname', 'AlphaNumeric');
    this.rules.addRuleset('patient_lastname', 'AlphaNumeric');
    this.rules.addRuleset('patient_gender', 'AlphaNumeric');
    this.rules.addRuleset('patient_street', 'Text');
    this.rules.addRuleset('patient_city', 'AlphaNumeric');
    this.rules.addRuleset('patient_state', 'AlphaNumeric');
    this.rules.addRuleset('patient_zip', 'AlphaNumeric');
    this.rules.addRuleset('patient_cell', 'Regex').addOptions('patient_cell', {regex: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$'});
    this.rules.addRuleset('patient_phone', 'Regex').addOptions('patient_phone', {regex: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$'});
    this.rules.addRuleset('patient_email', 'Regex').addOptions('patient_email', {regex: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'});
    this.rules.addRuleset('patient_dob', 'Text');

    this.rules.addRuleset('order_shipping_amount', 'Numeric').addOptions('order_shipping_amount', {min: 1, message: 'Please select one of the order methods'});
    this.rules.addRuleset('order_payment_type', 'Text');

    this.rules.addRuleset('rx_original_file', 'Text').addOptions('rx_original_file', {message: 'Please upload your prescription by selecting a file from your hard drive'});
  }

  setData(data) {
    if (data) {
      this.rules.setRequiredInputs({patient_firstname: data.patient_firstname, patient_lastname: data.patient_lastname, patient_gender: data.patient_gender, patient_street: data.patient_street, patient_city: data.patient_city,
        patient_state: data.patient_state, patient_zip: data.patient_zip, patient_cell: data.patient_cell, patient_dob: data.patient_dob,
        order_shipping_amount: data.order_shipping_amount, order_payment_type: data.order_payment_type, rx_original_file: data.rx_original_file});
      this.rules.setOptionalFields({patient_email: data.patient_email, patient_phone: data.patient_phone});
      return;
    }
    this.rules.setRequiredInputs({patient_firstname: '', patient_lastname: '', patient_gender: '', patient_street: '', patient_city: '',
      patient_state: '', patient_zip: '', patient_cell: '', patient_email: '', patient_dob: '',
      order_shipping_amount: 0, order_payment_type: '', rx_original_file: ''});
  }

  checkParent = (id, value, parent) => {
    let orderInfo = cloneDeep(this.state.orderInfo);
    orderInfo[parent][id] = value;
    let rulesValue = value.toString();
    this.rules.updateRulesStates(id, rulesValue);
    this.setState({orderInfo: orderInfo});
  }

  resetParentState = () => {
    sessionStorage.clear();
    this.props.resetProducts();
    this.setState(this.getStateObject());
  }

  handleAccept = (accepted) => {
    this.setState({agreementAccepted: true, declineText: ''});
  }

  handleDecline = (accepted) => {
    this.setState({agreementAccepted: false, declineText: 'You must accept customer agreement to proceed with your order'});
  }

  stepsContructor = () => { return [
      {name: 'Patient', component: <PatientForm patient={this.state.orderInfo.patient} checkParent={this.checkParent} rules={this.rules}/>},
      {name: 'Order', component: <OrderForm order={this.state.orderInfo.order} checkParent={this.checkParent} rules={this.rules}
                                            checkoutButton={this.props.checkoutButton} shoppingCart={this.props.shoppingCart}/>},
      {name: 'Rx', component: <PrescriptionForm rx={this.state.orderInfo.rx} checkParent={this.checkParent} rules={this.rules}/>},
      {name: 'Review', component: <ReviewForm orderInfo={this.state.orderInfo} checkParent={this.checkParent} rules={this.rules}/>},
      {name: 'Thanks', component: <ThankyouForm resetParentState={this.resetParentState} />},
    ];
  }

  render() {
    const alertDecline = this.state.declineText !== ''? <Alert bsStyle="danger">
      {this.state.declineText}
    </Alert>: undefined;
    const divProgress = this.state.agreementAccepted ? <div className='step-progress'>
      <StepZilla steps={this.stepsContructor()} prevBtnOnLastStep={false}/>
    </div> : <div className='container'>
      <FormGroup controlId="formControlsTextarea">
        <h1 align="center">Customer Agreement</h1>
        <hr className="divider bg-mantis" />
        <FormControl.Static>
          <p>Each time you place an order with us, you acknowledge and agree to the following:</p>

          <p>I acknowledge and agree as follows:</p>

          <ol>
            <li>Regarding orders for a prescription drug I hereby authorize and appoint DoctorSolve as my agent and attorney for the limited purpose of taking all steps and signing all documents
            on my behalf necessary to obtain a prescription in Canada or elsewhere that is the equivalent of the prescription that I will send to DoctorSolve, to the same extent as I could
            do personally if I were present taking those steps and signing those documents myself. This authorization includes but is not limited to: collecting personal health information
            about me; collecting similar information from my prescribing physician (“my Personal Physician”) or pharmacist, disclosing that information to DoctorSolve and its authorized agents
            and having a Canadian physician or international physician (“Reviewing Physician”) where required perform an independent medical review of my medical information prior to issuing
              a prescriptions.</li>
            <li>There are no additional fees charged to me in connection with a Reviewing Physician reviewing my medical information.</li>
            <li>By reviewing my medical information, the Reviewing Physician is not rendering or providing any service or advice to me whatsoever. I understand that it is my responsibility
              to have my Personal Physician conduct regular physician examinations of me, including any and all suggested testing by my Personal Physician to ensure that I have no medical
              problems which would constitute a contraindication to me taking medications prescribed by my Personal Physician. I agree that should I suffer any adverse affects while taking
              any prescription medication that I will immediately contact my Personal Physician and that in the event I come under the care of another physician, I will inform him or her of
              any and all medications that I have been prescribed. I acknowledge and agree that DoctorSolve recommends regular physician examinations with my Personal Physician whose care I am
              under and who initially prescribed the medications.</li>
            <li>I understand and agree that treatment, if any, received by using any product purchased through DoctorSolve, shall be deemed to be received by me in the jurisdiction from which
              the product was shipped.</li>
            <li>I further understand that DoctorSolve will only verify and provide medications that my Personal Physician has already prescribed to me. No new prescription medications
              will be provided by DoctorSolve. I understand that no controlled medications, narcotics or tranquilizers will be provided. DoctorSolve also reserves the right to refuse to arrange
              for the supplying of medications it determines, in its absolute discretion, are inappropriate.</li>
            <li>I hereby waive any requirements of Reviewing Physician to conduct a physical examination.</li>
            <li>I understand and agree that the review of my medical information by Reviewing Physician is in no way intended as a means to diagnose any medical condition and does not
              substitute the requirement for me to obtain my own professional medical advice from my Personal Physician. I agree to direct all questions to my Personal Physician. I will
              consult my Personal Physician before taking any new drug or changing my daily health regimen. I understand that any opinions, advice, statements, services, offers or other
              information expressed or made available by third parties (including merchants and licensors) are those of the respective authors or distributors or such content.</li>
          <li>I hereby confirm that I am 18 years of age or older and I am fully competent to make my own health care decisions. I am aware of the potential side effects and/or problems
            associated with prescription medications and understand that it would be a violation of law to falsify any information on my medical questionnaire or other medical records for
            the purposes of obtaining prescription medication. I agree to truthfully, and to the best of my knowledge, answer all of the questions on my medical questionnaire. I agree that
            if I fail in any way to fully furnish my complete and accurate medical history or I become aware of any changes to my physical or medical condition in the future and I fail to
            notify DoctorSolve of such failure, I am solely responsible for any adverse effects that I may suffer from taking or continuing to take such prescribed medications.</li>
            <li>I certify that I have had an appointment (and/or) examination with my Personal Physician within the last 12 months from the date hereof.</li>
          <li>I authorize and appoint DoctorSolve as my agent and attorney for the purpose of taking all steps and signing all documents on my behalf necessary to package the products I
            will order in order to have them delivered to me, to the same extent as I could do if I were personally present taking those steps and signing myself.</li>
          <li>I authorize and appoint DoctorSolve as my agent and my attorney for the purpose of taking all steps and signing all documents on my behalf necessary for shipping the products
            I will order as if I had shipped them to my own address.</li>
            <li>I initiated contact with DoctorSolve and understand that DoctorSolve is not located in the United States.</li>
          <li>The contract for sale for any product I purchase from DoctorSolve occurs in and is completed in the jurisdiction from which each product I purchase is shipped from. Title
            to any product ordered by me passes from DoctorSolve to me at the time the product leaves DoctorSolve’s affiliated pharmacy or fulfillment center. I understand and agree that
            DoctorSolve may have my order shipped from a pharmacy or international licensed or certified fulfillment center located in Canada, USA, Turkey, Mauritius, United Kingdom, Singapore,
            New Zealand, European Union and other countries it may select from time to time. I understand and agree that the products supplied from these pharmacies and international licensed or
            certified fulfillment centers may be sourced from and manufactured in countries other than those listed above, including but not limited to India and Israel.</li>
            <li>These Terms will be governed by and construed in accordance with the laws of the jurisdiction from which products are shipped to me (unless DoctorSolve elects otherwise in its
              sole discretion), without giving effect to any principles of conflicts of laws. All disputes, controversies or claims arising out of or in connection with my dealings with
              DoctorSolve shall be submitted to and subject to the jurisdiction of the courts in the jurisdiction from which products are shipped to me (unless DoctorSolve elects otherwise
              in its sole discretion). The parties submit and attorn to the exclusive jurisdiction of said courts to finally adjudicate or determine any suit, action or proceeding arising out
              of or in connection with my dealings with DoctorSolve.</li>
            <li>I AGREE THAT THE REVIEWING PHYSICIAN SHALL NOT BE LIABLE FOR ANY LIABILITY, CLAIM, LOSS, DAMAGE OR EXPENSE OF ANY KIND OR NATURE CAUSED DIRECTLY OR INDIRECTLY BY ANY INADEQUACY,
              DEFICIENCY OR UNSUITABILITY OF THE PRESCRIPTION ISSUED BY THE REVIEWING PHYSICIAN OR INADEQUACY, DEFICIENCY OR UNSUITABILITY OF THE REVIEWING PHYSICIAN’S REVIEW OF MY MEDICAL
              INFORMATION. IN NO EVENT WILL THE REVIEWING PHYSICIAN BE LIABLE OR RESPONSIBLE FOR ANY DAMAGES WHATSOEVER, INCLUDING, DIRECT, INDIRECT, PUNITIVE, SPECIAL OR CONSEQUENTIAL DAMAGES,
              EVEN IF ADVISED OF THE POSSIBILITY THEREOF.</li>
          </ol>
            <p><b>I HAVE READ AND UNDERSTAND THE ABOVE REFERENCED CUSTOMER AGREEMENT AND AGREE TO EACH OF THE FOREGOING TERMS.</b></p>
        </FormControl.Static>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={1}>
            <Button onClick={this.handleAccept}>Accept</Button>
          </Col>
          <Col sm={1}>
            <Button onClick={this.handleDecline}>Decline</Button>
          </Col>
        </Row>
      </FormGroup>
      {alertDecline}
    </div>;

    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-package-variant icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">Checkout</span></h2>
              </div>
              <div className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li>Checkout</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <div className="row text-left offset-top-20 offset-md-top-10">
                {divProgress}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Checkout;
