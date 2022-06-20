import React, { useState } from "react";
import axios from "axios";
import './form.css'
import validator from "validator";
export default function Form() {
  const [email, setEmail] = useState("");
  const [id , setId] = useState("");
  const [emailError , setEmailError] = useState(false);
  const [emailHide, setEmailHide] = useState(true);
  const [pass, setPass] = useState("");
  const [emailshow, setEmailShow] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const getEmail = (event) => {
    setEmail(event.target.value);
  };
  const getPassword = (event) => {
    setPass(event.target.value);
  };
  const getNUmber = (event) => {
    setNumber(event.target.value);
  };

  const getValue = () => {
    setEmailHide(false);
  };
  // axios section
  const getAllData = () => {
    axios.get(`http://localhost:3000/getit/${number}`).then((response) => {
      console.log(response.data);
      setEmailShow(response.data.email);
      setPassword(response.data.password);
      setId(response.data.id);
    });
  };
  const data = {
    email: email,
    password: pass,
  };
  // axios section post
  const postdata = () => {
    if(validator.isEmail(email) === true){
      axios.post("http://localhost:3000/getit", data).then((response) => {
      console.log("data updated");
      setEmailError(false)
    });
    } else {
      setEmailError(true);
    }
    
  };

  // axios delete
  const deleteData = () => {
    axios
      .delete(`http://localhost:3000/getit/${number}`)
      .then((res) => console.log("data deleted"));
  };

  // axio s update
  const UpdateData = () => {
    axios
      .patch(`http://localhost:3000/getit/${number}`, data)
      .then((res) => console.log("data updated"));
  };

  return (
    <div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={getEmail}
        /> {
          emailError ? <p style= {{color : "red"}}>Email Is Not Valid</p> : null
        }
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          onChange={getPassword}
        />

        <label for="exampleInputPassword1" class="form-label">
          Number
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Number RUD"
          aria-label="Enter Number RUD"
          aria-describedby="button-addon2"
          onChange={getNUmber}
        />
      </div>
      
      <button type="submit" class="btn btn-primary" onClick={postdata}>
        Submit
      </button>
      <button type="submit" class="btn btn-primary" onClick={UpdateData}>
        update
      </button>
      <button type="submit" class="btn btn-primary" onClick={deleteData}>
        Delete{" "}
      </button>
      <button type="submit" class="btn btn-primary" onClick={getAllData}>
        get data{" "}
      </button>

      {/* {emailHide ? null : (
        <div class="card">
          <div class="card-header">{email}</div>
          <div class="card-body">
            <p class="card-text">{pass}</p>
          </div>
        </div>
        
      )} */}

      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{id}</th>
            <td>{emailshow}</td>
            <td>{password}</td>
          </tr>
        </tbody>
      </table>

     
    </div>
  );
}
