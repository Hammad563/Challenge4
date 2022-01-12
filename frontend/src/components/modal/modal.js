import React, { Component, useState } from 'react';
import { ProductConsumer } from '../../context';

export default class Modal extends Component {
    render(){
        return (
           <ProductConsumer>
               {
                   (value) => {
                       const {modalOpen, closeModal} = value;
                       const {img, title, price} = value.modalProduct

                       if(!modalOpen){
                           return null;
                       }
                       else{
                           return (
                             <ModalContainer>
                               <div className="container">
                                 <div className="row">
                                   <div
                                     id="modal"
                                     className="col-8 mx-auto col-md-6 col-lg-4 pd-6 text-center text-capitalize"
                                   >
                                     <h2>Item Added to Cart!</h2>
                                     <img
                                       src={img}
                                       className="img-fluid imgModal"
                                       alt="product"
                                     />
                                     <h5>{title}</h5>
                                     <h5>price : $ {[price]}</h5>

                                     <Link to="/ProductList">
                                       <ButtonContainer
                                         onClick={() => closeModal()}
                                       >
                                         Continue shopping
                                       </ButtonContainer>
                                     </Link>

                                     <Link to="/cart">
                                       <ButtonCart onClick={() => closeModal()}>
                                         Check cart
                                       </ButtonCart>
                                     </Link>


                                   </div>
                                 </div>
                               </div>
                             </ModalContainer>
                           );
                       }
                   }
               }
           </ProductConsumer>
        )
    }
}
