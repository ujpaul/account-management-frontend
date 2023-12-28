import React, { useState,useEffect } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myApi from "../utils/apiActions/myApi";
import { baseUrl } from "../utils/apiActions/dashboardApi";
import toastr from "toastr";
import Signup from "./Signup";

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState(true);
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false)
  const [show,setShow] = useState(false)
  const handleHideModal = () => setShow(false)
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("acces_token");
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    myApi
      .post(`${baseUrl}/users/login`, {
        username: form.elements.email.value,
        password: form.elements.password.value,
      })
      .then((res) => {
        const user = {
          access_token: res.data.token,
          name: `${res.data.firstName} ${res.data.lastName}`,
          username: res.data.username,
          profilePhoto: res.data.profilePhoto,
        };
        localStorage.setItem("user", JSON.stringify(user));
        toastSuccess();
        navigate("/loggedin/users");
      })
      .catch((err) => {
        toastError();
      });

    setValidated(true);
  };
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-left",
    preventDuplicates: false,
    onclick: undefined,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  const toastSuccess = () => {
    toastr.remove();
    toastr.options.positionClass = "toast-bottom-left";
    toastr.success("Login Successful");
  };
  const toastError = () => {
    toastr.remove();
    toastr.options.positionClass = "toast-bottom-left";
    toastr.error("Invalid username or password");
  };

  return (
    <div className='col-xl-12 col-md-12 login-Wrap'>
      <div className='ms-panel ms-panel-fh'>
        <div className='ms-panel-header'>
          <h6>{resetPassword ? "Reset Password" : "Login"}</h6>
        </div>
        <div className='ms-panel-body'>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md='12' className='mb-3' controlId='email'>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <Form.Control required type='text' placeholder='Username' />
                  <Form.Control.Feedback type='invalid'>
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md='12'
                className='mb-2'
                controlId='password'
              >
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <div style={{ width: "100%", position: "relative" }}>
                    <Form.Control
                      required
                      type={type ? "password" : "text"}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {password.length > 0 && (
                      <i
                        className='fa fa-eye'
                        aria-hidden='true'
                        style={{
                          position: "absolute",
                          right: 15,
                          bottom: 8,
                          cursor: "pointer",
                          fontSize: 20,
                          color: "#0000ff",
                        }}
                        onClick={() => setType(!type)}
                      />
                    )}
                  </div>
                  <Form.Control.Feedback type='invalid'>
                    Please provide a password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <div className='d-flex justify-content-end'>
              <u style={{ color: "#357ffa" }}>
                <p
                  style={{ cursor: "pointer", color: "#357ffa" }}
                  onClick={() => setShow(true)}
                >
                  No account yet? Sign up here.{" "}
                </p>
              </u>
            </div>
            <Button
              type='submit'
              className='mt-4 d-block w-100 custom-btn-color'
            >
              Sign In
            </Button>
          </Form>
        </div>
      </div>
      <Signup show={show} onHide={()=> setShow(false)} />
    </div>
  );
}

export default Login;
