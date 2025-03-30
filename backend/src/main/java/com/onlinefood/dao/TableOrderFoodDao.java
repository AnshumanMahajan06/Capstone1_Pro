package com.onlinefood.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinefood.entity.TableOrder;
import com.onlinefood.entity.TableOrderFood;

@Repository
public interface TableOrderFoodDao extends JpaRepository<TableOrderFood, Integer> {
	
	List<TableOrderFood> findByTableOrder(TableOrder tableOrder);

}
