package com.onlinefood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.TableOrderRequest;
import com.onlinefood.dto.TableOrderResponse;
import com.onlinefood.resource.TableOrderResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/table/order")
@CrossOrigin(origins = "http://localhost:3000")
public class TableOrderController {
	
	@Autowired
	private TableOrderResource tableOrderResource;
	
	@PostMapping("/add")
	@Operation(summary = "Api to add restaurant table order")
	public ResponseEntity<TableOrderResponse> addTableOrder(@RequestBody TableOrderRequest request) {
		return tableOrderResource.addTableOrder(request);
	}
	
	@GetMapping("/fetch/restaurant-wise")
	@Operation(summary = "Api to fecth restaurant table orders")
	public ResponseEntity<TableOrderResponse> addTableOrder(@RequestParam("restaurantId") int restaurantId) {
		return tableOrderResource.fetchRestaurantTableOrders(restaurantId);
	}
	
	@GetMapping("/search")
	@Operation(summary = "Api to search orders by order id")
	public ResponseEntity<TableOrderResponse> addTableOrder(@RequestParam("orderId") String orderId,
			@RequestParam("restaurantId") int restaurantId) {
		return tableOrderResource.searchTableOrder(orderId, restaurantId);
	}

}
