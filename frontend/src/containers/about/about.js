import React from 'react'
import Layout from '../../components/layout';
import aboutus from '../../img/about_us.png'
import './about.css';

const About =(props) => {
    return (
       <Layout>    
        <div className="aboutTitle">
          <h1>About Us</h1>
        </div>

        <div className="about-section">
          <img className='py-5' src={aboutus} alt="" />
          <div className="inner-container">
            <p className="text">
              Welcome to shopCart! We aim to offer our customers a variety of
              the latest technology products. We’ve come a long way, so we know
              exactly which direction to take when supplying you with high
              quality yet budget-friendly products.
            </p>

            <p className="text">
              We offer all of this while providing excellent customer service
              and friendly support. We always keep an eye on the latest trends
              in electronics and technology and put our customers’ wishes first.
              That is why we have satisfied customers all over the world, and
              are thrilled to be a part of the buy and sell technology industry.
            </p>
            <div className="skills">
              <span>Easy to use</span>
              <span>Customer priority</span>
              <span>Order Tracking</span>
            </div>
          </div>
        </div>
       </Layout>
    );
}

export default About
