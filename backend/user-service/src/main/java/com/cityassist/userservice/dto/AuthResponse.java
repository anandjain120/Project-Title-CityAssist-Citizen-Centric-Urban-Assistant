package com.cityassist.userservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String userId;
    private String email;
    private String name;
    private String accessToken;
    private String refreshToken;
}

