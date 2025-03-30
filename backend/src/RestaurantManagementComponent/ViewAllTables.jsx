import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllTables = () => {
  const [tables, setTables] = useState([]);

  let restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllTable = async () => {
      const allTables = await retrieveAllTable();
      if (allTables) {
        setTables(allTables.tables);
      }
    };

    getAllTable();
  }, []);

  const retrieveAllTable = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/table/fetch/all?restaurantId=" + restaurant.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteTable = (tableId, e) => {
    fetch("http://localhost:8080/api/table/delete?tableId=" + tableId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + restaurant_jwtToken,
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const updateTable = (table) => {
    navigate("/restaurant/table/management", { state: { table } });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "20rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>All Restaurant Tables</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Table Id</th>
                  <th scope="col">Table Name</th>
                  <th scope="col">Total Seat</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table) => {
                  return (
                    <tr>
                      <td>
                        <b>{table.id}</b>
                      </td>
                      <td>
                        <b>{table.name}</b>
                      </td>
                      <td>
                        <b>{table.totalSeat}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => updateTable(table)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => deleteTable(table.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllTables;
