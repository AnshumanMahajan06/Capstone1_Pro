package com.onlinefood.dto;

import java.math.BigDecimal;
import java.util.List;

public class TableOrderRequest {

	private int id;

	private int tableId;

	private String customerName; // offline User detail

	private String customerEmail; // offline User detail

	private String billingDateTime;

	private List<TableOrderFood> foodList;

	private int restaurantId;

	private BigDecimal totalBill;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTableId() {
		return tableId;
	}

	public void setTableId(int tableId) {
		this.tableId = tableId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerEmail() {
		return customerEmail;
	}

	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}

	public String getBillingDateTime() {
		return billingDateTime;
	}

	public void setBillingDateTime(String billingDateTime) {
		this.billingDateTime = billingDateTime;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public BigDecimal getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(BigDecimal totalBill) {
		this.totalBill = totalBill;
	}

	public List<TableOrderFood> getFoodList() {
		return foodList;
	}

	public void setFoodList(List<TableOrderFood> foodList) {
		this.foodList = foodList;
	}

}
