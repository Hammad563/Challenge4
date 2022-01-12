import React, {Component} from 'react';
import { storeProducts, detailProduct } from './Data/ProductData';

const ProductContext = React.createContext();
//Provider

//Consumer
 class ProductProvider extends Component {

    // state
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    
    // didMount
    componentDidMount() {
        this.setProducts();
    };

        // setProducts
        setProducts = () => {
            let tempProducts = [];
            storeProducts.forEach( item => {
                const singleItem = {...item};
                tempProducts = [...tempProducts,singleItem];

            })
            this.setState( () => {
                return {products:tempProducts}
            })
            localStorage.setItem('products',this.products)
        }
        

        getItem =  (id) => {
            const product = this.state.products.find(item => item.id === id);
            return product;
        }

        // detail
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState( () => {
            return {detailProduct:product}
        })
    }
    // cart
    addToCart = id => {
            let tempProducts = [...this.state.products];
            const index = tempProducts.indexOf(this.getItem(id));
            const product = tempProducts[index];
            product.inCart = true;
            product.count = 1;
            const price = product.price;
            product.total = price;
            this.setState ( () => {
                return{products: tempProducts, cart:[...this.state.cart, product]};
            },
            () => {
                this.addTotals();
            }
            
            );
            
    };

    modal = id => {
        const product = this.getItem(id);
        this.setState ( () => {
            return {modalProduct:product,modalOpen:true}
        })
    }
    
    closeModal = () => {
        this.setState ( () => {
            return {modalOpen:false}
        })
    }

    // increment cart value
    increment = id => {
            let tempCart = [...this.state.cart];
            const productGot = tempCart.find(item => item.id === id);

            const index = tempCart.indexOf(productGot);
            const product = tempCart[index];

            product.count = product.count + 1;
            product.total = product.count * product.price;

            this.setState( () => {
                return {
                    cart: [...tempCart]
                }
            }, () => {this.addTotals()})
    
        }

        // decrement cart value
    decrement = (id) => {

        let tempCart = [...this.state.cart];
            const productGot = tempCart.find(item => item.id === id);

            const index = tempCart.indexOf(productGot);
            const product = tempCart[index];

            product.count = product.count - 1;
            
            if(product.count === 0) {
                this.removeItem(id)
            }
            else {
                product.total = product.count * product.price

                this.setState( () => {
                    return {
                        cart: [...tempCart]
                    }
                }, () => {this.addTotals()})
            }



    }
        // remove item
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];

        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState ( () => {
            return{
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {this.addTotals();})

    }

    // clear cart
    clearCart = () => {
        this.setState ( () => {
            return { 
                cart: []};
        }, () => {
            this.setProducts();
            this.addTotals();
        });
    }

    // Add the totals
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal = subTotal + item.total));

        const tempTax = subTotal * 0.13;
        const tax = parseFloat(tempTax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));

        this.setState( () => {
            return{
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
        })
    }


    render() {
        return (
            <ProductContext.Provider value= { {
                ...this.state, 
                handleDetail: this.handleDetail,
                 addToCart: this.addToCart,
                 modal: this.modal,
                 closeModal: this.closeModal,
                 increment: this.increment,
                 decrement: this.decrement,
                 removeItem: this.removeItem,
                 clearCart: this.clearCart
            }}>
                    {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}