package com.cityassist.userservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UserProfileResponse {
    private String id;
    private String email;
    private String name;
    private Integer age;
    private List<String> medicalFlags;
    private List<String> commutePatterns;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

