import { useState, useEffect } from "react";
import table from "../images/table.png";

import addTableOrder from "../images/addTableOrder.png";
import allTableOrders from "../images/allTableOrders.png";
import viewTables from "../images/viewTables.png";
import AddTable from "./AddTable";
import ViewAllTables from "./ViewAllTables";
import { useLocation } from "react-router-dom";
import UpdateTable from "./UpdateTable";
import AddTableOrder from "./AddTableOrder";
import ViewRestaurantTableOrders from "./ViewRestaurantTableOrders";

const RestaurantManagementComponent = () => {
  const [showAddTable, setShowAddTable] = useState(true);
  const [showUpdateTable, setShowUpdateTable] = useState(false);
  const [showTables, setShowTables] = useState(false);
  const [showTableOrders, setShowTableOrders] = useState(false);
  const [showAddTableOrder, setShowAddTableOrder] = useState(false);

  const location = useLocation();
  const tableToUpdate = location.state;

  console.log(tableToUpdate);

  useEffect(() => {
    if (tableToUpdate) {
      setShowUpdateTable(true);
      setShowAddTable(false);
      setShowTables(false);
      setShowTableOrders(false);
      setShowAddTableOrder(false);
    } else {
      setShowUpdateTable(false);
      setShowAddTable(true);
      setShowTables(false);
      setShowTableOrders(false);
      setShowAddTableOrder(false);
    }
  }, [tableToUpdate]);

  return (
    <div className="container-fluid mb-5">
      <div class="row justify-content-center text-center">
        <div class="col-lg-3 mt-2">
          <div
            class="card food-card rounded-card h-100 shadow-lg "
            onClick={(e) => {
              setShowAddTable(true);
              setShowTables(false);
              setShowUpdateTable(false);
              setShowTableOrders(false);
              setShowAddTableOrder(false);
            }}
          >
            <div class=" justify-content-center">
              <img
                src={table}
                class="card-img-top rounded"
                alt="img"
                style={{
                  maxWidth: "220px",
                  height: "auto",
                }}
              />
            </div>

            <h4 className="mt-2 text-color-second">Add Table</h4>
          </div>
        </div>
        <div class="col-lg-3 mt-2">
          <div
            class="card food-card rounded-card h-100 shadow-lg "
            onClick={(e) => {
              setShowAddTable(false);
              setShowTables(true);
              setShowUpdateTable(false);
              setShowTableOrders(false);
              setShowAddTableOrder(false);
            }}
          >
            <div class=" justify-content-center">
              <img
                src={viewTables}
                class="card-img-top rounded"
                alt="img"
                style={{
                  maxWidth: "200px",
                  height: "auto",
                }}
              />
            </div>

            <h4 className="mt-2 text-color-second">View Tables</h4>
          </div>
        </div>
        <div class="col-lg-3 mt-2">
          <div
            class="card food-card rounded-card h-100 shadow-lg"
            onClick={(e) => {
              setShowAddTable(false);
              setShowTables(false);
              setShowUpdateTable(false);
              setShowTableOrders(false);
              setShowAddTableOrder(true);
            }}
          >
            <div class=" justify-content-center">
              <img
                src={addTableOrder}
                class="card-img-top rounded"
                alt="img"
                style={{
                  maxWidth: "155px",
                  height: "auto",
                }}
              />
            </div>

            <h4 className="mt-2 text-color-second">Add Table Order</h4>
          </div>
        </div>
        <div class="col-lg-3 mt-2">
          <div
            class="card food-card rounded-card h-100 shadow-lg"
            onClick={(e) => {
              setShowAddTable(false);
              setShowTables(false);
              setShowUpdateTable(false);
              setShowTableOrders(true);
              setShowAddTableOrder(false);
            }}
          >
            <div class=" justify-content-center">
              <img
                src={allTableOrders}
                class="card-img-top rounded"
                alt="img"
                style={{
                  maxWidth: "155px",
                  height: "auto",
                }}
              />
            </div>

            <h4 className="mt-2 text-color-second">View Table Orders</h4>
          </div>
        </div>
      </div>

      {(() => {
        if (showAddTable === true) {
          return (
            <div>
              <AddTable />
            </div>
          );
        } else if (showTables === true) {
          return (
            <div>
              <ViewAllTables />
            </div>
          );
        } else if (showUpdateTable === true) {
          return (
            <div>
              <UpdateTable table={tableToUpdate} />
            </div>
          );
        } else if (showAddTableOrder === true) {
          return (
            <div className="mt-4">
              <div className="text-center">
                <h2 className="text-color-second">Add Table Order</h2>
              </div>

              <AddTableOrder />
            </div>
          );
        } else if (showTableOrders === true) {
          return (
            <div className="mt-4">
              <ViewRestaurantTableOrders />
            </div>
          );
        }
      })()}
    </div>
  );
};

export default RestaurantManagementComponent;
