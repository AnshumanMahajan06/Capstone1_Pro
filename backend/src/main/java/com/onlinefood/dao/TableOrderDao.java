package com.onlinefood.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.TableOrder;
import com.onlinefood.entity.User;

@Repository
public interface TableOrderDao extends JpaRepository<TableOrder, Integer> {
	
	List<TableOrder> findByTable(RestaurantTable table);
	
	List<TableOrder> findByRestaurantAndOrderIdContainingIgnoreCase(User restaurant, String orderId);
	
	List<TableOrder> findByRestaurantOrderByIdDesc(User restaurant);

}
