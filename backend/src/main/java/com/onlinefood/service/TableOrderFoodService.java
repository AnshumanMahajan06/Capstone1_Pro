package com.onlinefood.service;

import java.util.List;

import com.onlinefood.entity.TableOrder;
import com.onlinefood.entity.TableOrderFood;

public interface TableOrderFoodService {

	TableOrderFood add(TableOrderFood tableOrderFood);

	TableOrderFood update(TableOrderFood tableOrderFood);

	TableOrderFood getById(int id);
	
	List<TableOrderFood> getByTableOrder(TableOrder tableOrder);

}
