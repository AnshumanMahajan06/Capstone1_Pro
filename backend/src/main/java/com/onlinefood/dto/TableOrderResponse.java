package com.onlinefood.dto;

import java.util.ArrayList;
import java.util.List;

import com.onlinefood.entity.TableOrder;

public class TableOrderResponse extends CommonApiResponse {

	private List<TableOrder> tableOrders = new ArrayList<>();

	public List<TableOrder> getTableOrders() {
		return tableOrders;
	}

	public void setTableOrders(List<TableOrder> tableOrders) {
		this.tableOrders = tableOrders;
	}

}
