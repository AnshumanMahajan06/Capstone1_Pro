package com.onlinefood.service;

import java.util.List;

import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.TableOrder;
import com.onlinefood.entity.User;

public interface TableOrderService {
	
	TableOrder add(TableOrder tableOrder);

	TableOrder update(TableOrder tableOrder);

	TableOrder getById(int id);
	
	List<TableOrder> getByTable(RestaurantTable table);
	
	List<TableOrder> getByRestaurant(User restaurant);
	
	List<TableOrder> getByRestaurantAndOrderId(User restaurant, String orderId);

}
