package com.onlinefood.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinefood.dao.TableOrderFoodDao;
import com.onlinefood.entity.TableOrder;
import com.onlinefood.entity.TableOrderFood;

@Service
public class TableOrderFoodServiceImpl implements TableOrderFoodService {

	@Autowired
	private TableOrderFoodDao tableOrderFoodDao;

	@Override
	public TableOrderFood add(TableOrderFood tableOrderFood) {
		// TODO Auto-generated method stub
		return tableOrderFoodDao.save(tableOrderFood);
	}

	@Override
	public TableOrderFood update(TableOrderFood tableOrderFood) {
		// TODO Auto-generated method stub
		return tableOrderFoodDao.save(tableOrderFood);
	}

	@Override
	public TableOrderFood getById(int id) {
		// TODO Auto-generated method stub

		Optional<TableOrderFood> optional = this.tableOrderFoodDao.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		} else {
			return null;
		}

	}

	@Override
	public List<TableOrderFood> getByTableOrder(TableOrder tableOrder) {
		// TODO Auto-generated method stub
		return this.tableOrderFoodDao.findByTableOrder(tableOrder);
	}

}
