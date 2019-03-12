import React, {PureComponent} from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'

class About extends PureComponent {
  render() {
    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-comment-question-outline icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">About</span></h2>
              </div>
              <div
                className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li>About
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <h2><span className="big"> About Us</span></h2>
              <hr className="divider bg-mantis" />
                <div className="row text-left offset-top-30 offset-md-top-20">
                    <p>Here at Canada Outreach Pharmacy, we pride ourselves on quality service and the highest standards of patient care. We strive to get to know our patients, to best understand
                        how to serve them. We are extremely grateful to have patients who invite us into their homes through the medications we provide and the services we offer. </p>
					<p>The Canadian Government, Health Canada regulations are as strict as the FDA in America. Drug Regulations in Canada protect Canadians from paying excessive
                        prices for prescription medication.  Based on International Best Practices, Americans should be able to buy affordable medications at the low cost that Canadians pay
                        for the same medications  found in American drug stores.</p>
                    <p>If you are a US patient with a US prescription, we've got you covered! Simply search our inventory for the product you need or give us a call toll-free on
                        1-866-363-1899</p>
                    <p>Our  neighborhood Drugstore has been serving our patients for over 16 years.  Now, here is why we are the only Canadian pharmacy to trust with you and your family's
                        healthcare, whether you are here in Canada or there, in the US:</p>
                    <ul>
                        <li>
                            You will be dealing directly with a real, licenced pharmacy with highly qualified staff - we are absolutely NOT a call center and you will never receive any unsolicited calls
                        </li>
                        <li>
                            We are a brick and mortar store so you can always pick up your medication at the pharmacy yourself. If you feel like the trip and the chance to see one of the most beautiful
                            cities in the world, please, be our guest!
                        </li>
                        <li>
                            Meet our wonderful staff (see below)
                        </li>
                        <li>
                            We are certified by the Canadian Government through the College of Pharmacist of British Columbia - Licence #
                        </li>
                        <li>
                            100% satisfaction guarantee
                        </li>
                        <li>
                            We will price match to always be the most affordable option for your medication (so long as we are matching with a real pharmacy who are also shipping your medication from Canada)
                        </li>
                        <li>
                            Your information will always be kept safe and secure with the highest level of online encryption available
                        </li>
                    </ul>
                </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default About;
