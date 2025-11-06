package com.cityassist.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class UserProfileUpdateRequest {
    @NotBlank
    private String name;

    private Integer age;
    private List<String> medicalFlags;
    private List<String> commutePatterns;
}

