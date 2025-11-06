package com.cityassist.userservice.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class UserPreferencesRequest {
    private Map<String, String> notificationPreferences;
    private Map<String, String> alertPreferences;
}

