import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const AddTableOrder = () => {
  let restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

  const [allFoods, setAllFoods] = useState([]);

  const [tables, setTables] = useState([]);

  const [tableId, setTableId] = useState("");

  const [customerName, setCustomerName] = useState("");

  const [customerEmail, setCustomerEmail] = useState("");

  const [foods, setFoods] = useState([]);

  const [food, setFood] = useState({});
  const [quantity, setQuantity] = useState("");

  const handleUserSelectInput = (e) => {
    const selectedFoodId = e.target.value;
    const selectedFood = allFoods.find(
      (f) => f.id === parseInt(selectedFoodId, 10)
    );

    setFood({
      ...food,
      [e.target.name]: selectedFood,
    });
  };

  const [foodList, setFoodList] = useState([
    {
      foodId: "",
      quantity: "",
    },
  ]);

  let [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    setTotalBill(calculateTotalBill(foods));
  }, [foods]);

  useEffect(() => {
    const getAllTable = async () => {
      const allTables = await retrieveAllTable();
      if (allTables) {
        setTables(allTables.tables);
      }
    };

    const getAllFoods = async () => {
      const allFoods = await retrieveAllFoods();
      if (allFoods) {
        setAllFoods(allFoods.foods);
      }
    };

    getAllFoods();

    getAllTable();
  }, []);

  const calculateTotalBill = (foodArray) => {
    // Ensure foodArray is an array and not empty
    if (Array.isArray(foodArray) && foodArray.length > 0) {
      // Use reduce to calculate the total bill
      return foodArray.reduce((totalBill, item) => {
        // Extract quantity and food details
        const { quantity, food } = item;

        // Ensure quantity and food details are present and valid
        if (
          quantity &&
          food &&
          food.food &&
          !isNaN(quantity) &&
          !isNaN(food.food.price)
        ) {
          // Calculate item total and add to the total bill
          const itemTotal = quantity * food.food.price;
          return totalBill + itemTotal;
        }

        // Skip invalid items
        return totalBill;
      }, 0);
    }

    // Return 0 if foodArray is not valid
    return 0;
  };

  const retrieveAllTable = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/table/fetch/all?restaurantId=" + restaurant.id
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveAllFoods = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch/restaurant-wise?restaurantId=" +
        restaurant.id
    );
    return response.data;
  };

  

  const addFoodOrder = (e) => {
    e.preventDefault();

    if (food === null || quantity === "") {
      toast.error("Please select the Food with Quantity!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setFoods((prevFoods) => {
        const updatedFoods = [...prevFoods, { food, quantity }];

        return updatedFoods;
      });
    }
  };

  function transformToFoodList(inputArray) {
    return inputArray.map((item) => ({
      foodId: item.food.food.id,
      quantity: parseInt(item.quantity, 10) || 0, // Convert quantity to integer, default to 0 if not a valid number
    }));
  }

  const saveOrder = (e) => {
    e.preventDefault();

    if (!foods.length) {
      toast.error("Select the Foods to Order!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else if (tableId === "") {
      toast.error("Select the Table!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else {
      console.log(transformToFoodList(foods));

      fetch("http://localhost:8080/api/table/order/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + restaurant_jwtToken,
        },
        body: JSON.stringify({
          tableId: tableId,
          restaurantId: restaurant.id,
          foodList: transformToFoodList(foods),
          totalBill: totalBill,
          customerName: customerName,
          customerEmail: customerEmail,
        }),
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

              setTableId("");
              setFoods([]);
              setFoodList([]);
              setFood({});
              setCustomerEmail("");
              setCustomerName("");

              // setTimeout(() => {
              //   window.location.reload(true);
              // }, 1000); // Redirect after 3 seconds
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

              // setTimeout(() => {
              //   window.location.reload(true);
              // }, 1000); // Redirect after 3 seconds
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

              // setTimeout(() => {
              //   window.location.reload(true);
              // }, 1000); // Redirect after 3 seconds
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
    }
  };

  return (
    <div className="container-fluid mb-5">
      <div class="row">
        <div class="col-lg-3 mt-3">
          <div class="card food-card rounded-card h-100 shadow-lg text-center">
            <h5 className="card-title text-color-second">Customer Detail</h5>
            <div className="card-body ">
              <form>
                <div className=" mb-3">
                  <select
                    name="tableId"
                    onChange={(e) => setTableId(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Table</option>

                    {tables.map((table) => {
                      return <option value={table.id}> {table.name} </option>;
                    })}
                  </select>
                </div>

                <div className="mb-3 text-color">
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    name="customerName"
                    onChange={(e) => setCustomerName(e.target.value)}
                    value={customerName}
                    placeholder="Customer Name"
                  />
                </div>
                <div className="mb-3 text-color">
                  <input
                    type="email"
                    className="form-control"
                    id="customerEmail"
                    name="customerEmail"
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    value={customerEmail}
                    placeholder="Customer Email"
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn bg-color custom-bg-text"
                    onClick={saveOrder}
                  >
                    Order
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mt-4">
          <div class="card food-card rounded-card h-100 shadow-lg text-center">
            <h5 className="card-title text-color-second">Add Food</h5>
            <div className="card-body ">
              <form>
                <div className=" mb-3">
                  <select
                    name="food"
                    onChange={handleUserSelectInput}
                    className="form-control"
                  >
                    <option value="">Select Food</option>
                    {allFoods.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 text-color">
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={food.quantity}
                    placeholder="Quantity"
                  />
                </div>
                <div className="d-flex aligns-items-center justify-content-center">
                  <button
                    type="button"
                    className="btn bg-color custom-bg-text mb-2"
                    onClick={addFoodOrder}
                  >
                    Add Food
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mt-4">
          <div class="card food-card rounded-card h-100 shadow-lg text-center">
            <h5 className="card-title text-color-second">Ordered Food</h5>
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
                      <th scope="col">Food</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src={
                                "http://localhost:8080/api/food/" +
                                item.food.food.image1
                              }
                              class="img-fluid"
                              alt="food_pic"
                              style={{
                                maxWidth: "90px",
                              }}
                            />
                          </td>
                          <td>
                            <b>{item.food.food.name}</b>
                          </td>
                          <td>
                            <b>{item.quantity}</b>
                          </td>
                          <td>
                            <b>{item.food.food.price * item.quantity}</b>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="card-footer text-right text-color-second">
                  <h5>Total Bill: &#8377; {totalBill}/-</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTableOrder;
