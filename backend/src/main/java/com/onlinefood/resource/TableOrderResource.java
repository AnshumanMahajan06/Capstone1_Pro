package com.onlinefood.resource;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.onlinefood.dto.TableOrderRequest;
import com.onlinefood.dto.TableOrderResponse;
import com.onlinefood.entity.Food;
import com.onlinefood.entity.RestaurantTable;
import com.onlinefood.entity.TableOrder;
import com.onlinefood.entity.TableOrderFood;
import com.onlinefood.entity.User;
import com.onlinefood.exception.TableOrderSaveFailedException;
import com.onlinefood.service.FoodService;
import com.onlinefood.service.TableOrderFoodService;
import com.onlinefood.service.TableOrderService;
import com.onlinefood.service.TableService;
import com.onlinefood.service.UserService;
import com.onlinefood.utility.Helper;

@Component
public class TableOrderResource {

	private final Logger LOG = LoggerFactory.getLogger(TableOrderResource.class);

	@Autowired
	private TableService tableService;

	@Autowired
	private UserService userService;

	@Autowired
	private TableOrderService tableOrderService;

	@Autowired
	private FoodService foodService;

	@Autowired
	private TableOrderFoodService tableOrderFoodService;

	public ResponseEntity<TableOrderResponse> addTableOrder(TableOrderRequest request) {

		LOG.info("Request received for add restaurant table order");

		TableOrderResponse response = new TableOrderResponse();

		if (request == null || request.getRestaurantId() == 0 || request.getTableId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (request.getFoodList() == null || CollectionUtils.isEmpty(request.getFoodList())) {
			response.setResponseMessage("Table Food List Empty!!!");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User restaurant = this.userService.getUserById(request.getRestaurantId());

		if (restaurant == null) {
			response.setResponseMessage("Restaurant not found");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		RestaurantTable table = this.tableService.getById(request.getTableId());

		if (table == null) {
			response.setResponseMessage("Table not found");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		String billingTime = String
				.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

		TableOrder order = new TableOrder();
		order.setBillingDateTime(billingTime);
		order.setCustomerEmail(StringUtils.isEmpty(request.getCustomerEmail()) ? "":request.getCustomerEmail());
		order.setCustomerName(StringUtils.isEmpty(request.getCustomerName()) ? "":request.getCustomerName());
		order.setOrderId(Helper.generateOrderId());
		order.setRestaurant(restaurant);
		order.setTable(table);
		order.setBillAmount(request.getTotalBill());

		TableOrder savedOrder = this.tableOrderService.add(order);

		if (savedOrder == null) {
			throw new TableOrderSaveFailedException("Failed to save Table Order!!!");
		}

		List<com.onlinefood.dto.TableOrderFood> foodList = request.getFoodList();

		BigDecimal billingAmount = BigDecimal.ZERO;

		Set<TableOrderFood> orderFoods = new HashSet<>();

		for (com.onlinefood.dto.TableOrderFood tableOrderFood : foodList) {

			TableOrderFood orderFood = new TableOrderFood();
			Food food = this.foodService.getFoodById(tableOrderFood.getFoodId());
			orderFood.setFood(food);
			orderFood.setQuantity(tableOrderFood.getQuantity());
			orderFood.setTableOrder(savedOrder);

			orderFoods.add(orderFood);

			billingAmount = billingAmount
					.add(food.getPrice().multiply(BigDecimal.valueOf(tableOrderFood.getQuantity())));

			tableOrderFoodService.add(orderFood);

		}

		savedOrder = this.tableOrderService.add(order);

		if (savedOrder == null) {
			throw new TableOrderSaveFailedException("Failed to save Table Order!!!");
		}

		savedOrder.setOrderFoods(orderFoods);

		response.setTableOrders(Arrays.asList(savedOrder));
		response.setResponseMessage("Table Order Added Successful");
		response.setSuccess(true);

		return new ResponseEntity<TableOrderResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<TableOrderResponse> fetchRestaurantTableOrders(int restaurantId) {

		LOG.info("Request received for fetching the restaurant table orders");

		TableOrderResponse response = new TableOrderResponse();

		if (restaurantId == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User restaurant = this.userService.getUserById(restaurantId);

		if (restaurant == null) {
			response.setResponseMessage("Restaurant Not Found!!");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<TableOrder> orders = this.tableOrderService.getByRestaurant(restaurant);

		if (CollectionUtils.isEmpty(orders)) {
			response.setResponseMessage("Table Orders not found");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		response.setTableOrders(orders);
		response.setResponseMessage("Table Orders fetched successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<TableOrderResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<TableOrderResponse> searchTableOrder(String orderId, int restaurantId) {

		LOG.info("Request received for searching orders by order id");

		TableOrderResponse response = new TableOrderResponse();

		if (orderId == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User restaurant = this.userService.getUserById(restaurantId);

		if (restaurant == null) {
			response.setResponseMessage("Restaurant Not Found!!");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<TableOrder> orders = this.tableOrderService.getByRestaurantAndOrderId(restaurant, orderId);

		if (CollectionUtils.isEmpty(orders)) {
			response.setResponseMessage("Table Orders not found");
			response.setSuccess(false);

			return new ResponseEntity<TableOrderResponse>(response, HttpStatus.BAD_REQUEST);
		}

		response.setTableOrders(orders);
		response.setResponseMessage("Table Orders fetched successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<TableOrderResponse>(response, HttpStatus.OK);

	}

}
