package com.onlinefood.dto;

import java.math.BigDecimal;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.onlinefood.entity.Food;

public class FoodAddRequest {

	private int id;

	private String name;

	private String description;

	private BigDecimal price;

	private int categoryId;

	private int restaurantId;

	private MultipartFile image1;

	private MultipartFile image2;

	private MultipartFile image3;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public MultipartFile getImage1() {
		return image1;
	}

	public void setImage1(MultipartFile image1) {
		this.image1 = image1;
	}

	public MultipartFile getImage2() {
		return image2;
	}

	public void setImage2(MultipartFile image2) {
		this.image2 = image2;
	}

	public MultipartFile getImage3() {
		return image3;
	}

	public void setImage3(MultipartFile image3) {
		this.image3 = image3;
	}

	public static Food toEntity(FoodAddRequest dto) {
		Food entity = new Food();
		BeanUtils.copyProperties(dto, entity, "image1", "image2", "image3", "categoryId", "restaurantId");
		return entity;
	}

}
