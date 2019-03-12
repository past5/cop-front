import React, {PureComponent} from 'react';
import logo from './images/logo.png';
import './App.css';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, FormGroup, FormControl, ControlLabel, Row, Col} from 'react-bootstrap';

class Navigation extends PureComponent {
  getCheckout() {
    if (!this.props.checkoutButton || !this.props.checkoutButton.props || this.props.checkoutButton.props.grandTotal <= 0) {
      return <div>
        <Col sm={6}>
          <FormGroup>
            <FormControl type="text"
                         placeholder="Enter Product Name"
                         onChange={e=>{this.props.search(e.target.value);}}
            />
          </FormGroup>
        </Col>
        <Col sm={2} className="text-right hidden-xs">
          <Nav>
            <NavItem className="nav-link" href="/products" onClick={this.props.reset}>Browse Our Products</NavItem>
          </Nav>
        </Col>
      </div>;
    }

    return <div>
      <Col sm={4}>
        <FormGroup>
          <FormControl type="text"
                       placeholder="Enter Product Name"
                       onChange={e=>{this.props.search(e.target.value);}}
          />
        </FormGroup>
      </Col>
      <Col sm={2} className="text-right hidden-xs">
        <Nav>
          <NavItem className="nav-link" href="/products" onClick={this.props.reset}>Browse Our Products</NavItem>
        </Nav>
      </Col>
      <Col sm={2}>
        <Nav>
          <NavItem className="nav-link" href="/checkout">Checkout<span className="badge">{Object.keys(this.props.shoppingCart.props.products).length}</span> (${this.props.checkoutButton.props.grandTotal.toFixed(2)})</NavItem>
        </Nav>
      </Col>
    </div>;
  }
  render() {
    return (
      <header className="page-head">
        <Navbar className="rd-navbar rd-navbar-default rd-navbar-light rd-navbar-static">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>
                <Col sm={10}>
                  <img src={logo} alt="Canada Outreach Pharmacy Logo" className="App-logo"/><br />
                  Toll free #  <b>1-866-363-1899</b>
                </Col>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <ul className="rd-navbar-nav">
                <NavItem className="li-nav" href="/">Home</NavItem>
                <NavItem className="li-nav" href="/about">About</NavItem>
                <NavItem className="li-nav" href="/howtoorder">How To Order</NavItem>
                <NavItem className="li-nav" href="/contact">Contact</NavItem>
                <NavItem className="li-nav" href="/products" onClick={this.props.reset}>Products</NavItem>
              </ul>
            </Nav>
          </Navbar.Collapse>
          <Row className="search-row">
            <Col sm={4} className="hidden-xs">
              <Nav>
                <NavItem className="nav-link" href="/documents/canada-outreach-pharmacy-order-form.pdf" target="_blank">Download Order Form <i className="fa fa-cloud-download"></i></NavItem>
                <NavItem className="nav-link" href="/checkout">Upload Documents <i className="fa fa-cloud-upload"></i></NavItem>
              </Nav>
            </Col>
            {this.getCheckout()}
          </Row>
        </Navbar>
      </header>
    );
  }
}

export default Navigation;
