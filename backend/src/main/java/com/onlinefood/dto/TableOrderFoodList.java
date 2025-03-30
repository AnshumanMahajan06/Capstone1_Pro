package com.onlinefood.dto;

import java.util.ArrayList;
import java.util.List;

public class TableOrderFoodList {

	private List<TableOrderFood> food = new ArrayList<>();

	public List<TableOrderFood> getFood() {
		return food;
	}

	public void setFood(List<TableOrderFood> food) {
		this.food = food;
	}

}
