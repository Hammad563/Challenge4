import React from 'react';
import { Link } from 'react-router-dom';



export default function CartTotals({value, history}) {
    const {cartSubTotal, cartTax, cartTotal, clearCart} = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">

                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-10 text-capitalize text-end">
                        <Link to="/products">
                            
                                    <button className="btn btn-outline-danger text-uppercase mb-5 px-2 float-right" type="button" onClick={ () =>clearCart()}>
                                            Clear Cart
                                    </button>
                                
                        </Link>

                        <h5>
                            <span className="text-title">
                                subtotal : 
                            </span>
                            <strong>
                                $ {cartSubTotal}
                            </strong>
                        </h5>

                        <h5>
                            <span className="text-title">
                                tax : 
                            </span>
                            <strong>
                                $ {cartTax}
                            </strong>
                        </h5>

                        <h5>
                            <span className="text-title">
                                total : 
                            </span>
                            <strong>
                                $ {cartTotal}
                            </strong>
                        </h5>

                    

                    </div>

                    

                <div className="col-10 mt-5 ml-sm-5 ml-md-auto col-sm-10 text-capitalize text-start">
                    <Link to="/products">
                            
                            <button className="btn btn-outline-primary text-uppercase mb-5 px-5">
                                    Back to Products
                            </button>
                    </Link>


                </div>
                   

                </div>
            </div>
        </React.Fragment>
    )
}