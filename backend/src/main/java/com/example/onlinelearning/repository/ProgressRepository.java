package com.example.onlinelearning.repository;

import com.example.onlinelearning.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByUserId(Long userId);
    List<Progress> findByUserIdAndLessonCourseId(Long userId, Long courseId);
    Optional<Progress> findByUserIdAndLessonId(Long userId, Long lessonId);
    long countByUserIdAndLessonCourseIdAndCompletedTrue(Long userId, Long courseId);
}
