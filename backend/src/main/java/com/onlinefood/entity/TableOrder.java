package com.onlinefood.entity;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class TableOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String orderId;

	@ManyToOne
	@JoinColumn(name = "table_id")
	private RestaurantTable table;

	private String customerName; // offline User detail

	private String customerEmail; // offline User detail

	private String billingDateTime;

	@OneToMany(mappedBy = "tableOrder", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<TableOrderFood> orderFoods = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "restaurant_user_id")
	private User restaurant;

	private BigDecimal billAmount;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public RestaurantTable getTable() {
		return table;
	}

	public void setTable(RestaurantTable table) {
		this.table = table;
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

	public Set<TableOrderFood> getOrderFoods() {
		return orderFoods;
	}

	public void setOrderFoods(Set<TableOrderFood> orderFoods) {
		this.orderFoods = orderFoods;
	}

	public User getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(User restaurant) {
		this.restaurant = restaurant;
	}

	public BigDecimal getBillAmount() {
		return billAmount;
	}

	public void setBillAmount(BigDecimal billAmount) {
		this.billAmount = billAmount;
	}

}
