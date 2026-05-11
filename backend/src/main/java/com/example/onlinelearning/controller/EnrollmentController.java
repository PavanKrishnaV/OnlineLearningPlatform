package com.example.onlinelearning.controller;

import com.example.onlinelearning.entity.Enrollment;
import com.example.onlinelearning.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/{courseId}")
    public ResponseEntity<Map<String, Object>> enroll(@PathVariable("courseId") Long courseId, Authentication auth) {
        Enrollment enrollment = enrollmentService.enroll(auth.getName(), courseId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Enrolled successfully");
        response.put("enrollmentId", enrollment.getId());
        response.put("courseId", courseId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> myEnrollments(Authentication auth) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByUser(auth.getName());
        List<Map<String, Object>> result = enrollments.stream().map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("enrollmentId", e.getId());
            map.put("courseId", e.getCourse().getId());
            map.put("courseTitle", e.getCourse().getTitle());
            map.put("courseThumbnail", e.getCourse().getThumbnailUrl());
            map.put("instructor", e.getCourse().getInstructor());
            map.put("progressPercent", e.getProgressPercent());
            map.put("enrolledAt", e.getEnrolledAt());
            return map;
        }).toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/check/{courseId}")
    public ResponseEntity<Map<String, Boolean>> checkEnrollment(@PathVariable("courseId") Long courseId, Authentication auth) {
        boolean enrolled = enrollmentService.isEnrolled(auth.getName(), courseId);
        return ResponseEntity.ok(Map.of("enrolled", enrolled));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }
}
