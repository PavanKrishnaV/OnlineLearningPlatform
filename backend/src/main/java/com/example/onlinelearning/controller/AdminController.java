package com.example.onlinelearning.controller;

import com.example.onlinelearning.entity.Enrollment;
import com.example.onlinelearning.entity.User;
import com.example.onlinelearning.service.AuthService;
import com.example.onlinelearning.service.CourseService;
import com.example.onlinelearning.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AuthService authService;
    private final CourseService courseService;
    private final EnrollmentService enrollmentService;

    public AdminController(AuthService authService, CourseService courseService, EnrollmentService enrollmentService) {
        this.authService = authService;
        this.courseService = courseService;
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<User> users = authService.getAllUsers();
        List<Map<String, Object>> result = users.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("email", u.getEmail());
            map.put("fullName", u.getFullName());
            map.put("roles", u.getRoles().stream().map(r -> r.getName()).toList());
            return map;
        }).toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", authService.getAllUsers().size());
        stats.put("totalCourses", courseService.getAllCourses().size());
        stats.put("totalEnrollments", enrollmentService.getAllEnrollments().size());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<Map<String, Object>>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
        List<Map<String, Object>> result = enrollments.stream().map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", e.getId());
            map.put("userName", e.getUser().getFullName());
            map.put("userEmail", e.getUser().getEmail());
            map.put("courseTitle", e.getCourse().getTitle());
            map.put("progressPercent", e.getProgressPercent());
            map.put("enrolledAt", e.getEnrolledAt());
            return map;
        }).toList();
        return ResponseEntity.ok(result);
    }
}
