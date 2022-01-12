import React from 'react'
import Layout from '../../components/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Helmet} from "react-helmet";
import samsungBanner1 from '../../img/Samsung_banner.jpg';
import samsungBanner2 from '../../img/Samsung_banner1.jpg';
import feature_1 from '../../img/feature_1.png';
import feature_2 from '../../img/feature_1.png'
import './home.css'
import FeatureBox from './featurebox';

const Home =() => {
    return (
      <>
        <Helmet>
          <title>ShopX Home</title>
          <meta
            name="description"
            content="Buy, Sell, Electronics, Ecommerce, ShopX"
          ></meta>
        </Helmet>

        <Layout>
          <div className="carousal">
            <Carousel
              renderThumbs={() => {}}
              autoFocus
              autoPlay
              useKeyboardArrows
              showStatus={false}
            >
              <div>
                <img src={samsungBanner1} alt="" />
              </div>
              <div>
                <img src={samsungBanner2} alt="" />
              </div>
            </Carousel>
          </div>
          <div className="features">
            <div className="name">
              <a className="cv-btn" href="/products">
                Shop Now!
              </a>
            </div>

            <div className="a-container">
              <FeatureBox
                image={feature_1}
                title={"Amazing products"}
                text={
                  "Numerous selection with top quality products that you will love!"
                }
              ></FeatureBox>
              <FeatureBox
                image={feature_1}
                title={"Best Prices"}
                text={
                  "We at ShopX pride ourselves with providing amazing, non-beatable prices that you cannot miss!"
                }
              ></FeatureBox>
            </div>
          </div>
        </Layout>
      </>
    );
}

export default Home
