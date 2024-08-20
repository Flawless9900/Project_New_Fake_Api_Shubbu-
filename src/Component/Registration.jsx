import React, { useState, useEffect } from 'react'
import { Container, Spinner, Button, Form } from 'react-bootstrap'
import { base_url, end_point } from '../api/api_url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const api_url = base_url + end_point.userdetails;
    let [inputData, setinputData] = useState({
        user: "",
        mail: "",
        passcode: "",
        error: { user: "", mail: "", passcode: "" },
    });

    let [getdata, setgetdata] = useState();
    let [errordata, setErrordata] = useState();
    let [loadingData, setLoadingdata] = useState(false)

    let redirectPath = useNavigate()

    let getApi = () => {
        axios
            .get(api_url)
            .then((res) => {
                setgetdata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getApi();
    }, []);

    const changeHandler = (event) => {
        // event.persist();
        let { value, name } = event.target;
        // console.log(value,name);
        let err = inputData.error;


        switch (name) {
            case "user":
                if (value.length < 1) {
                    err.user = "Text Required";
                } else {
                    err.user = "";
                }
                break;
            case "mail":
                if (value.length < 1) {
                    err.mail = "Text Required";
                } else {
                    err.mail = "";
                }
                break;
            case "passcode":
                if (value.length < 1) {
                    err.passcode = "Text Required";
                } else {
                    err.passcode = "";
                }
                break;

            default:
                break;
        }

        setinputData({ ...inputData, [name]: value, error: err });
    };
    console.log(getdata);

    const handleSubmit = (event) => {
        event.preventDefault();

        let findData = getdata?.find((val) =>
            val.user_name.toLowerCase() ===
            inputData.user.toLowerCase()
        );
        console.log("Data Existing", findData);

        if (findData) {
            setErrordata("Existing user name can't be use");
        } else {
            let userdata = {
                user_name: inputData.user,
                email: inputData.mail,
                password: inputData.passcode
            };

            axios
                .post(api_url, userdata)
                .then((res) => {
                    // console.log("response", res);
                    alert("Your data is submitted successfully")
                    setLoadingdata(true)
                    setTimeout(() => {
                        redirectPath("/LogIn")
                    }, 1000);
                })
                .catch((err) => {
                    // console.log("error", err);
                    alert("Data not submitted")
                });
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
            <>
                <Container>
                    <h3 className="text-center">Sign Up</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter you user name"
                                name="user"
                                onChange={changeHandler}
                            />
                            {
                            inputData.error?.user &&
                                inputData.error?.user.length > 1 ? (
                                <p className="mt-2 text-danger">
                                    {inputData.error?.user}
                                </p>
                            ) : null
                            }

                            {errordata && errordata.length > 1 ? <p className="text-danger mt-2">{errordata}</p> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="mail"
                                onChange={changeHandler}
                            />
                            {inputData.error?.mail &&
                                inputData.error?.mail.length > 1 ? (
                                <p className="mt-2 text-danger">
                                    {inputData.error?.mail}
                                </p>
                            ) : null}
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="passcode"
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        {inputData.error?.passcode &&
                            inputData.error?.passcode.length > 1 ? (
                            <p className="mt-2 text-danger">
                                {inputData.error?.passcode}
                            </p>
                        ) : null}

                        <Button variant="primary" type="submit"
                            disabled={!inputData.user || !inputData.passcode || !inputData.mail}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </>
        )
    }
}
export default Registration