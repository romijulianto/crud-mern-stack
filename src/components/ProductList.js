/* eslint-disable-next-line */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // import link to update product

const ProductList = () => {
  const [products, setProduct] = useState([]);

  /* callback funstion setProduct to useEffect */
  useEffect(() => {
    getProduct();
  }, []); // empty array to running useEffect on mounted

  /* get data product from backend */
  const getProduct = async () => {
    const response = await axios.get("http://localhost:4000/products");
    // response to store State
    setProduct(response.data);
  }

  /* delete data product from backend */
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <Link to="/add" className="button is-success">Add New</Link>
      <div className="columns is-multiline mt-2">
        {products.map((product) => (
                <div className="coloums is-one-quarter" key={product.id}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={product.url} alt="Placeholder" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{product.name}</p>
                          <p className="subtitle is-6">@romijulianto</p>
                        </div>
                      </div>
                    </div>
                    <footer className="card-footer">
                          <Link to={`edit/${product.id}`} className="card-footer-item">Edit</Link>
                          <a onClick={() => deleteProduct(product.id)} className="card-footer-item">Delete</a>
                    </footer>
                  </div>
              </div>
        ))}
          </div>
    </div>
  )
}

export default ProductList