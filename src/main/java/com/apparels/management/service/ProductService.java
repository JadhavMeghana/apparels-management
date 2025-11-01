package com.apparels.management.service;

import com.apparels.management.entity.Product;
import com.apparels.management.repository.CategoryRepository;
import com.apparels.management.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    public Optional<Product> getProductBySku(String sku) {
        return productRepository.findBySku(sku);
    }
    
    public Product createProduct(Product product) {
        // Validate category exists
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + product.getCategory().getId()));
        } else {
            throw new IllegalArgumentException("Category is required for product");
        }
        
        // Check SKU uniqueness if provided
        if (product.getSku() != null && !product.getSku().isEmpty()) {
            if (productRepository.findBySku(product.getSku()).isPresent()) {
                throw new IllegalArgumentException("Product with SKU '" + product.getSku() + "' already exists");
            }
        }
        
        return productRepository.save(product);
    }
    
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        // Validate category if changed
        if (productDetails.getCategory() != null && productDetails.getCategory().getId() != null) {
            categoryRepository.findById(productDetails.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDetails.getCategory().getId()));
        }
        
        // Check SKU uniqueness if changed
        if (productDetails.getSku() != null && !productDetails.getSku().isEmpty() && 
            !productDetails.getSku().equals(product.getSku())) {
            if (productRepository.findBySku(productDetails.getSku()).isPresent()) {
                throw new IllegalArgumentException("Product with SKU '" + productDetails.getSku() + "' already exists");
            }
        }
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setSku(productDetails.getSku());
        product.setSize(productDetails.getSize());
        product.setColor(productDetails.getColor());
        if (productDetails.getCategory() != null) {
            product.setCategory(productDetails.getCategory());
        }
        
        return productRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
    
    // Search and filter methods
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
    
    public List<Product> getProductsByCategoryName(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }
    
    public List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }
    
    public List<Product> getProductsBySize(String size) {
        return productRepository.findBySize(size);
    }
    
    public List<Product> getProductsByColor(String color) {
        return productRepository.findByColor(color);
    }
    
    public List<Product> searchProducts(String name, Long categoryId, BigDecimal minPrice, 
                                       BigDecimal maxPrice, String size, String color) {
        return productRepository.searchProducts(name, categoryId, minPrice, maxPrice, size, color);
    }
}

