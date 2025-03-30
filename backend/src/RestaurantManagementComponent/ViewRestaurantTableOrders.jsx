import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewRestaurantTableOrders = () => {
  const [tableOrders, setTableOrders] = useState([]);
  const [tableOrder, setTableOrder] = useState({
    table: {
      name: "",
    },
    orderFoods: [
      {
        quantity: 0,
        food: {
          name: "",
          image1: "",
        },
      },
    ],
  });

  let restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getAllTableOrders = async () => {
      const orders = await retrieveAllTableOrders();
      if (orders) {
        setTableOrders(orders.tableOrders);
      }
    };

    getAllTableOrders();
  }, []);

  const retrieveAllTableOrders = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/table/order/fetch/restaurant-wise?restaurantId=" +
        restaurant.id
    );
    console.log(response.data);
    return response.data;
  };

  const viewOrder = (order, e) => {
    setTableOrder(order);
    handleShow();
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
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
            height: "60px",
          }}
        >
          <h2>Restaurant Table Orders</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive mt-3">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Table Name</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">Bill Date</th>
                  <th scope="col">Bill Amount (&#8377;)</th>
                  <th scope="col">View Bills</th>
                </tr>
              </thead>
              <tbody>
                {tableOrders.map((order) => {
                  return (
                    <tr>
                      <td>
                        <b>{order.orderId}</b>
                      </td>
                      <td>
                        <b>{order.table.name}</b>
                      </td>
                      <td>
                        <b>{order.customerName}</b>
                      </td>
                      <td>
                        <b>{order.customerEmail}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(order.billingDateTime)}</b>
                      </td>
                      <td>
                        <b>{order.billAmount}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => viewOrder(order)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          View Bill
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

      <Modal show={showModal} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Restaurant Table Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <span className="text-color-second">
                <b>Order Id:</b>
              </span>{" "}
              {tableOrder.orderId}
            </div>
            <div className="col">
              <span className="text-color-second">
                <b>Table:</b>
              </span>{" "}
              {tableOrder.table.name}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col">
              <span className="text-color-second">
                <b>Customer Name:</b>
              </span>{" "}
              {tableOrder.customerName}
            </div>
            <div className="col">
              <span className="text-color-second">
                <b>Customer Email:</b>
              </span>{" "}
              {tableOrder.customerEmail}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <span className="text-color-second">
                <b>Bill Amount:</b>
              </span>{" "}
              {formatDateFromEpoch(tableOrder.billingDateTime)}
            </div>
            <div className="col">
              <span className="text-color-second">
                <b>Bill Amount:</b>
              </span>{" "}
              &#8377;{tableOrder.billAmount}
            </div>
          </div>

          <div className="text-center text-color-second mt-3">
            <h5>Ordered Foods</h5>
          </div>

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
                {tableOrder.orderFoods.map((item) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/food/" + item.food.image1
                          }
                          class="img-fluid"
                          alt="food_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{item.food.name}</b>
                      </td>
                      <td>
                        <b>{item.quantity}</b>
                      </td>
                      <td>
                        <b>{item.food.price * item.quantity}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewRestaurantTableOrders;
