import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'

class Blog extends PureComponent {
  render() {
    return (
      <div>
        <section className="breadcrumb-classic">
          <div className="shell section-34 section-sm-50">
            <div className="range range-lg-middle">
              <div className="cell-lg-2 veil reveal-sm-block cell-lg-push-2"><span
                className="icon-lg mdi mdi-comment-question-outline icon icon-white"></span></div>
              <div className="cell-lg-5 veil reveal-lg-block cell-lg-push-1 text-lg-left">
                <h2><span className="big">Blog</span></h2>
              </div>
              <div
                className="offset-top-0 offset-sm-top-10 cell-lg-5 offset-lg-top-0 small cell-lg-push-3 text-lg-right">
                <ul className="list-inline list-inline-dashed p">
                  <li><Link to="/">Home</Link></li>
                  <li>Blog
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div>
        test content
        </div>
    </div>
    
    );
  }
}
export default Blog;