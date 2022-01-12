import React, { Component } from "react";
import Layout from "../../components/layout";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Cart extends Component {
  render() {
    return (
      <Layout>
        <section>
          <ProductConsumer>
            {(value) => {
              const { cart } = value;
              if (cart.length > 0) {
                return (
                  <>
                   <div className="col-10 mx-auto text-center text-title py-4">
                        <h1>Cart CheckOut</h1>
                    </div>
                    <div className="container-fluid text-center d-none d-lg-block">
                      <div className="row">
                        <div className="col-10 mx-auto col-lg-2">
                          <p className="text-uppercase">Products</p>
                        </div>

                        <div className="col-10 mx-auto col-lg-2">
                          <p className="text-uppercase">Product Name</p>
                        </div>

                        <div className="col-10 mx-auto col-lg-2">
                          <p className="text-uppercase">Price</p>
                        </div>

                        <div className="col-10 mx-auto col-lg-2">
                          <p className="text-uppercase">Quantity</p>
                        </div>

                        <div className="col-10 mx-auto col-lg-2">
                          <p className="text-uppercase">Remove</p>
                        </div>

                        <div className="col-10 mx-auto col-lg-2">
                          <p className="text-uppercase">total</p>
                        </div>
                      </div>
                    </div>

                    <CartList value={value}></CartList>
                    <CartTotals value={value}></CartTotals>
                  </>
                );
              } else {
                return(
                  <div className="container mt-5">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title">
                        <h1>Cart is Empty</h1>
                    </div>
                </div>
            </div>
                )
              }
            }}
          </ProductConsumer>
        </section>
      </Layout>
    );
  }
}
