package com.example.backend.controller;

import com.example.backend.dto.ImageUploadResponse;
import com.example.backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

    @PostMapping("/upload")
    public ResponseEntity<ImageUploadResponse> uploadFile(@RequestParam("image") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(new ImageUploadResponse(null, "File is empty"));
            }

            // Store the file and get the filename
            String filename = fileStorageService.storeFile(file);

            // Create the URL to access the file
            String fileUrl = baseUrl + "/uploads/" + filename;

            return ResponseEntity.ok(new ImageUploadResponse(fileUrl, "File uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ImageUploadResponse(null, "Failed to upload file: " + e.getMessage()));
        }
    }
}