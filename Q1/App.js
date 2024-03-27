import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={AllProducts} />
          <Route path="/product/:productId" component={ProductDetails} />
        </Switch>
      </div>
    </Router>
  );
}

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <a href={`/product/${product.productName}`}>{product.productName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetails({ match }) {
  const { productId } = match.params;

  

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      { }
    </div>
  );
}

export default App;
