package com.smartcampus.service;

import com.smartcampus.model.Resource;
import com.smartcampus.model.enums.ResourceType;

import java.util.List;

public interface ResourceService {

    Resource createResource(Resource resource);

    Resource updateResource(Long id, Resource resource);

    void deleteResource(Long id);

    Resource getResourceById(Long id);

    List<Resource> getAllResources();

    List<Resource> getResourcesByType(ResourceType type);

    List<Resource> getAvailableResources();
}
