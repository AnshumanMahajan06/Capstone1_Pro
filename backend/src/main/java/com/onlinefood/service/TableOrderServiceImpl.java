package com.onlinefood.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinefood.dao.TableOrderDao;
import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.TableOrder;
import com.onlinefood.entity.User;

@Service
public class TableOrderServiceImpl implements TableOrderService {

	@Autowired
	private TableOrderDao tableOrderDao;
	
	@Override
	public TableOrder add(TableOrder tableOrder) {
		// TODO Auto-generated method stub
		return tableOrderDao.save(tableOrder);
	}

	@Override
	public TableOrder update(TableOrder tableOrder) {
		// TODO Auto-generated method stub
		return tableOrderDao.save(tableOrder);
	}

	@Override
	public TableOrder getById(int id) {
		// TODO Auto-generated method stub

		Optional<TableOrder> optional = this.tableOrderDao.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		} else {
			return null;
		}

	}

	@Override
	public List<TableOrder> getByTable(RestaurantTable table) {
		// TODO Auto-generated method stub
		return this.tableOrderDao.findByTable(table);
	}

	@Override
	public List<TableOrder> getByRestaurant(User restaurant) {
		// TODO Auto-generated method stub
		return this.tableOrderDao.findByRestaurantOrderByIdDesc(restaurant);
	}

	@Override
	public List<TableOrder> getByRestaurantAndOrderId(User restaurant, String orderId) {
		// TODO Auto-generated method stub
		return this.tableOrderDao.findByRestaurantAndOrderIdContainingIgnoreCase(restaurant, orderId);
	}

}
