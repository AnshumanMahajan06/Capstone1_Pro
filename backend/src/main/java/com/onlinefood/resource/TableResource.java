package com.onlinefood.resource;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.onlinefood.dto.CommonApiResponse;
import com.onlinefood.dto.TableAddRequest;
import com.onlinefood.dto.TableResponse;
import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.User;
import com.onlinefood.exception.TableSaveFailedException;
import com.onlinefood.service.TableService;
import com.onlinefood.service.UserService;
import com.onlinefood.utility.Constants.TableStatus;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class TableResource {
	
	private final Logger LOG = LoggerFactory.getLogger(TableResource.class);
	
	@Autowired
	private TableService tableService;
	
	@Autowired
	private UserService userService;

	public ResponseEntity<CommonApiResponse> addTable(TableAddRequest request) {
		
		LOG.info("Request received for add table");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getRestaurantId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		User restaurant = this.userService.getUserById(request.getRestaurantId());
		
		if (restaurant == null) {
			response.setResponseMessage("Restaurant not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		RestaurantTable table = new RestaurantTable();
		
		table.setStatus(TableStatus.ACTIVE.value());
		table.setName(request.getName());
		table.setTotalSeat(request.getTotalSeat());
		table.setRestaurant(restaurant);

		RestaurantTable savedTable = this.tableService.add(table);

		if (savedTable == null) {
			throw new TableSaveFailedException("Failed to add table");
		}

		response.setResponseMessage("Table Added Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> updateTable(TableAddRequest request) {
		
		LOG.info("Request received for update table");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		RestaurantTable table = this.tableService.getById(request.getId());
		
		if (table == null) {
			response.setResponseMessage("Table not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		table.setStatus(TableStatus.ACTIVE.value());
		table.setName(request.getName());
		table.setTotalSeat(request.getTotalSeat());

		RestaurantTable savedTable = this.tableService.update(table);

		if (savedTable == null) {
			throw new TableSaveFailedException("Failed to update table");
		}

		response.setResponseMessage("Table Updated Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> deleteTable(int tableId) {
		
		LOG.info("Request received for delete table");

		CommonApiResponse response = new CommonApiResponse();

		if (tableId == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		RestaurantTable table = this.tableService.getById(tableId);
		
		if (table == null) {
			response.setResponseMessage("Table not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		table.setStatus(TableStatus.DEACTIVATED.value());

		RestaurantTable savedTable = this.tableService.update(table);

		if (savedTable == null) {
			throw new TableSaveFailedException("Failed to delete table");
		}

		response.setResponseMessage("Table Deleted Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> getAllRestaurantTables(int restaurantId) {
		
		LOG.info("Request received for getting all restaurant tables");

		TableResponse response = new TableResponse();

		if (restaurantId == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		User restaurant = this.userService.getUserById(restaurantId);
		
		if (restaurant == null) {
			response.setResponseMessage("Restaurant not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		List<RestaurantTable> tables = this.tableService.getByRestaurantAndStatus(restaurant, TableStatus.ACTIVE.value());

		if (tables == null) {
			response.setResponseMessage("Tables not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		response.setTables(tables);
		response.setResponseMessage("Table Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> getTableById(int tableId) {
		
		LOG.info("Request received for getting all restaurant tables");

		TableResponse response = new TableResponse();

		if (tableId == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		RestaurantTable table = this.tableService.getById(tableId);
		
		if (table == null) {
			response.setResponseMessage("Table not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}
		
		response.setTables(Arrays.asList(table));
		response.setResponseMessage("Table Fetched Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}
	
}
