import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';

class Faq extends PureComponent {
  render() {
    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-comment-question-outline icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">Frequently Asked Questions</span></h2>
              </div>
              <div
                className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li>Frequently Asked Questions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <h2><span className="big"> Frequently Asked Questions</span></h2>
              <hr className="divider bg-mantis" />
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
          </section>
        </main>
      </div>
    );
  }
}

export default Faq;
