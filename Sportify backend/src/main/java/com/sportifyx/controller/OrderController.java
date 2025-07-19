package com.sportifyx.controller;

import com.sportifyx.model.OrderItem;
import com.sportifyx.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {

  @Autowired
  private OrderRepository orderRepo;

  @PostMapping
  public String placeOrder(@RequestBody List<OrderItem> items) {
    String orderId = "ORD" + System.currentTimeMillis();
    for (OrderItem item : items) {
      item.setOrderNumber(orderId);
      orderRepo.save(item);
    }
    return orderId;
  }
}
