package com.onlinefood.service;

import java.util.List;

import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.User;

public interface TableService {

	RestaurantTable add(RestaurantTable table);

	RestaurantTable update(RestaurantTable table);

	RestaurantTable getById(int id);

	List<RestaurantTable> getByStatus(String status);
	
	List<RestaurantTable> getByRestaurantAndStatus(User restaurant, String status);

}
