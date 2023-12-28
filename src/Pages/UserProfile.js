import {useState} from 'react'
import { useFetchData } from '../hooks/useFetchData'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../utils/apiActions/dashboardApi'
import moment from 'moment'
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from 'react-bootstrap'
import { toastError, toastSuccess } from '../utils/toastrResponse'
const UserProfile = () => {
  const[showAlert, setShowAlert] = useState(false);
  const [showAlertRejection, setShowAlertRejection] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
    const baseUrlImage = "http://localhost:9000/uploads";
    const url = `users/${userId}`
  const { data, } = useFetchData(["fetch-user", userId], url);
  // Verify user
  const verifyUser = () => {
    fetch(`${baseUrl}/users/verifyUser/${data?.userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          toastSuccess("User verified successfully");
          setShowAlert(false);
          navigate("/loggedin/users");
        } else {
          toastError("Could not verify user");
        }
        return res.json();
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
   const rejectVerification = () => {
     fetch(`${baseUrl}/users/rejectVerification/${data?.userId}`, {
       method: "PUT",
       headers: {
         Authorization: `Bearer ${user?.access_token}`,
       },
     })
       .then((res) => {
         if (res.ok) {
           toastSuccess("User rejected successfully");
           setShowAlertRejection(false);
           navigate("/loggedin/users");
         } else {
           toastError("Could not reject user");
         }
         return res.json();
       })
       .then((res) => {})
       .catch((err) => {
         console.log(err);
       });
   };
  return (
    <div className='d-flex justify-content-center'>
      <div className='card mt-3 p-3' style={{ width: "50%" }}>
        <div className='d-flex' style={{ gap: 50 }}>
          <div style={{ width: "35%", height: "35%" }}>
            <img
              src={`${baseUrlImage}/${data?.profilePhoto}`}
              alt='profile'
              className='img-fluid rounded-circle'
            />
          </div>
          <div>
            <div className='d-flex justify-content-between'>
              <h5>First name:</h5>
              <p className='ml-2' style={{ color: "#081528", fontSize: 18 }}>
                {data?.firstName}
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <h5>Last name:</h5>
              <p className='ml-2' style={{ color: "#081528", fontSize: 18 }}>
                {data?.lastName}
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <h5>Gender:</h5>
              <p className='ml-2' style={{ color: "#081528", fontSize: 18 }}>
                {data?.gender}
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <h5>Marital status:</h5>
              <p className='ml-2' style={{ color: "#081528", fontSize: 18 }}>
                {data?.maritalStatus}
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <h5>Nationality:</h5>
              <p className='ml-2' style={{ color: "#081528", fontSize: 18 }}>
                {data?.nationality}
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <h5>Document:</h5>
              <p className='ml-2' style={{ color: "#081528", fontSize: 18 }}>
                <Link to={`${baseUrlImage}/${data?.document}`} target='_blank'>
                  {data?.document}
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className='d-flex mt-3 justify-content-center'>
          <Button variant='success' onClick={() => setShowAlert(true)}>
            Verify
          </Button>
          <Button
            className='ml-2'
            variant='danger'
            onClick={() => setShowAlertRejection(true)}
          >
            Reject
          </Button>
        </div>
      </div>
      <SweetAlert
        title='Are you sure?'
        onConfirm={verifyUser}
        onCancel={() => setShowAlert(false)}
        show={showAlert}
        showConfirm={true}
        showCancel={true}
        type='warning'
        cancelBtnBsStyle='primary'
        confirmBtnBsStyle='success'
        cancelBtnText='No'
        confirmBtnText='Yes'
      />
      <SweetAlert
        title='Are you sure to reject this user?'
        onConfirm={rejectVerification}
        onCancel={() => setShowAlertRejection(false)}
        show={showAlertRejection}
        showConfirm={true}
        showCancel={true}
        type='warning'
        cancelBtnBsStyle='primary'
        confirmBtnBsStyle='success'
        cancelBtnText='No'
        confirmBtnText='Yes'
      />
    </div>
  );
}

export default UserProfile