import React, { useEffect, useState } from "react";
import { Form, Button, FloatingLabel, Spinner, Container } from "react-bootstrap";
import { base_url, end_point } from "../api/api_url";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const LogIn = () => {
    let api_url = base_url + end_point.userdetails;
    let [loginData, setLogindata] = useState({
        username: "",
        password: "",
        checkbox: false,
        error: {
            username: "",
            password: "",
            checkbox: "",
        },
    });
    let [getDatalogin, setGetdatalogin] = useState();
    let [logindataerror, setlogindataerror] = useState();
    let [loadingData, setLoadingdata] = useState(false)
    let redirectLocation = useNavigate()

    let getApi = () => {
        axios
            .get(api_url)
            .then((res) => {
                setGetdatalogin(res.data);
            })
            .catch((err) => {
                console.log(err.response.data, err.response.status);
            });
    };

    useEffect(() => {
        getApi();
    }, []);

    let changeHandler = (e) => {
        e.persist();
        let { name, value, checked } = e.target;
        let err = loginData.error;

        switch (name) {
            case "username":
                if (value.length < 1) {
                    err.username = "Data required";
                } else {
                    err.username = "";
                }
                break;
            case "password":
                if (value.length < 1) {
                    err.password = "Data required";
                } else {
                    err.password = "";
                }
                break;
            case "checkbox":
                if (!checked) {
                    err.checkbox = "You have to check ";
                } else {
                    err.checkbox = "";
                }
                break;

            default:
                break;
        }

        setLogindata({ ...loginData, [name]: value, checkbox: checked, error: err, });
    };
    //   console.log(loginData);

    let onsubmitHandler = (e) => {
        e.preventDefault();
        // console.log(val.user_username,val.user_Password);
        let findingData = getDatalogin?.find((val) => val.user_name?.toLowerCase() ==
            loginData.username.toLowerCase() && val.password == loginData.password)

        console.log("Matching data:", findingData);

        if (findingData) {

            setLoadingdata(true)
            setTimeout(() => {
                redirectLocation("/productPage", { state: { username: loginData.username } })
            }, 1000);

        } else {
            setlogindataerror("User Name or Password may not match");
        }
    };

    if (loadingData) {
        return (
            <>
                <Container className=" d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
                    <Spinner animation="grow" variant="info" />
                </Container>
            </>
        )
    }
    else {
        return (
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div style={{ width: "400px" }}>
                    <h3 className="">Sign In</h3>

                    <Form onSubmit={onsubmitHandler}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="User Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                onChange={changeHandler}
                                name="username"
                            />
                        </FloatingLabel>
                        {logindataerror && logindataerror.length > 1 ? (
                            <p className=" text-danger mt-3">{logindataerror}</p>
                        ) : null}

                        {loginData.error?.username && loginData.error?.username.length > 1 ? (
                            <p className="text-danger">{loginData.error?.username}</p>
                        ) : null}
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                onChange={changeHandler}
                                name="password"
                            />
                        </FloatingLabel>
                        {loginData.error?.password && loginData.error?.password.length > 1 ? (
                            <p className="text-danger mt-2">{loginData.error?.password}</p>
                        ) : null}
                        <Form.Check
                            type="checkbox"
                            id=""
                            label="Confirm it"
                            className="mt-2"
                            onChange={changeHandler}
                            name="checkbox"
                        />
                        {loginData.error?.checkbox && loginData.error?.checkbox.length > 1 ? (
                            <p className="text-danger mt-2">{loginData.error?.checkbox}</p>
                        ) : null}

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-5"
                            disabled={!loginData.username || !loginData.password || loginData.checkbox == false
                            }
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
};

export default LogIn