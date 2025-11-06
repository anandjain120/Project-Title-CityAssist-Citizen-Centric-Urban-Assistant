package com.cityassist.userservice.service;

import com.cityassist.userservice.dto.UserProfileResponse;
import com.cityassist.userservice.dto.UserProfileUpdateRequest;
import com.cityassist.userservice.dto.UserPreferencesRequest;
import com.cityassist.userservice.model.User;
import com.cityassist.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserProfileResponse getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .age(user.getAge())
                .medicalFlags(user.getMedicalFlags())
                .commutePatterns(user.getCommutePatterns())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    @Transactional
    public UserProfileResponse updateProfile(String userId, UserProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(request.getName());
        if (request.getAge() != null) {
            user.setAge(request.getAge());
        }
        if (request.getMedicalFlags() != null) {
            user.setMedicalFlags(request.getMedicalFlags());
        }
        if (request.getCommutePatterns() != null) {
            user.setCommutePatterns(request.getCommutePatterns());
        }

        user = userRepository.save(user);

        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .age(user.getAge())
                .medicalFlags(user.getMedicalFlags())
                .commutePatterns(user.getCommutePatterns())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    @Transactional
    public void updatePreferences(String userId, UserPreferencesRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setNotificationPreferences(request.getNotificationPreferences());
        user.setAlertPreferences(request.getAlertPreferences());
        userRepository.save(user);
    }

    public UserPreferencesRequest getPreferences(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserPreferencesRequest.builder()
                .notificationPreferences(user.getNotificationPreferences())
                .alertPreferences(user.getAlertPreferences())
                .build();
    }
}

