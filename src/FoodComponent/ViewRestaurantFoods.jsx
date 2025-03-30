import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewRestaurantFoods = () => {
  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  const [allFoods, setAllFoods] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllFoods = async () => {
      const allFoods = await retrieveAllFoods();
      if (allFoods) {
        setAllFoods(allFoods.foods);
      }
    };

    getAllFoods();
  }, []);

  const retrieveAllFoods = async () => {
    if (!restaurant) {
      toast.error("Restaurant not found. Please log in again.");
      return null;
    }
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch/restaurant-wise?restaurantId=" +
        restaurant.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteFood = (foodId, e) => {
    if (!restaurant) {
      toast.error("Restaurant not found. Please log in again.");
      return;
    }
    fetch(
      "http://localhost:8080/api/food/delete?foodId=" +
        foodId +
        "&restaurantId=" +
        restaurant.id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + restaurant_jwtToken,
        },
      }
    )
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
            }, 1000);
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
            }, 1000);
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
        }, 1000);
      });
  };

  const updateFood = (food) => {
    navigate("/restaurant/food/update", { state: food });
  };

  if (!restaurant) {
    toast.error("Restaurant not found. Please log in again.");
    return null;
  }

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{ height: "45rem" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>My Foods</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Food</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allFoods.map((food) => {
                  return (
                    <tr key={food.id}>
                      <td>
                        <img
                          src={"http://localhost:8080/api/food/" + food.image1}
                          className="img-fluid"
                          alt="food_pic"
                          style={{ maxWidth: "90px" }}
                        />
                      </td>
                      <td>
                        <b>{food.name}</b>
                      </td>
                      <td>
                        <b>{food.description}</b>
                      </td>
                      <td>
                        <b>{food.category ? food.category.name : "No Category"}</b>
                      </td>
                      <td>
                        <b>{food.price}</b>
                      </td>

                      <td>
                        <button
                          onClick={() => updateFood(food)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => deleteFood(food.id)}
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

export default ViewRestaurantFoods;
