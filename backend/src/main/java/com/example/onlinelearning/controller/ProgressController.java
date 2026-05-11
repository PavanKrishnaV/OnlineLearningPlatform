package com.example.onlinelearning.controller;

import com.example.onlinelearning.entity.Progress;
import com.example.onlinelearning.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PostMapping("/complete/{lessonId}")
    public ResponseEntity<Map<String, Object>> markComplete(@PathVariable("lessonId") Long lessonId, Authentication auth) {
        Progress progress = progressService.markLessonComplete(auth.getName(), lessonId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Lesson marked as complete");
        response.put("lessonId", lessonId);
        response.put("completed", progress.getCompleted());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Map<String, Object>>> getCourseProgress(@PathVariable("courseId") Long courseId, Authentication auth) {
        List<Progress> progressList = progressService.getProgressByUserAndCourse(auth.getName(), courseId);
        List<Map<String, Object>> result = progressList.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("lessonId", p.getLesson().getId());
            map.put("lessonTitle", p.getLesson().getTitle());
            map.put("completed", p.getCompleted());
            map.put("completedAt", p.getCompletedAt());
            return map;
        }).toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/percent/{courseId}")
    public ResponseEntity<Map<String, Integer>> getProgressPercent(@PathVariable("courseId") Long courseId, Authentication auth) {
        int percent = progressService.getProgressPercent(auth.getName(), courseId);
        return ResponseEntity.ok(Map.of("percent", percent));
    }
}
