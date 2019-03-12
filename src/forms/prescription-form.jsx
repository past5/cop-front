import React, {PureComponent} from 'react';
import {Form, FormGroup, FormControl, Checkbox, Row, Col, ControlLabel, Label, HelpBlock, Dropdown, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Api from "../api/api";

var cloneDeep = require('lodash.clonedeep');
var path = require('path');

const extTypes = {
  "3gp"   : "video/3gpp"
  , "a"     : "application/octet-stream"
  , "ai"    : "application/postscript"
  , "aif"   : "audio/x-aiff"
  , "aiff"  : "audio/x-aiff"
  , "asc"   : "application/pgp-signature"
  , "asf"   : "video/x-ms-asf"
  , "asm"   : "text/x-asm"
  , "asx"   : "video/x-ms-asf"
  , "atom"  : "application/atom+xml"
  , "au"    : "audio/basic"
  , "avi"   : "video/x-msvideo"
  , "bat"   : "application/x-msdownload"
  , "bin"   : "application/octet-stream"
  , "bmp"   : "image/bmp"
  , "bz2"   : "application/x-bzip2"
  , "c"     : "text/x-c"
  , "cab"   : "application/vnd.ms-cab-compressed"
  , "cc"    : "text/x-c"
  , "chm"   : "application/vnd.ms-htmlhelp"
  , "class"   : "application/octet-stream"
  , "com"   : "application/x-msdownload"
  , "conf"  : "text/plain"
  , "cpp"   : "text/x-c"
  , "crt"   : "application/x-x509-ca-cert"
  , "css"   : "text/css"
  , "csv"   : "text/csv"
  , "cxx"   : "text/x-c"
  , "deb"   : "application/x-debian-package"
  , "der"   : "application/x-x509-ca-cert"
  , "diff"  : "text/x-diff"
  , "djv"   : "image/vnd.djvu"
  , "djvu"  : "image/vnd.djvu"
  , "dll"   : "application/x-msdownload"
  , "dmg"   : "application/octet-stream"
  , "doc"   : "application/msword"
  , "dot"   : "application/msword"
  , "dtd"   : "application/xml-dtd"
  , "dvi"   : "application/x-dvi"
  , "ear"   : "application/java-archive"
  , "eml"   : "message/rfc822"
  , "eps"   : "application/postscript"
  , "exe"   : "application/x-msdownload"
  , "f"     : "text/x-fortran"
  , "f77"   : "text/x-fortran"
  , "f90"   : "text/x-fortran"
  , "flv"   : "video/x-flv"
  , "for"   : "text/x-fortran"
  , "gem"   : "application/octet-stream"
  , "gemspec" : "text/x-script.ruby"
  , "gif"   : "image/gif"
  , "gz"    : "application/x-gzip"
  , "h"     : "text/x-c"
  , "hh"    : "text/x-c"
  , "htm"   : "text/html"
  , "html"  : "text/html"
  , "ico"   : "image/vnd.microsoft.icon"
  , "ics"   : "text/calendar"
  , "ifb"   : "text/calendar"
  , "iso"   : "application/octet-stream"
  , "jar"   : "application/java-archive"
  , "java"  : "text/x-java-source"
  , "jnlp"  : "application/x-java-jnlp-file"
  , "jpeg"  : "image/jpeg"
  , "jpg"   : "image/jpeg"
  , "js"    : "application/javascript"
  , "json"  : "application/json"
  , "log"   : "text/plain"
  , "m3u"   : "audio/x-mpegurl"
  , "m4v"   : "video/mp4"
  , "man"   : "text/troff"
  , "mathml"  : "application/mathml+xml"
  , "mbox"  : "application/mbox"
  , "mdoc"  : "text/troff"
  , "me"    : "text/troff"
  , "mid"   : "audio/midi"
  , "midi"  : "audio/midi"
  , "mime"  : "message/rfc822"
  , "mml"   : "application/mathml+xml"
  , "mng"   : "video/x-mng"
  , "mov"   : "video/quicktime"
  , "mp3"   : "audio/mpeg"
  , "mp4"   : "video/mp4"
  , "mp4v"  : "video/mp4"
  , "mpeg"  : "video/mpeg"
  , "mpg"   : "video/mpeg"
  , "ms"    : "text/troff"
  , "msi"   : "application/x-msdownload"
  , "odp"   : "application/vnd.oasis.opendocument.presentation"
  , "ods"   : "application/vnd.oasis.opendocument.spreadsheet"
  , "odt"   : "application/vnd.oasis.opendocument.text"
  , "ogg"   : "application/ogg"
  , "p"     : "text/x-pascal"
  , "pas"   : "text/x-pascal"
  , "pbm"   : "image/x-portable-bitmap"
  , "pdf"   : "application/pdf"
  , "pem"   : "application/x-x509-ca-cert"
  , "pgm"   : "image/x-portable-graymap"
  , "pgp"   : "application/pgp-encrypted"
  , "pkg"   : "application/octet-stream"
  , "pl"    : "text/x-script.perl"
  , "pm"    : "text/x-script.perl-module"
  , "png"   : "image/png"
  , "pnm"   : "image/x-portable-anymap"
  , "ppm"   : "image/x-portable-pixmap"
  , "pps"   : "application/vnd.ms-powerpoint"
  , "ppt"   : "application/vnd.ms-powerpoint"
  , "ps"    : "application/postscript"
  , "psd"   : "image/vnd.adobe.photoshop"
  , "py"    : "text/x-script.python"
  , "qt"    : "video/quicktime"
  , "ra"    : "audio/x-pn-realaudio"
  , "rake"  : "text/x-script.ruby"
  , "ram"   : "audio/x-pn-realaudio"
  , "rar"   : "application/x-rar-compressed"
  , "rb"    : "text/x-script.ruby"
  , "rdf"   : "application/rdf+xml"
  , "roff"  : "text/troff"
  , "rpm"   : "application/x-redhat-package-manager"
  , "rss"   : "application/rss+xml"
  , "rtf"   : "application/rtf"
  , "ru"    : "text/x-script.ruby"
  , "s"     : "text/x-asm"
  , "sgm"   : "text/sgml"
  , "sgml"  : "text/sgml"
  , "sh"    : "application/x-sh"
  , "sig"   : "application/pgp-signature"
  , "snd"   : "audio/basic"
  , "so"    : "application/octet-stream"
  , "svg"   : "image/svg+xml"
  , "svgz"  : "image/svg+xml"
  , "swf"   : "application/x-shockwave-flash"
  , "t"     : "text/troff"
  , "tar"   : "application/x-tar"
  , "tbz"   : "application/x-bzip-compressed-tar"
  , "tcl"   : "application/x-tcl"
  , "tex"   : "application/x-tex"
  , "texi"  : "application/x-texinfo"
  , "texinfo" : "application/x-texinfo"
  , "text"  : "text/plain"
  , "tif"   : "image/tiff"
  , "tiff"  : "image/tiff"
  , "torrent" : "application/x-bittorrent"
  , "tr"    : "text/troff"
  , "txt"   : "text/plain"
  , "vcf"   : "text/x-vcard"
  , "vcs"   : "text/x-vcalendar"
  , "vrml"  : "model/vrml"
  , "war"   : "application/java-archive"
  , "wav"   : "audio/x-wav"
  , "wma"   : "audio/x-ms-wma"
  , "wmv"   : "video/x-ms-wmv"
  , "wmx"   : "video/x-ms-wmx"
  , "wrl"   : "model/vrml"
  , "wsdl"  : "application/wsdl+xml"
  , "xbm"   : "image/x-xbitmap"
  , "xhtml"   : "application/xhtml+xml"
  , "xls"   : "application/vnd.ms-excel"
  , "xml"   : "application/xml"
  , "xpm"   : "image/x-xpixmap"
  , "xsl"   : "application/xml"
  , "xslt"  : "application/xslt+xml"
  , "yaml"  : "text/yaml"
  , "yml"   : "text/yaml"
  , "zip"   : "application/zip"
};

const addAllergyTooltip = (
  <Tooltip id="addAllergyTooltip">
    Add Allergy
  </Tooltip>
);

const removeAllergyTooltip = (
  <Tooltip id="removeAllergyTooltip">
    Remove Allergy
  </Tooltip>
);

const addMedicationTooltip = (
  <Tooltip id="addMedicationTooltip">
    Add Medication
  </Tooltip>
);

const removeMedicationTooltip = (
  <Tooltip id="removeMedicationTooltip">
    Remove Medication
  </Tooltip>
);

class PrescriptionForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allergySelected: '',
      medicationSelected: '',
      allergy: '',
      medication: '',
    };
  }

  isValidated() {
    this.props.rules.checkRequiredFieldValues(false);
    this.forceUpdate();
    return !this.props.rules.unvalidated;
  }

  handleOnAllergySelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        allergySelected: row.id
      }));
    }
  }

  handleOnMedicationSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        medicationSelected: row.id
      }));
    }
  }

  handleAllergyDelete = (e) => {
    let allergies = cloneDeep(this.props.rx.allergies);
    allergies.forEach((allergy, index) => {
      if (allergy.allergy_name === e.target.id) {
        allergies.splice(index, 1);
      }
    });

    this.setParentStates('allergies', allergies);
  }

  handleMedicationDelete = (e) => {
    let medications = cloneDeep(this.props.rx.medications);
    medications.forEach((medication, index) => {
      if (medication.medication_name === e.target.id) {
        medications.splice(index, 1);
      }
    });

    this.setParentStates('medications', medications);
  }

  createCustomAllergyDeleteButton = (allergy) => {
    return (
      <OverlayTrigger placement="left" overlay={removeAllergyTooltip}>
        <Button className="btn btn-danger" id={allergy} onClick={(e) => this.handleAllergyDelete(e)}><i className="fa fa-trash mx-1"/>Remove</Button>
      </OverlayTrigger>
    );
  }

  createCustomMedicationDeleteButton = (medication) => {
    return (
      <OverlayTrigger placement="left" overlay={removeMedicationTooltip}>
        <Button className="btn btn-danger" id={medication} onClick={(e) => this.handleMedicationDelete(e)}><i className="fa fa-trash mx-1"/>Remove</Button>
      </OverlayTrigger>
    );
  }

  setParentStates(id, value) {
    this.props.checkParent(id, value, 'rx');
  }

  handleFileUpload(e) {
    if (e.target.files[0] !== undefined) {
      let data = new FormData();
      data.append('file', e.target.files[0]);
      this.postFile(data);
    }
  }

  postFile(data) {
    const apiResource = 'rx/file';
    return Api
      .post(apiResource, data)
      .then(result =>{
        this.setParentStates('rx_original_file', result.data.response.fileName);
      })
      .catch(error => {console.log(error);});
  }

  // TODO: this does not work, currently direct to API for prescription file fetching
  getFile(fileName) {
    const apiResource = 'rx/file/' + fileName;
    return Api
      .get(apiResource)
      .then(result =>{
        let win = window.open("", "", "_blank");
        let extension = path.extname(fileName).substring(1);
        win.document.open("text/html", "replace");
        switch(extension) {
          case 'jpg':
            // let img = document.createElement('img');
            // img.src = 'data:image/jpeg;base64,' + btoa(result.data);
            // win.document.body.appendChild(img);
            win.document.write("<img src='data:image/jpeg;base64,'" + btoa(unescape(encodeURIComponent(result.data))) + "'/>");
            break;
          default:
            win.document.write(result.data);
        }
        win.document.close();
      })
      .catch(error => {console.log(error);});
  }

  onChange(id, e) {
    this.setState({[id]: e.target.value});
  }

  addAllergy() {
    if (this.state.allergy.length > 0) {
      let allergies = cloneDeep(this.props.rx.allergies);
      let index = allergies.length;
      allergies.push({allergy_name: this.state.allergy, allergy_delete: this.createCustomAllergyDeleteButton(this.state.allergy)});
      this.setParentStates('allergies', allergies);
      this.setState({allergy: ''});
    }
  }

  addMedication() {
    if (this.state.medication.length > 0) {
      let medications = cloneDeep(this.props.rx.medications);
      let index = medications.length;
      medications.push({medication_name: this.state.medication, medication_delete: this.createCustomMedicationDeleteButton(this.state.medication)});
      this.setParentStates('medications', medications);
      this.setState({medication: ''});
    }
  }

  render() {
    const allergyColumns = [
      {
        dataField: 'allergy_name',
        text: 'Your Allergies'
      },
      {
        dataField: 'allergy_delete',
        text: '',
        classes: (cell, row, rowIndex, colIndex) => { return 'table-col-right' }
      },
    ];

    const medicationColumns = [
      {
        dataField: 'medication_name',
        text: 'Your Medications'
      },
      {
        dataField: 'medication_delete',
        text: '',
        classes: (cell, row, rowIndex, colIndex) => { return 'table-col-right' }
      },
    ];

    const selectAllergyRow = {
      mode: 'radio',
      clickToSelect: true,
      hideSelectColumn: true,
      selected: this.state.selected,
      onSelect: this.handleOnAllergySelect,
    };

    const selectMedicationRow = {
      mode: 'radio',
      clickToSelect: true,
      hideSelectColumn: true,
      selected: this.state.selected,
      onSelect: this.handleOnMedicationSelect,
    };

    const rowClasses = (row, rowIndex) => {
      return 'table-row-class';
    };

    // const rxButton = this.props.rx.rx_original_file === '' ? undefined : <Button className="btn" hidden onClick={() => this.getFile(this.props.rx.rx_original_file)}>View Uploaded Prescription</Button>;
    const rxButton = this.props.rx.rx_original_file === '' ? undefined : <a href={'http://35.230.0.73:8888/api/v1/rx/file/' + this.props.rx.rx_original_file} target="_blank">View Uploaded Prescription</a>;
    return(<div className="order-form">
      <Form>
        <Row className="form-info">
          <h5><b>Step 3</b></h5>
        </Row>
        <Row className="form-info">
          <b>Prescription and Medical Information</b>
          <hr className="form-divider"/>
        </Row>
        <Row>
          <FormGroup controlId="formControlsFile" validationState={this.props.rules.getValidationState('rx_original_file')}>
            <ControlLabel><b>Your Prescription</b></ControlLabel>
            <FormControl type="file" onChange={(e) => this.handleFileUpload(e)} />
            <FormControl.Feedback />
            <HelpBlock className="grey-error">{this.props.rules.getErrorMessage('rx_original_file')}</HelpBlock>
            <div className="input-group form-inline">
              {rxButton}
            </div>
          </FormGroup>
          <br/>
        </Row>
        <Row>
          <hr className="form-divider"/>
        </Row>
        <Row>
          <ControlLabel>Please type in your allergies and medications you are taking (if any)</ControlLabel>
        </Row>
        <Row>
          <BootstrapTable keyField='allergy_name' data={ this.props.rx.allergies } columns={ allergyColumns }
                          bordered={ false } selectRow={ selectAllergyRow } rowClasses={ rowClasses } />
        </Row>
        <Row>
          <FormGroup controlId="formAllergyName" validationState={this.props.rules.getValidationState('allergy')}>
            <div className="input-group form-inline">
              <FormControl type="text" placeholder="Type Allergy and Click on '+' to Add" value={this.state.allergy} onChange={e=>{this.onChange('allergy', e);}}/>
              <FormControl.Feedback />
              <HelpBlock>{this.props.rules.getErrorMessage('allergy')}</HelpBlock>
              <span className="input-group-btn">
                <OverlayTrigger placement="left" overlay={addAllergyTooltip}>
                  <Button className="btn btn-add" onClick={() => this.addAllergy()}>
                    <i className="fa fa-plus mx-1"/>
                  </Button>
                </OverlayTrigger>
              </span>
            </div>
          </FormGroup>
        </Row>
        <Row>
          <BootstrapTable keyField='medication_name' data={ this.props.rx.medications } columns={ medicationColumns }
                          bordered={ false } selectRow={ selectMedicationRow } rowClasses={ rowClasses } />
        </Row>
        <Row>
          <Form>
            <FormGroup controlId="formMedicationName" validationState={this.props.rules.getValidationState('medication')}>
              <div className="input-group form-inline">
                <FormControl type="text" placeholder="Type Medication and Click on '+' to Add" value={this.state.medication} onChange={e=>{this.onChange('medication', e);}}/>
                <FormControl.Feedback />
                <HelpBlock>{this.props.rules.getErrorMessage('medication')}</HelpBlock>
                <span className="input-group-btn">
                  <OverlayTrigger placement="left" overlay={addMedicationTooltip}>
                    <Button className="btn btn-add" onClick={() => this.addMedication()}>
                      <i className="fa fa-plus mx-1"/>
                    </Button>
                  </OverlayTrigger>
                </span>
              </div>
            </FormGroup>
          </Form>
        </Row>
      </Form>
    </div>);
  }
}
export default PrescriptionForm;
