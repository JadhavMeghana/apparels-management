package com.apparels.management.repository;

import com.apparels.management.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Search by name (case-insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);
    
    // Find by category
    List<Product> findByCategoryId(Long categoryId);
    
    List<Product> findByCategoryName(String categoryName);
    
    // Price range filtering
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Find by size
    List<Product> findBySize(String size);
    
    // Find by color
    List<Product> findByColor(String color);
    
    // Find by SKU
    Optional<Product> findBySku(String sku);
    
    // Combined search query
    @Query("SELECT p FROM Product p WHERE " +
           "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:categoryId IS NULL OR p.category.id = :categoryId) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:size IS NULL OR p.size = :size) AND " +
           "(:color IS NULL OR p.color = :color)")
    List<Product> searchProducts(
            @Param("name") String name,
            @Param("categoryId") Long categoryId,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("size") String size,
            @Param("color") String color
    );
}

