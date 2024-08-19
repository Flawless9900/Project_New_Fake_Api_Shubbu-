import React, { useEffect, useState } from "react";
import { end_point, product_url } from "../api/api_url";
import axios from "axios";
import { Container, Row, Col, Card, Form, Navbar, Button, Spinner, } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
const ProductPage = () => {

  let api_url = product_url + end_point.product;
  let [productItems, setProductitems] = useState();
  let [loadingData, setLoadingdata] = useState(true);
  let [searchData, setSearchdata] = useState();
  let [forFilter, setForfilter] = useState()
  let getNavi = useLocation();
  let loggedUsername = getNavi.state?.username;
  console.log(forFilter);

  let getApi = () => {
    axios
      .get(api_url)
      .then((res) => {
        setLoadingdata(false);
        setProductitems(res.data.products);
        setForfilter(res.data.products)
      })
      .catch((err) => {
        setLoadingdata(false);
        console.log(err.status);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  let onSubmitHandeler = (e) => {
    e.preventDefault()
    let filteredData = productItems?.filter((value) => {
      return value.title.toLowerCase() === searchData.toLowerCase()
    })
    setForfilter(filteredData)
  }

  if (loadingData) {
    return (
      <>
        <Container className=" d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
          <Spinner animation="grow" variant="info" />
        </Container>
      </>
    );
  } else {

    return (
      <>
        <Navbar className="bg-body-tertiary justify-content-between ">
          <Form inline style={{ marginLeft: "20px" }} onSubmit={onSubmitHandeler}>
            <Row>
              <Col xs="auto">
                <Form.Control type="text" placeholder="Search" className=" mr-sm-2" onChange={(e) => {
                  setSearchdata(e.target.value.toLowerCase());
                }}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
          <Navbar.Collapse className="justify-content-end" style={{ marginRight: "35px" }}>
            <Navbar.Text>
              Signed in as:{" "}
              <span className="text-success text-size-lg" style={{ fontSize: "18px" }}>
                {loggedUsername}
              </span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        <Container>
          <Row>
            {forFilter?.map((Value) => (
              <Col key={Value.id} md={4} lg={3} className="mt-4 mb-4" style={{ display: "flex", flexWrap: "wrap" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img loading="lazy" variant="top" src={Value.thumbnail} className="d-block w-100" />
                  <Card.Body>
                    <Card.Title>{Value.title}</Card.Title>
                    <Card.Text>
                      <p>{Value.description}</p>
                      <p>Category : {Value.category}</p>
                      <h5 className="text-success">${Value.price}</h5>
                      <p>Rating : {Value.rating}</p>
                      <p>Brand : {Value.brand}</p>
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Card.Link as={Link} to={""} className="btn btn-warning">
                      Buy Now
                    </Card.Link>
                    <Card.Link as={Link} to={""} className="btn btn-warning">
                      Add to cart
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default ProductPage