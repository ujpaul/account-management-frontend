import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import logo from "../../assets/img/notfound.jpg";
const NotFound = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div
        className='card mt-3 mb-2'
        style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",width: 500 }}
      >
        <div className='d-flex justify-content-center'>
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/notfound.jpg`}
            alt='logo'
            width={200}
          />{" "}
        </div>
        <div className='d-flex justify-content-center'>
          <h4 style={{ color: "#8f69b8" }}>Opps</h4>
        </div>
        <h6 className='ml-5' style={{ color: "#8f69b8",fontWeight: 700 }}>
          Seems like we cannot find what you're looking for!!
        </h6>
        <div className='d-flex justify-content-center mb-3'>
          <Link to='/'>
            <Button
              style={{
                borderRadius: 25,
                border: "1px #8f69b8 solid",
                backgroundColor: "#8f69b8",
              }}
              onClick={()=>{
                localStorage.removeItem("user");
                localStorage.removeItem("acces_token");
              }}
            >
              Go To Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound