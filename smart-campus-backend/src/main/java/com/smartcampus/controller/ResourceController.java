package com.smartcampus.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.model.Resource;
import com.smartcampus.model.enums.ResourceType;
import com.smartcampus.service.ResourceService;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:3000")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    // Only ADMIN can create resources
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Resource> createResource(@RequestBody Resource resource) {
        Resource saved = resourceService.createResource(resource);
        return ResponseEntity.ok(saved);
    }

    // Only ADMIN can update resources
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(
            @PathVariable Long id,
            @RequestBody Resource resource) {
        Resource updated = resourceService.updateResource(id, resource);
        return ResponseEntity.ok(updated);
    }

    // Only ADMIN can delete resources
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }


    // All authenticated users can view resources
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResource(@PathVariable Long id) {
        return ResponseEntity.ok(resourceService.getResourceById(id));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    // Get by type: /api/resources/type/LAB
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Resource>> getByType(@PathVariable ResourceType type) {
        return ResponseEntity.ok(resourceService.getResourcesByType(type));
    }

    // Get only available resources
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/available")
    public ResponseEntity<List<Resource>> getAvailable() {
        return ResponseEntity.ok(resourceService.getAvailableResources());
    }
}
