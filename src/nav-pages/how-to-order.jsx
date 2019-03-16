import React, {PureComponent} from 'react';
//import {Row, Col, Form, FormGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';

class HowToOrder extends PureComponent {
  render() {
    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-package icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">How To Order</span></h2>
              </div>
              <div className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li>How To Order
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <div className="container">
                <div>
                  <h1>How To Order</h1>
                  <hr className="divider bg-mantis" />
                </div>
                <div className="text-left">
                  <p></p>
                  <p>
                  <b>Ordering is fast and easy. There are three convenient ways to order your medication. The fastest way is to order on this website.
                  If you would like to speak to a Patient Care Specialist or if you have a medical question for our pharmacists, please call us toll free at 1-800-. </b></p>
                </div>
                <div className="offset-top-66 offset-lg-top-50">
                  <div className="unit unit-sm unit-sm-horizontal text-sm-left border-bottom">
                    <div className="unit-left"><span className="icon mdi mdi-monitor"></span></div>
                    <div className="unit-body">
                      <h4 className="text-bold text-malibu offset-sm-top-14">Order Online</h4>
                      <ol>
                        <li>Use the search bar to find your desired product</li>
                        <li>Select quantity and add the product to your shopping cart. Repeat the process until your ready to checkout</li>
                        <li>When you’re ready, proceed to checkout, located at the top right hand corner of the screen and complete the simple 3-step process.
                          Don’t forget to upload your prescription when prompted.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="offset-top-66 offset-lg-top-34">
                    <div className="unit unit-sm unit-sm-horizontal text-sm-left border-bottom">
                      <div className="unit-left"><span className="icon mdi mdi-phone"></span></div>
                      <div className="unit-body">
                        <h4 className="text-bold text-malibu offset-sm-top-14">Order by Phone</h4>
                        <ol>
                          <li>Simply call us toll-free at 1-877-221-2228 and one of our pharmacy staff can take your order over the phone and answer any of your questions.</li>
                          <li>Alternatively send us an email to orders@canadaoutreachpharmacy.com with your contact information so that one of our helpful staff members may give you a call as soon as
                            possible or at a time you specify. It may be a good idea to attach your prescription to the email to make ordering as smooth as possible.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="offset-top-66 offset-lg-top-34">
                    <div className="unit unit-sm unit-sm-horizontal text-sm-left border-bottom">
                      <div className="unit-left"><span className="icon mdi mdi-email-outline"></span></div>
                      <div className="unit-body">
                        <h4 className="text-bold text-malibu offset-sm-top-14">Order by Mail or Fax</h4>
                        <ol>
                          <li>Use the search bar to find the product price</li>
                          <li>Download and print the order form</li>
                          <li>Fill in all the required information</li>
                          <li>Either Mail or Fax your order form and prescription following the information on the form</li>
                          <li>When we receive the order, a customer service representative will contact you by phone to confirm the order</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p></p>
                  <p>With your first order at Canada Outreach Pharmacy we require information on your medical background, current medications, and drug allergies, to ensure you are not receiving
                    any medication that will conflict with your current medication or allergies. We also require contact information for your prescribing physician, so our pharmacy team can
                    contact them if they have any questions about your prescription.</p>
                  <p>All products marked as "prescription required" need to be accompanied with a written prescription along with the order request. Please select your method of placing
                    an order and send your prescription accordingly. </p>
                </div>
                <div>
                  <br/>
                  <hr className="divider bg-mantis" />
                  <h1>Frequently Asked Questions</h1>
                  <hr className="divider bg-mantis" />
                  <Collapse accordion={true}>
                    <Panel header="How do I order?" headerClass="panel panel-default panel-heading panel-title" className="panel-collapse">
                      <p>You can place your order online, give us a call, or send us a fax.</p>
                    </Panel>
                    <Panel header="How much is shipping? How long will it take to arrive? Which courier do you use?" headerClass="panel panel-default panel-heading panel-title" className="panel-collapse">
                      All orders are shipped via United States Postal Service (USPS). A USPS tracking number is available for each order. Please track your order at www.usps.com.
                    </Panel>
                    <Panel header="What are your hours of operations for your USA Prescription Team?" headerClass="panel panel-default panel-heading panel-title" className="panel-collapse">
                      <p>Customer service members are available Monday to Friday, 8AM-5PM PST and on Saturdays 8AM-4PM PST</p>
                    </Panel>
                    <Panel header="Does it cost me money to phone your 1-800 number?" headerClass="panel panel-default panel-heading panel-title" className="panel-collapse">
                      <p>Our 1-800 number is toll free from USA. If you’re calling from Canada, please use our local 604 number.</p>
                    </Panel>
                    <Panel header="I don’t see the drug I need. Can I request it?" headerClass="panel panel-default panel-heading panel-title" className="panel-collapse">
                      <p>Yes. We may be able to source a drug that is not currently listed in our database. Please give us a call at 1-778 or email us at (question email) for more information.</p>
                    </Panel>
                    <Panel header="Do I need a prescription?" headerClass="panel panel-default panel-heading panel-title" className="panel-collapse">
                      <p>Yes. We need to have a legal, valid prescription in order to fill for products marked as “Prescription Required”, just as your local pharmacy would. Once we have your prescription on file, we can work with your local doctor to arrange for refills upon your request.</p>
                    </Panel>
                    <Panel header="How do I send you my prescription?" headerClass="panel panel-default panel-heading panel-title" className="panel-collapse">
                      <p>There are many ways for you to provide us with a copy of your prescription. The easiest and quickest way is to attach the prescription to your order when prompted or to use the 'upload document' function on our homepage and follow the steps to send the prescription to us using your cell phone. You can also email us a scanned copy of your prescription or you can fax or mail your prescription to us at the information listed below:</p>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default HowToOrder;
