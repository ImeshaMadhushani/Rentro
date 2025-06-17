package com.example.backend.dto;

public class ImageUploadResponse {
    private String imageUrl;
    private String message;

    public ImageUploadResponse(String imageUrl, String message) {
        this.imageUrl = imageUrl;
        this.message = message;
    }

    // Getters and Setters
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}