package com.onlinefood.dto;

import java.util.ArrayList;
import java.util.List;

import com.onlinefood.entity.Food;


public class FoodResponseDto extends CommonApiResponse {
	
	private List<Food> foods = new ArrayList<>();

	public List<Food> getFoods() {
		return foods;
	}

	public void setFoods(List<Food> foods) {
		this.foods = foods;
	}

}
