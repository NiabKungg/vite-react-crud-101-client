import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://127.0.0.1:5173/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployees = (event) => {
    event.preventDefault();
    Axios.post("http://127.0.0.1:5173/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    })
      .then((response) => {
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      })
      .catch((error) => {
        console.error("There was an error adding the employee!", error);
      });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://127.0.0.1:5173/update", { wage: newWage, id: id })
      .then((response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      })
      .catch((error) => {
        console.error("There was an error updating the wage!", error);
      });
  };

  const deleteEmployeeWage = (id) => {
    Axios.delete(`http://127.0.0.1:5173/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      )
    })
  }

  return (
    <>
      <div className="container">
        <h1>Employee Information</h1>
        <div className="information">
          <form onSubmit={addEmployees}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age:
              </label>
              <input
                type="number"
                id="age"
                className="form-control"
                placeholder="Enter age"
                onChange={(event) => setAge(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country:
              </label>
              <input
                type="text"
                id="country"
                className="form-control"
                placeholder="Enter country"
                onChange={(event) => setCountry(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Position:
              </label>
              <input
                type="text"
                id="position"
                className="form-control"
                placeholder="Enter position"
                onChange={(event) => setPosition(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="wage" className="form-label">
                Wage:
              </label>
              <input
                type="number"
                id="wage"
                className="form-control"
                placeholder="Enter wage"
                onChange={(event) => setWage(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={addEmployees}
            >
              Add Employee
            </button>
          </form>
        </div>
        <hr />
        <div className="employees">
          <button className="btn btn-primary" onClick={getEmployees}>
            Show Employees
          </button>
          <br />
          <br />
          {employeeList.map((val, key) => (
            <div className="employee card" key={key}>
              <p className="card-text">Name: {val.name}</p>
              <p className="card-text">Age: {val.age}</p>
              <p className="card-text">Country: {val.country}</p>
              <p className="card-text">Position: {val.position}</p>
              <p className="card-text">Wage: {val.wage}</p>
              <div className="d-flex">
                <input
                  type="number"
                  placeholder="15000..."
                  className="form-control"
                  style={{ width: "300px" }}
                  onChange={(event) => setNewWage(event.target.value)}
                />
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteEmployeeWage(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
