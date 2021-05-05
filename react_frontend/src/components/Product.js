import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import {Link} from "react-router-dom";


function Product({ product }) {

  return (
    <div>
      
        <Card className="my-3 py-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} />
        </Link>
  
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        </Card.Body>
  
        <Card.Text as="div">
          <div className="pl-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} Review`}
              color={"gold"}
            />
          </div>
        </Card.Text>
  
        <Card.Text as="h4">
          <div className="pl-3">${product.price}</div>
        </Card.Text>
      </Card>
      
    </div>
  );
}

export default Product;
