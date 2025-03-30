package com.onlinefood.dto;

import java.util.ArrayList;
import java.util.List;

import com.onlinefood.entity.RestaurantTable;

public class TableResponse extends CommonApiResponse {

	private List<RestaurantTable> tables = new ArrayList<>();

	public List<RestaurantTable> getTables() {
		return tables;
	}

	public void setTables(List<RestaurantTable> tables) {
		this.tables = tables;
	}

}
