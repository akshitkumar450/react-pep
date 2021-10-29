import React from "react";
import styles from "./Products.module.css";
import { connect } from "react-redux";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <div className={styles.products}>
      {
        products.map((product) => {
          // console.log(product);
          return (
            <Product key={product.id} product={product} />
          )
        })
      }
    </div>
  );
};

//fetching the products state from redux store
const mapStateToProps = (state) => {
  return {
    products: state.cart.products
  }
}

export default connect(mapStateToProps)(Products)