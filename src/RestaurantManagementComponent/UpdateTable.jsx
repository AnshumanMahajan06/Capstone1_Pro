import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateTable = (props) => {
  let navigate = useNavigate();
  let restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  var initialRequest = {
    restaurantId: restaurant.id,
  };

  console.log("table to update");
  console.log(props.table);
  console.log("clsoe");

  const [addTableRequest, setAddTableRequest] = useState(props.table.table);

  console.log("printing addTableRequest");
  console.log(addTableRequest);
  console.log("clsoe");

  const handleUserInput = (e) => {
    setAddTableRequest({ ...addTableRequest, [e.target.name]: e.target.value });
  };

  const saveTable = (e) => {
    e.preventDefault();

    console.log(addTableRequest);

    fetch("http://localhost:8080/api/table/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + restaurant_jwtToken,
      },
      body: JSON.stringify(addTableRequest),
    })
      .then((result) => {
        console.log("result", result);
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
          } else {
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
      });
  };

  return (
    <div>
      <div className="mt-5 d-flex aligns-items-center justify-content-center">
        <div className="form-card border-color mb-2" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h4 className="card-title">Update Restaurant Table</h4>
            </div>
            <div className="card-body mt-3">
              <form>
                <div className="mb-3 text-color">
                  <label for="name" className="form-label">
                    <b>Table Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleUserInput}
                    value={addTableRequest.name}
                  />
                </div>
                <div className="mb-3 text-color">
                  <label for="name" className="form-label">
                    <b>Total Seat</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalSeat"
                    name="totalSeat"
                    onChange={handleUserInput}
                    value={addTableRequest.totalSeat}
                  />
                </div>
                <div className="d-flex aligns-items-center justify-content-center">
                  <button
                    type="button"
                    className="btn bg-color custom-bg-text mb-2"
                    onClick={saveTable}
                  >
                    Update Table
                  </button>
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTable;
