import React, {PureComponent} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
class Home extends PureComponent {
  render() {
    const responsive = {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1024: {
        items: 1
      }
    };

    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-home icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">Home</span></h2>
              </div>
              <div
                className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <main className="page-content section-50 section-md-50">
          <section id="section-childs">
            <div className="shell">
              <h2><span className="big"> How This Works</span></h2>
              <hr className="divider bg-mantis" />
              <div className="row text-left offset-top-30 offset-md-top-20">
                <div className="col-sm-8 col-sm-offset-2 col-md-3 col-md-offset-0">
                </div>
                <div className="range range-xs-center offset-top-10 text-md-left">
                  <div>
                    <ul className="list-unstyled list-index row text-left">
                      <li className="col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-0">
                        <div className="unit unit-sm unit-sm-horizontal text-center text-sm-left">
                          <div className="unit-left"><span
                            className="list-index-counter icon icon-circle icon-darker-filled"></span></div>
                          <div className="unit-body">
                            <h3 className="offset-sm-top-20">Find Your Medication</h3>
                            <FormGroup>
                              <FormControl type="text"
                                           placeholder="Enter Product Name"
                                           onChange={e=>{this.props.search(e.target.value);}}
                              />
                            </FormGroup>
                            <p>Or simply Call Us Toll Free: 1-877-221-2228</p>
                          </div>
                        </div>
                      </li>
                      <li className="col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-0 offset-top-66 offset-md-top-0">
                        <div className="unit unit-sm unit-sm-horizontal text-center text-sm-left">
                          <div className="unit-left"><span
                            className="list-index-counter icon icon-circle icon-darker-filled"></span></div>
                          <div className="unit-body">
                            <h3 className="offset-sm-top-20">Order your medication</h3>
                            <p>Once you've found your Medication, follow the instructions to complete your order, or call Toll Free: 1-877-221-2228. We require an original Rx prior to dispensing your order.</p>
                          </div>
                        </div>
                      </li>
                      <li className="col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-0 offset-top-66 offset-md-top-0">
                        <div className="unit unit-sm unit-sm-horizontal text-center text-sm-left">
                          <div className="unit-left"><span
                            className="list-index-counter icon icon-circle icon-darker-filled"></span></div>
                          <div className="unit-body">
                            <h3 className="offset-sm-top-20">Receive your medication</h3>
                            <p>Your medication will be delivered direct to your chosen destination by USPS. Average deliveries are between 7-10 days. If you need it faster, select the Expedited or Express options when ordering..</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <hr className="divider bg-mantis" /><br />
                  </div>
                  <div className="cell-sm-10 cell-lg-7 cell-lg-push-6">
                    <AliceCarousel
                      duration={1000}
                      autoPlay={true}
                      startIndex = {0}
                      fadeOutAnimation={true}
                      mouseDragEnabled={true}
                      buttonsDisabled={true}
                      playButtonEnabled={true}
                      responsive={responsive}
                      autoPlayInterval={5000}
                      autoPlayDirection="ltr"
                      autoPlayActionDisabled={true}
                      onSlideChange={this.onSlideChange}
                      onSlideChanged={this.onSlideChanged}
                      className="main-carousel"
                    >
                      <img className="main-gallery" src="/images/pharmacy/iStock-146806935.jpg" alt="" />
                      <img className="main-gallery" src="/images/pharmacy/iStock-637382766.jpg" alt=""/>
                      <img className="main-gallery" src="/images/pharmacy/iStock-642333350.jpg" alt=""/>
                      <img className="main-gallery" src="/images/pharmacy/iStock-645597408.jpg" alt=""/>
                      <img className="main-gallery" src="/images/pharmacy/iStock-660133278.jpg" alt="" />
                      <img className="main-gallery" src="/images/pharmacy/iStock-660133286.jpg" alt=""/>
                      <img className="main-gallery" src="/images/pharmacy/iStock-694240988.jpg" alt=""/>
                      <img className="main-gallery" src="/images/pharmacy/iStock-696683230.jpg" alt=""/>
                    </AliceCarousel>
                  </div>
                  <div className="cell-sm-10 cell-lg-5 cell-lg-pull-6 offset-lg-top-0">
                    <p>A pharmacist will visit your home and complete a full medication review, including all prescription and over the counter products.
                      When needed, we bring a physician into your home with the use of our advanced distance based medical equipment.</p>
                    <p>Our Daily Programs are suitable for simple and complex medical conditions:</p>
                    <ul className="list list-marked">
                      <li>Referral service 7 days a week</li>
                      <li>Guaranteed watch and witness of medication ingestion at prescribed dosing time</li>
                      <li>In home diabetes program</li>
                      <li>We assist patients with Pharmacare registration and ensure medications are covered</li>
                    </ul>
                    <p>
                      Our Pharmacists provide an in-home medication management service with daily or weekly follow up covering the entire Lower Mainland and Fraser Valley Health Regions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Home;
