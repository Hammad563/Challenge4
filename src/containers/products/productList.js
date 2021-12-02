import React, { Component } from 'react';
import Product from './products';
import { ProductConsumer } from '../../context';
import { storeProducts } from '../../Data/ProductData';
import Layout from '../../components/layout';
import './productList.css'

export default class ProductList extends Component {

    render() {
        return (
            <React.Fragment>
              <Layout>
              <div className="py-5 d-flex">
                    <div className="container">
                        <h1 className='title'>Our Products</h1>
                            <div className="row">
                        
                                <ProductConsumer>
                                    { (value) => {
                                       return value.products.map( product => {
                                           console.log("products",product)
                                           return <Product key= {product.id} product= {product}></Product>
                                       })
                                       
                                    }}
                                </ProductConsumer>
                                
                            </div>
                    </div>

                </div>
              </Layout>
            </React.Fragment>
              //  <Product></Product>
           
        )
    }
}
