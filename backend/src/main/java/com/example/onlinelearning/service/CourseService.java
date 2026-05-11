package com.example.onlinelearning.service;

import com.example.onlinelearning.dto.*;
import com.example.onlinelearning.entity.Course;
import com.example.onlinelearning.entity.Lesson;
import com.example.onlinelearning.repository.CourseRepository;
import com.example.onlinelearning.repository.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    public CourseService(CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        return toResponse(course);
    }

    public List<CourseResponse> searchCourses(String keyword) {
        return courseRepository.findByTitleContainingIgnoreCase(keyword)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<CourseResponse> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public CourseResponse createCourse(CourseRequest request) {
        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setInstructor(request.getInstructor());
        course.setCategory(request.getCategory());
        course.setThumbnailUrl(request.getThumbnailUrl());
        course.setRating(request.getRating());
        course.setDurationHours(request.getDurationHours());
        course.setLevel(request.getLevel());
        course = courseRepository.save(course);

        if (request.getLessons() != null) {
            for (LessonRequest lr : request.getLessons()) {
                Lesson lesson = new Lesson();
                lesson.setTitle(lr.getTitle());
                lesson.setContent(lr.getContent());
                lesson.setVideoUrl(lr.getVideoUrl());
                lesson.setOrderIndex(lr.getOrderIndex());
                lesson.setDurationMinutes(lr.getDurationMinutes());
                lesson.setCourse(course);
                lessonRepository.save(lesson);
            }
        }
        return getCourseById(course.getId());
    }

    @Transactional
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setInstructor(request.getInstructor());
        course.setCategory(request.getCategory());
        course.setThumbnailUrl(request.getThumbnailUrl());
        course.setRating(request.getRating());
        course.setDurationHours(request.getDurationHours());
        course.setLevel(request.getLevel());
        courseRepository.save(course);
        return getCourseById(id);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    // ---- Lesson methods ----
    public List<LessonResponse> getLessonsByCourse(Long courseId) {
        return lessonRepository.findByCourseIdOrderByOrderIndexAsc(courseId)
                .stream().map(this::toLessonResponse).collect(Collectors.toList());
    }

    public LessonResponse getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        return toLessonResponse(lesson);
    }

    @Transactional
    public LessonResponse addLesson(Long courseId, LessonRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Lesson lesson = new Lesson();
        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());
        lesson.setVideoUrl(request.getVideoUrl());
        lesson.setOrderIndex(request.getOrderIndex());
        lesson.setDurationMinutes(request.getDurationMinutes());
        lesson.setCourse(course);
        lesson = lessonRepository.save(lesson);
        return toLessonResponse(lesson);
    }

    public void deleteLesson(Long lessonId) {
        lessonRepository.deleteById(lessonId);
    }

    // ---- Mappers ----
    private CourseResponse toResponse(Course course) {
        CourseResponse res = new CourseResponse();
        res.setId(course.getId());
        res.setTitle(course.getTitle());
        res.setDescription(course.getDescription());
        res.setInstructor(course.getInstructor());
        res.setCategory(course.getCategory());
        res.setThumbnailUrl(course.getThumbnailUrl());
        res.setRating(course.getRating());
        res.setDurationHours(course.getDurationHours());
        res.setLevel(course.getLevel());

        List<Lesson> lessons = lessonRepository.findByCourseIdOrderByOrderIndexAsc(course.getId());
        res.setLessons(lessons.stream().map(this::toLessonResponse).collect(Collectors.toList()));
        res.setTotalLessons(lessons.size());
        return res;
    }

    private LessonResponse toLessonResponse(Lesson lesson) {
        LessonResponse lr = new LessonResponse();
        lr.setId(lesson.getId());
        lr.setTitle(lesson.getTitle());
        lr.setContent(lesson.getContent());
        lr.setVideoUrl(lesson.getVideoUrl());
        lr.setOrderIndex(lesson.getOrderIndex());
        lr.setDurationMinutes(lesson.getDurationMinutes());
        lr.setCourseId(lesson.getCourse().getId());
        return lr;
    }
}
