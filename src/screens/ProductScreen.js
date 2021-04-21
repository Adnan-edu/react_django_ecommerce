import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from '../actions/productActions'

function ProductScreen({ match }) {

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {

      dispatch(listProductDetails(match.params.id))

  }, [dispatch, match] ) 

  let stockStatus = false;

  if (product.countInStock > 0) {
    stockStatus = true;
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
       {loading ?
        <Loader/>
        : error
        ? <Message variant='danger'>{error}</Message>
        : (
          <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
                className="ml-2"
                color="gold"
              />
            </ListGroupItem>

            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col className="ml-2">Price: ${product.price}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col className="ml-2">
                    <strong>
                      {stockStatus == true ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className="btn-block"
                  disabled={stockStatus == false}
                  type="button"
                  size="lg"
                  variant="dark"
                >
                  Add to Crate
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
        )
       }
    </div>
  );
}

export default ProductScreen;
