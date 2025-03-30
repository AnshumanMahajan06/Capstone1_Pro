package com.onlinefood.dto;

import org.springframework.beans.BeanUtils;

import com.onlinefood.entity.Address;
import com.onlinefood.entity.User;

public class UserDto {

	private int id;

	private String firstName;

	private String lastName;

	private String emailId;

	private String phoneNo;

	private String role;

	private Address address;

	private UserDto restaurant;

	private String status;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public UserDto getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(UserDto restaurant) {
		this.restaurant = restaurant;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public static UserDto toUserDtoEntity(User user) {
		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto, "seller");
		return userDto;
	}

}
