package com.cityassist.reportservice.controller;

import com.cityassist.reportservice.dto.ReportCreateRequest;
import com.cityassist.reportservice.dto.ReportResponse;
import com.cityassist.reportservice.dto.TimelineEventResponse;
import com.cityassist.reportservice.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Reports", description = "Report management endpoints")
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    @Operation(summary = "Create a new report")
    public ResponseEntity<ReportResponse> createReport(
            @AuthenticationPrincipal String userId,
            @RequestPart("data") @Valid ReportCreateRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        ReportResponse report = reportService.createReport(userId, request, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    @GetMapping
    @Operation(summary = "Get user reports")
    public ResponseEntity<Page<ReportResponse>> getReports(
            @AuthenticationPrincipal String userId,
            Pageable pageable) {
        Page<ReportResponse> reports = reportService.getUserReports(userId, pageable);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get report by ID")
    public ResponseEntity<ReportResponse> getReport(
            @AuthenticationPrincipal String userId,
            @PathVariable String id) {
        ReportResponse report = reportService.getReport(userId, id);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/{id}/timeline")
    @Operation(summary = "Get report timeline")
    public ResponseEntity<List<TimelineEventResponse>> getTimeline(
            @AuthenticationPrincipal String userId,
            @PathVariable String id) {
        List<TimelineEventResponse> timeline = reportService.getTimeline(userId, id);
        return ResponseEntity.ok(timeline);
    }
}

