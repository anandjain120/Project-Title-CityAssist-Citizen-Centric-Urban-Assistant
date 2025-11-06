package com.cityassist.userservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    private Integer age;

    @ElementCollection
    @CollectionTable(name = "user_medical_flags", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "flag")
    private List<String> medicalFlags;

    @ElementCollection
    @CollectionTable(name = "user_commute_patterns", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "pattern")
    private List<String> commutePatterns;

    @ElementCollection
    @CollectionTable(name = "user_notification_preferences", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "preference_key")
    @Column(name = "preference_value")
    private Map<String, String> notificationPreferences;

    @ElementCollection
    @CollectionTable(name = "user_alert_preferences", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "alert_key")
    @Column(name = "alert_value")
    private Map<String, String> alertPreferences;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

