import React from 'react';

import './ProductItem.css';
import Button from '../Button/Button';
import { deleteProduct } from '../../Api/products';

const ProductItem = props => {

  const deleteProductFun = async () => {
    const response = await deleteProduct(props.id)
    props.onChange()
    console.log(response, " eliminado")
  }

  console.log(props.id)

  return (
    <li className="product-item">
      <div>
        <h2>{props.name}</h2>
        <p>Price: ${props.price}</p>
      </div>
      <div>
        <Button>UPDATE</Button>
        <Button onClick={() => deleteProductFun()} >DELETE</Button>
      </div>
    </li>
  );
};

export default ProductItem;
