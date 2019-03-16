import React, {PureComponent} from 'react';
import {Form, FormGroup, FormControl, Row, Col, ControlLabel, HelpBlock, Button} from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker_r16';
import moment from 'moment';

const states = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'American Samoa': 'AS',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District Of Columbia': 'DC',
  'Federated States Of Micronesia': 'FM',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Guam': 'GU',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Marshall Islands': 'MH',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Palau': 'PW',
  'Pennsylvania': 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virgin Islands': 'VI',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
};

class PatientForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  isValidated() {
    this.props.rules.checkRequiredFieldValues(false, {'order_shipping_amount': true, 'order_payment_type': true, 'rx_original_file': true});
    this.props.rules.resetRulesState(['order_shipping_amount', 'order_payment_type', 'rx_original_file']);
    this.forceUpdate();
    return !this.props.rules.unvalidated;
  }

  handleApply(event, picker) {
    this.setParentStates('patient_dob', picker.startDate);
  }

  handleCancel() {
    this.setParentStates('patient_dob', undefined);
  }

  getStateCode(name) {
    return states[name];
  }

  getStateOptions() {
    return Object.keys(states).map((state, index) => {
      return <option key={index + 1} value={this.getStateCode(state)}>
        {state}
      </option>;
    });
  }

  setParentStates(id, value) {
    this.props.checkParent(id, value, 'patient');
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
    let dob_date = this.props.patient.patient_dob;
    let start = (dob_date && dob_date.format('YYYY-MM-DD')) || '';
    let label = start;

    let locale = {
      format: 'YYYY-MM-DD',
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
    };

   // let buttonStyle = { width: '100%' };

    let pickerProps = {
      dob_date,
    };

    return(<div className="order-form">
        <Form>
          <Row className="form-info">
            <h5><b>Step 1</b></h5>
          </Row>
          <Row className="form-info">
            <b>Personal Information</b>
          </Row>
          <Row>
            <Col sm={2}>
              <FormGroup controlId="formPatientFirstName" validationState={this.props.rules.getRulesState('patient_firstname')}>
                <ControlLabel>First Name</ControlLabel>
                <FormControl type="text" placeholder="First Name" value={this.props.patient.patient_firstname} onChange={e=>{this.onChange('patient_firstname', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_firstname')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup controlId="formPatientMiddleName" validationState={this.props.rules.getRulesState('patient_middlename')}>
                <ControlLabel>Middle Name</ControlLabel>
                <FormControl type="text" placeholder="Middle Name" value={this.props.patient.patient_middlename} onChange={e=>{this.onChange('patient_middlename', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_middlename')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formPatientLastName" validationState={this.props.rules.getRulesState('patient_lastname')}>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl type="text" placeholder="Last Name" value={this.props.patient.patient_lastname} onChange={e=>{this.onChange('patient_lastname', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_lastname')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup controlId="formPatientGender" validationState={this.props.rules.getRulesState('patient_gender')}>
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="State"
                  value={this.props.patient.patient_gender}
                  onChange={e => {this.onChange('patient_gender', e);}}
                >
                  <option key={0} value={''}>
                    {'-- Gender --'}
                  </option>
                  <option key={1} value={'Other'}>
                    {'Other'}
                  </option>
                  <option key={2} value={'Male'}>
                    {'Male'}
                  </option>
                  <option key={3} value={'Female'}>
                    {'Female'}
                  </option>
                </FormControl>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_gender')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formPatientDob" validationState={this.props.rules.getRulesState('patient_dob')}>
                <ControlLabel>Date of Birth</ControlLabel>
                <DatetimeRangePicker
                  singleDatePicker
                  showDropdowns
                  autoUpdateInput={false}
                  locale={locale}
                  onApply={this.handleApply}
                  onCancel={this.handleCancel}
                  {...pickerProps}
                >
                  <div className="input-group">
                    <span className="input-group-btn">
                      <Button className="default date-range-toggle">
                        <i className="fa fa-calendar"/>
                      </Button>
                    </span>
                    <input type="text" className="form-control" value={label} />
                  </div>
                </DatetimeRangePicker>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_dob')}</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row className="form-info">
            <b>Address Information</b>
          </Row>
          <Row>
            <Col sm={10}>
              <FormGroup controlId="formPatientStreet1" validationState={this.props.rules.getRulesState('patient_street')}>
                <ControlLabel>Street Address</ControlLabel>
                <FormControl type="text" placeholder="Address" value={this.props.patient.patient_street} onChange={e=>{this.onChange('patient_street', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_street')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup controlId="formPatientStreet2" validationState={this.props.rules.getRulesState('patient_street2')}>
                <ControlLabel>Suite / Apartment</ControlLabel>
                <FormControl type="text" placeholder="Suite #" value={this.props.patient.patient_street2} onChange={e=>{this.onChange('patient_street2', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_street2')}</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <FormGroup controlId="formPatientCity" validationState={this.props.rules.getRulesState('patient_city')}>
                <ControlLabel>City</ControlLabel>
                <FormControl type="text" placeholder="City" value={this.props.patient.patient_city} onChange={e=>{this.onChange('patient_city', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_city')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formPatientState" validationState={this.props.rules.getRulesState('patient_state')}>
                <ControlLabel>State</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="State"
                  value={this.props.patient.patient_state}
                  onChange={e => {this.onChange('patient_state', e);}}
                >
                  <option key={0} value={''}>
                    {'-- Select State --'}
                  </option>
                  {this.getStateOptions()}
                </FormControl>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_state')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup controlId="formPatientZip" validationState={this.props.rules.getRulesState('patient_zip')}>
                <ControlLabel>Zip Code</ControlLabel>
                <FormControl type="text" placeholder="Zip" value={this.props.patient.patient_zip} onChange={e=>{this.onChange('patient_zip', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_zip')}</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row className="form-info">
            <b>Contact Information</b>
          </Row>
          <Row>
            <Col sm={3}>
              <FormGroup controlId="formPatientCell" validationState={this.props.rules.getRulesState('patient_cell')}>
                <ControlLabel>Cell Phone</ControlLabel>
                <FormControl type="tel" placeholder="Cell" value={this.props.patient.patient_cell} onChange={e=>{this.onChange('patient_cell', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_cell')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup controlId="formPatientPhone" validationState={this.props.rules.getRulesState('patient_phone')}>
                <ControlLabel>Home Phone</ControlLabel>
                <FormControl type="tel" placeholder="Phone" value={this.props.patient.patient_phone} onChange={e=>{this.onChange('patient_phone', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_phone')}</HelpBlock>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="formEmail" validationState={this.props.rules.getRulesState('patient_email')}>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="email" placeholder="Email" value={this.props.patient.patient_email} onChange={e=>{this.onChange('patient_email', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('patient_email')}</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default PatientForm;
