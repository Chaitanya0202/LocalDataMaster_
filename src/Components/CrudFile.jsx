import React, { useState, useEffect } from "react";

import { useGlobelContext } from "./Context/UserContext";
import axios from "axios";

const CrudFile = () => {

    const {formData,setFormData,showData,deleteData,saveData,peopleList,isOnline,setIsOnline,setPeopleList,BASE_URL}=useGlobelContext();

  useEffect(() => {
    showData(); // Call showData when the component mounts
  }, []);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const dataStoreDB = async (index) => {
    const localData = JSON.parse(localStorage.getItem("peopleList")) || [];
  
    if (index >= 0 && index < localData.length) {
      const selectedData = localData[index];

      await axios.post(`${BASE_URL}saveUser`, selectedData);
      deleteData(index);
      alert("Your Data Saved");
      console.log("Data to be sent to the database:", selectedData);
    } else {
        
      console.log("Invalid index or no data found at the specified index.");
    }
  };

  return (
    <div className="container">
      <h2>Crud Application</h2>

      <div>
        {isOnline ? (
          <p>You are currently online.</p>
        ) : (
          <p>
            You are currently offline. Please check your internet connection.
          </p>
        )}
      </div>
      <div class="container">
        <div className="row">
          <div className="form-group col-md mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter Name :"
              
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              placeholder="Enter Email :"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="address">Address :</label>
            <input
              type="text"
              name="address"
              className="form-control"
              id="address"
              placeholder="Enter Address :"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="phone">Phone No :</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              id="phone"
              placeholder="Enter Phone No :"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="password">Password :</label>
            <input
              type="text"
              name="password"
              className="form-control"
              id="password"
              placeholder="Enter Password :"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="col-lg-12 mt-5">
            <button
              className="btn btn-success"
              id="submit"
              onClick={saveData}
              style={{ margin: "10px" }}
            >
              Save
            </button>
          </div>
        </div>

        <hr />

        <table className="table table-bordered" id="crudTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.address}</td>
                <td>{person.phone}</td>
                <td>{person.password}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteData(index)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning m-2">Edit</button>
                  {isOnline && (
                    <button className="btn btn-outline-success" onClick={()=>dataStoreDB(index)}>Sync</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudFile;
