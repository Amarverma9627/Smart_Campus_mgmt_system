package com.smartcampus.repository;

import com.smartcampus.model.Resource;
import com.smartcampus.model.enums.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByResourceType(ResourceType resourceType);

    List<Resource> findByIsAvailable(Boolean isAvailable);
}
