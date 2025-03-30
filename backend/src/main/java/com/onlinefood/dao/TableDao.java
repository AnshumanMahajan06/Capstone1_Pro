package com.onlinefood.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.User;

@Repository
public interface TableDao extends JpaRepository<RestaurantTable, Integer> {

	List<RestaurantTable> findByStatus(String status);
	
	List<RestaurantTable> findByRestaurantAndStatus(User restaurant, String status);

}
