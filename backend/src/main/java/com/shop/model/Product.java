package com.shop.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double mrp;

    private String tag;

    private Double rating = 4.5;

    private Integer reviews = 100;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String image;

    @Column(length = 1000)
    private String description;

    public Product() {}

    public Product(String name, String brand, Double price, Double mrp, String tag, Double rating, Integer reviews, String category, String image, String description) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.mrp = mrp;
        this.tag = tag;
        this.rating = rating;
        this.reviews = reviews;
        this.category = category;
        this.image = image;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getMrp() { return mrp; }
    public void setMrp(Double mrp) { this.mrp = mrp; }

    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
