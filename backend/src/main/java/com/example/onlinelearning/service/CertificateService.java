package com.example.onlinelearning.service;

import com.example.onlinelearning.entity.Certificate;
import com.example.onlinelearning.entity.Course;
import com.example.onlinelearning.entity.User;
import com.example.onlinelearning.repository.CertificateRepository;
import com.example.onlinelearning.repository.CourseRepository;
import com.example.onlinelearning.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ProgressService progressService;

    public CertificateService(CertificateRepository certificateRepository,
                              UserRepository userRepository,
                              CourseRepository courseRepository,
                              ProgressService progressService) {
        this.certificateRepository = certificateRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.progressService = progressService;
    }

    public Certificate generateCertificate(String email, Long courseId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Check if already issued
        if (certificateRepository.findByUserIdAndCourseId(user.getId(), courseId).isPresent()) {
            return certificateRepository.findByUserIdAndCourseId(user.getId(), courseId).get();
        }

        // Check if course is 100% complete
        int progress = progressService.getProgressPercent(email, courseId);
        if (progress < 100) {
            throw new RuntimeException("Course not yet completed. Progress: " + progress + "%");
        }

        Certificate cert = new Certificate();
        cert.setUser(user);
        cert.setCourse(course);
        return certificateRepository.save(cert);
    }

    public List<Certificate> getCertificatesByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return certificateRepository.findByUserId(user.getId());
    }
}
