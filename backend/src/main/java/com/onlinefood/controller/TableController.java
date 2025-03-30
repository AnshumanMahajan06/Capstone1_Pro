package com.onlinefood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.CommonApiResponse;
import com.onlinefood.dto.TableAddRequest;
import com.onlinefood.resource.TableResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/table")
@CrossOrigin(origins = "http://localhost:3000")
public class TableController {

	@Autowired
	private TableResource tableResource;

	@PostMapping("/add")
	@Operation(summary = "Api to add restaurant table")
	public ResponseEntity<CommonApiResponse> addTable(@RequestBody TableAddRequest request) {
		return tableResource.addTable(request);
	}

	@PutMapping("/update")
	@Operation(summary = "Api to add restaurant table")
	public ResponseEntity<CommonApiResponse> updateTable(@RequestBody TableAddRequest request) {
		return tableResource.updateTable(request);
	}

	@DeleteMapping("/delete")
	@Operation(summary = "Api to delete restaurant table")
	public ResponseEntity<CommonApiResponse> deleteTable(@RequestParam("tableId") int tableId) {
		return tableResource.deleteTable(tableId);
	}

	@GetMapping("/fetch/all")
	@Operation(summary = "Api to get all restaurant tables")
	public ResponseEntity<CommonApiResponse> getAllRestaurantTables(@RequestParam("restaurantId") int restaurantId) {
		return tableResource.getAllRestaurantTables(restaurantId);
	}
	
	@GetMapping("/fetch/id")
	@Operation(summary = "Api to get all restaurant table by id")
	public ResponseEntity<CommonApiResponse> getRestaurantTableById(@RequestParam("tableId") int tableId) {
		return tableResource.getTableById(tableId);
	}

}
