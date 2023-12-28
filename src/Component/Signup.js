import {useState,useRef} from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {toastError, toastSuccess} from "../utils/toastrResponse";

const Signup = ({show,onHide}) => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [gender,setGender] = useState("")
    const [age,setAge] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [maritalStatus,setMaritalStatus] = useState("")
    const [nationality, setNationality] = useState("");
    const [file, setFile] = useState("");
    const [document, setDocument] = useState("");
    const formRef = useRef(null);
    const onSubmitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("maritalStatus", maritalStatus);
      formData.append("nationality", nationality);
      formData.append("file", file);
      formData.append("document", document);
      fetch("http://localhost:9000/api/v1/users/signup", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            toastSuccess("Account created successfully, you can login");
              formRef.current.reset();
              onHide();
          } else {
            toastError("Could not create Agent");
          }
          return res.json();
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };
  return (
    <div>
      <Modal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
      >
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <label className='ml-2 mt-2'>First name</label>
            <input
              className='form-control'
              placeholder='Your firstname'
              name='firstName'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className='ml-2 mt-2'>First name</label>
            <input
              className='form-control'
              placeholder='Your lastname'
              name='lastName'
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className='ml-2 mt-2'>Date of birth</label>
            <div style={{ width: "100%" }}>
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat='dd/MM/yyyy'
                showFullMonthYearPicker
                showMonthDropdown
                name='paymentDate'
                className='custom-datepicker form-control'
              />
            </div>
            <label className='ml-2 mt-2'>Username</label>
            <input
              type='text'
              className='form-control'
              placeholder='Your username'
              name='userName'
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <label className='ml-2 mt-2'>Email</label>
            <input
              type='email'
              className='form-control'
              placeholder='Your email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className='ml-2 mt-2'>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className='ml-2 mt-2'>Gender</label>
            <select
              className='form-control mt-2'
              name='gender'
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value=''>select gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <label className='ml-2 mt-2'>Age</label>
            <input
              type='number'
              className='form-control'
              placeholder='Enter your age'
              name='age'
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <label className='ml-2 mt-2'>Marital status</label>
            <select
              className='form-control mt-2'
              name='maritalStatus'
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
            >
              <option value=''>select status</option>
              <option>SINGLE</option>
              <option>MARRIED</option>
              <option>DIVORCED</option>
              <option>WIDOWED</option>
            </select>
            <label className='ml-2 mt-2'>Nationality</label>
            <input
              type='text'
              className='form-control'
              placeholder='Your nationality'
              name='nationality'
              onChange={(e) => setNationality(e.target.value)}
              required
            />
            <label className='ml-2 mt-2'>Profile Picture</label>
            <input
              type='file'
              className='form-control'
              placeholder='Type amount'
              name='gender'
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <label className='ml-2 mt-2'>National Id/Passport</label>
            <input
              type='file'
              className='form-control'
              placeholder='Type amount'
              name='gender'
              onChange={(e) => setDocument(e.target.files[0])}
              required
            />
            <div className='d-flex justify-content-center'>
              <Button className='custom-btn-color' type='submit'>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Signup