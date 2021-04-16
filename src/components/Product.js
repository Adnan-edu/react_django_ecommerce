import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 py-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </a>

      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
      </Card.Body>

      <Card.Text as="div">
        <div className="pl-3">
          <Rating
            value={product.rating}
            text={`${product.numReviews} Review`}
            color={"#f8e825"}
          />
        </div>
      </Card.Text>

      <Card.Text as="h4">
        <div className="pl-3">${product.price}</div>
      </Card.Text>
    </Card>
  );
}

export default Product;
