package com.cityassist.userservice.controller;

import com.cityassist.userservice.dto.UserProfileResponse;
import com.cityassist.userservice.dto.UserProfileUpdateRequest;
import com.cityassist.userservice.dto.UserPreferencesRequest;
import com.cityassist.userservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "User Management", description = "User profile and preferences endpoints")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Get user profile")
    public ResponseEntity<UserProfileResponse> getProfile(
            @AuthenticationPrincipal String userId) {
        UserProfileResponse profile = userService.getProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    @Operation(summary = "Update user profile")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody UserProfileUpdateRequest request) {
        UserProfileResponse profile = userService.updateProfile(userId, request);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/preferences")
    @Operation(summary = "Update user preferences")
    public ResponseEntity<Void> updatePreferences(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody UserPreferencesRequest request) {
        userService.updatePreferences(userId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/preferences")
    @Operation(summary = "Get user preferences")
    public ResponseEntity<UserPreferencesRequest> getPreferences(
            @AuthenticationPrincipal String userId) {
        UserPreferencesRequest preferences = userService.getPreferences(userId);
        return ResponseEntity.ok(preferences);
    }
}

