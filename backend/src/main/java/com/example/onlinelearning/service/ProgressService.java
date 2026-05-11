package com.example.onlinelearning.service;

import com.example.onlinelearning.entity.*;
import com.example.onlinelearning.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final EnrollmentRepository enrollmentRepository;

    public ProgressService(ProgressRepository progressRepository,
                           UserRepository userRepository,
                           LessonRepository lessonRepository,
                           EnrollmentRepository enrollmentRepository) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.lessonRepository = lessonRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public Progress markLessonComplete(String email, Long lessonId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Progress progress = progressRepository.findByUserIdAndLessonId(user.getId(), lessonId)
                .orElse(new Progress());
        progress.setUser(user);
        progress.setLesson(lesson);
        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        progress = progressRepository.save(progress);

        // Update enrollment progress percentage
        Long courseId = lesson.getCourse().getId();
        long totalLessons = lessonRepository.findByCourseIdOrderByOrderIndexAsc(courseId).size();
        long completedLessons = progressRepository.countByUserIdAndLessonCourseIdAndCompletedTrue(user.getId(), courseId);
        int percent = totalLessons > 0 ? (int) ((completedLessons * 100) / totalLessons) : 0;

        enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId).ifPresent(enrollment -> {
            enrollment.setProgressPercent(percent);
            enrollmentRepository.save(enrollment);
        });

        return progress;
    }

    public List<Progress> getProgressByUserAndCourse(String email, Long courseId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return progressRepository.findByUserIdAndLessonCourseId(user.getId(), courseId);
    }

    public int getProgressPercent(String email, Long courseId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        long totalLessons = lessonRepository.findByCourseIdOrderByOrderIndexAsc(courseId).size();
        long completedLessons = progressRepository.countByUserIdAndLessonCourseIdAndCompletedTrue(user.getId(), courseId);
        return totalLessons > 0 ? (int) ((completedLessons * 100) / totalLessons) : 0;
    }
}
