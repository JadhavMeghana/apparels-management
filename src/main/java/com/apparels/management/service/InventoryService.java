package com.apparels.management.service;

import com.apparels.management.entity.Inventory;
import com.apparels.management.entity.Product;
import com.apparels.management.repository.InventoryRepository;
import com.apparels.management.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService {
    
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
    
    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }
    
    public Optional<Inventory> getInventoryByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId);
    }
    
    public Inventory createInventory(Long productId, Inventory inventory) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        
        // Check if inventory already exists for this product
        if (inventoryRepository.findByProductId(productId).isPresent()) {
            throw new IllegalStateException("Inventory already exists for product with id: " + productId);
        }
        
        inventory.setProduct(product);
        return inventoryRepository.save(inventory);
    }
    
    public Inventory updateInventory(Long id, Inventory inventoryDetails) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));
        
        inventory.setStockLevel(inventoryDetails.getStockLevel());
        inventory.setLocation(inventoryDetails.getLocation());
        inventory.setReorderLevel(inventoryDetails.getReorderLevel());
        
        return inventoryRepository.save(inventory);
    }
    
    public Inventory updateStockLevel(Long id, Integer newStockLevel) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));
        
        if (newStockLevel < 0) {
            throw new IllegalArgumentException("Stock level cannot be negative");
        }
        
        inventory.setStockLevel(newStockLevel);
        return inventoryRepository.save(inventory);
    }
    
    public Inventory updateStockLevelByProductId(Long productId, Integer newStockLevel) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Inventory not found for product with id: " + productId));
        
        if (newStockLevel < 0) {
            throw new IllegalArgumentException("Stock level cannot be negative");
        }
        
        inventory.setStockLevel(newStockLevel);
        return inventoryRepository.save(inventory);
    }
    
    public void deleteInventory(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new RuntimeException("Inventory not found with id: " + id);
        }
        inventoryRepository.deleteById(id);
    }
    
    public List<Inventory> getLowStockItems() {
        return inventoryRepository.findLowStockItems();
    }
    
    public List<Inventory> getItemsBelowStockLevel(Integer stockLevel) {
        return inventoryRepository.findByStockLevelLessThan(stockLevel);
    }
    
    public List<Inventory> getInventoryByLocation(String location) {
        return inventoryRepository.findByLocation(location);
    }
    
    public Inventory addStock(Long id, Integer quantity) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));
        
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity to add cannot be negative");
        }
        
        inventory.setStockLevel(inventory.getStockLevel() + quantity);
        return inventoryRepository.save(inventory);
    }
    
    public Inventory removeStock(Long id, Integer quantity) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));
        
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity to remove cannot be negative");
        }
        
        if (inventory.getStockLevel() < quantity) {
            throw new IllegalStateException("Insufficient stock. Available: " + inventory.getStockLevel() + ", Requested: " + quantity);
        }
        
        inventory.setStockLevel(inventory.getStockLevel() - quantity);
        return inventoryRepository.save(inventory);
    }
}

