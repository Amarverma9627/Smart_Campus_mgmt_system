package com.smartcampus.service.impl;

import com.smartcampus.model.Resource;
import com.smartcampus.model.enums.ResourceType;
import com.smartcampus.repository.ResourceRepository;
import com.smartcampus.service.ResourceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceServiceImpl(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @Override
    public Resource createResource(Resource resource) {
        resource.setId(null); // ensure new
        return resourceRepository.save(resource);
    }

    @Override
    public Resource updateResource(Long id, Resource resource) {
        Resource existing = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));

        existing.setName(resource.getName());
        existing.setDescription(resource.getDescription());
        existing.setResourceType(resource.getResourceType());
        existing.setLocation(resource.getLocation());
        existing.setCapacity(resource.getCapacity());
        existing.setIsAvailable(resource.getIsAvailable());

        return resourceRepository.save(existing);
    }

    @Override
    public void deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new RuntimeException("Resource not found with id: " + id);
        }
        resourceRepository.deleteById(id);
    }

    @Override
    public Resource getResourceById(Long id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
    }

    @Override
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    @Override
    public List<Resource> getResourcesByType(ResourceType type) {
        return resourceRepository.findByResourceType(type);
    }

    @Override
    public List<Resource> getAvailableResources() {
        return resourceRepository.findByIsAvailable(true);
    }
}
