import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import NewProduct from './components/Products/NewProduct';
import ProductList from './components/Products/ProductList';
import Login from './components/Login/Login';
import { fecthProducts } from './Api/products';
import './App.css';

function RequireAuth(Component) {
  return function () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const isAuth = () => {
      const authInfo = localStorage.getItem('acces_token')
      if (authInfo) {
        setIsAuthenticated(true)
      }
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      isAuth()
    }, [])
    return isAuthenticated ? <Component /> : <Login onCompleteLogin={isAuth}/>
  }
}

function App() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reloading, setReloading] = useState(false);

  const getAllProducts = async () => {
    const response = await fecthProducts();

    if(response.status === 200){
      const responseData = response.data;
      console.log(responseData)
      setLoadedProducts(responseData.products);
    } else if( response.status === 401 ){
      if(response.error || response.data.error ){
        localStorage.clear();
        window.location.reload(true);
      } else {
        console.log('PASA POR ACAA........', response.data, 'status', response.status);
        localStorage.setItem('acces_token', response.data.data.access_token);
        localStorage.setItem('refresh_token', response.data.data.refresh_token);
        setReloading(true);
      }
    } else {
      console.log("error ", response);
    }
    
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await getAllProducts()
      setIsLoading(false);
    };

    fetchProducts();
  }, [reloading]);

  const addProductHandler = async (productName, productPrice) => {
    try {
      const newProduct = {
        title: productName,
        price: +productPrice // "+" to convert string to number
      };
      let hasError = false;
      const response = await fetch('http://localhost:8083/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      console.log(responseData.product)

      setLoadedProducts(prevProducts => {
        return prevProducts.concat({
          ...newProduct,
          id: responseData.product._id
        });
      });
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  const onChange = async () => {
    await getAllProducts()
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <NewProduct onAddProduct={addProductHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <ProductList items={loadedProducts} onChange={onChange} />}
      </main>
    </React.Fragment>
  );
}



export default RequireAuth(App);
