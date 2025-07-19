package com.sportifyx.controller;

import com.sportifyx.model.Product;
import com.sportifyx.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

  @Autowired
  private ProductRepository productRepo;

  @GetMapping
  public List<Product> getAll() {
    return productRepo.findAll();
  }

  @PostMapping
  public String addProduct(@RequestBody Product p) {
    productRepo.save(p);
    return "Product added.";
  }

  @DeleteMapping("/{name}")
  public String deleteProduct(@PathVariable String name) {
    Product prod = productRepo.findByName(name);
    if (prod != null) {
      productRepo.delete(prod);
      return "Product removed.";
    } else {
      return "Product not found.";
    }
  }
}
