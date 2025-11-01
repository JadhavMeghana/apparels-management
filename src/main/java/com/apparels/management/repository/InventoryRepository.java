package com.apparels.management.repository;

import com.apparels.management.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    
    Optional<Inventory> findByProductId(Long productId);
    
    List<Inventory> findByStockLevelLessThan(Integer stockLevel);
    
    @Query("SELECT i FROM Inventory i WHERE i.stockLevel <= i.reorderLevel")
    List<Inventory> findLowStockItems();
    
    List<Inventory> findByLocation(String location);
}

