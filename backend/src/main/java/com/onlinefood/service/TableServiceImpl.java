package com.onlinefood.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinefood.dao.TableDao;
import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.User;

@Service
public class TableServiceImpl implements TableService {

	@Autowired
	private TableDao tableDao;

	@Override
	public RestaurantTable add(RestaurantTable table) {
		// TODO Auto-generated method stub
		return tableDao.save(table);
	}

	@Override
	public RestaurantTable update(RestaurantTable table) {
		// TODO Auto-generated method stub
		return tableDao.save(table);
	}

	@Override
	public RestaurantTable getById(int id) {
		// TODO Auto-generated method stub

		Optional<RestaurantTable> optional = this.tableDao.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		} else {
			return null;
		}

	}

	@Override
	public List<RestaurantTable> getByStatus(String status) {
		// TODO Auto-generated method stub
		return this.tableDao.findByStatus(status);
	}

	@Override
	public List<RestaurantTable> getByRestaurantAndStatus(User restaurant, String status) {
		// TODO Auto-generated method stub
		return this.tableDao.findByRestaurantAndStatus(restaurant, status);
	}

}
