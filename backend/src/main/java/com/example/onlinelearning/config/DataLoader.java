package com.example.onlinelearning.config;

import com.example.onlinelearning.entity.*;
import com.example.onlinelearning.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(RoleRepository roleRepository, UserRepository userRepository,
                      CourseRepository courseRepository, LessonRepository lessonRepository,
                      PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create roles if not exist
        if (roleRepository.count() == 0) {
            Role adminRole = new Role(); adminRole.setName("ROLE_ADMIN");
            Role userRole = new Role(); userRole.setName("ROLE_USER");
            roleRepository.save(adminRole);
            roleRepository.save(userRole);
        }

        // Create admin user if not exist
        if (!userRepository.existsByEmail("admin@example.com")) {
            User admin = new User();
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Admin User");
            Role adminRole = roleRepository.findByName("ROLE_ADMIN").get();
            Role userRole = roleRepository.findByName("ROLE_USER").get();
            admin.setRoles(Set.of(adminRole, userRole));
            userRepository.save(admin);
        }

        // Create sample user if not exist
        if (!userRepository.existsByEmail("user@example.com")) {
            User user = new User();
            user.setEmail("user@example.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setFullName("John Doe");
            Role userRole = roleRepository.findByName("ROLE_USER").get();
            user.setRoles(Set.of(userRole));
            userRepository.save(user);
        }

        // Create student demo user
        if (!userRepository.existsByEmail("student@example.com")) {
            User student = new User();
            student.setEmail("student@example.com");
            student.setPassword(passwordEncoder.encode("password"));
            student.setFullName("Pavan Kumar");
            Role userRole = roleRepository.findByName("ROLE_USER").get();
            student.setRoles(Set.of(userRole));
            userRepository.save(student);
        }

        // Create personal user account
        if (!userRepository.existsByEmail("avanpavi2506@gmail.com")) {
            User personal = new User();
            personal.setEmail("avanpavi2506@gmail.com");
            personal.setPassword(passwordEncoder.encode("password"));
            personal.setFullName("Pavan Kumar");
            Role userRole = roleRepository.findByName("ROLE_USER").get();
            personal.setRoles(Set.of(userRole));
            userRepository.save(personal);
        }

        // Seed courses if empty
        if (courseRepository.count() == 0) {
            // Course 1: Java Programming
            Course c1 = new Course();
            c1.setTitle("Complete Java Programming");
            c1.setDescription("Master Java from scratch. Learn OOP, collections, streams, multithreading, and build real-world projects. This comprehensive course covers everything from basic syntax to advanced enterprise patterns.");
            c1.setInstructor("Dr. Sarah Johnson");
            c1.setCategory("Programming");
            c1.setThumbnailUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600");
            c1.setRating(4.8);
            c1.setDurationHours(40);
            c1.setLevel("Beginner");
            c1 = courseRepository.save(c1);

            addLesson(c1, "Introduction to Java", "Learn what Java is and set up your development environment.", "https://www.youtube.com/watch?v=eIrMbAQSU34", 1, 15);
            addLesson(c1, "Variables and Data Types", "Understanding primitive and reference data types in Java.", "https://www.youtube.com/watch?v=LftG_XpTqZc", 2, 20);
            addLesson(c1, "Control Flow Statements", "Master if-else, switch, loops, and branching in Java.", "https://www.youtube.com/watch?v=mAtkpqV7FUI", 3, 25);
            addLesson(c1, "Object-Oriented Programming", "Learn classes, objects, inheritance, polymorphism, and encapsulation.", "https://www.youtube.com/watch?v=pTB0EiLXUC8", 4, 30);
            addLesson(c1, "Collections Framework", "Master Lists, Sets, Maps, and Queues in Java.", "https://www.youtube.com/watch?v=2K6Z-q7lB34", 5, 25);

            // Course 2: React.js
            Course c2 = new Course();
            c2.setTitle("React.js - The Complete Guide");
            c2.setDescription("Build modern web applications with React.js. Learn components, hooks, state management, routing, and connect to REST APIs. Includes projects and best practices.");
            c2.setInstructor("Prof. Mike Chen");
            c2.setCategory("Web Development");
            c2.setThumbnailUrl("https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600");
            c2.setRating(4.9);
            c2.setDurationHours(35);
            c2.setLevel("Intermediate");
            c2 = courseRepository.save(c2);

            addLesson(c2, "React Fundamentals", "Understanding JSX, components, and the virtual DOM.", "https://www.youtube.com/watch?v=SqcY0GlETPk", 1, 20);
            addLesson(c2, "State and Props", "Managing component state and passing data with props.", "https://www.youtube.com/watch?v=35lXWvCu70U", 2, 25);
            addLesson(c2, "React Hooks Deep Dive", "useState, useEffect, useContext, useReducer, and custom hooks.", "https://www.youtube.com/watch?v=LlvBzyy-558", 3, 30);
            addLesson(c2, "React Router", "Client-side routing and navigation in React applications.", "https://www.youtube.com/watch?v=oTIJunBa6MA", 4, 20);
            addLesson(c2, "API Integration with Axios", "Connecting React apps to REST APIs and handling async data.", "https://www.youtube.com/watch?v=RG9tmiz8_6s", 5, 25);

            // Course 3: Python
            Course c3 = new Course();
            c3.setTitle("Python for Data Science");
            c3.setDescription("Learn Python programming for data science. Covers NumPy, Pandas, Matplotlib, Scikit-learn, and hands-on data analysis projects with real-world datasets.");
            c3.setInstructor("Dr. Emily Zhang");
            c3.setCategory("Data Science");
            c3.setThumbnailUrl("https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600");
            c3.setRating(4.7);
            c3.setDurationHours(30);
            c3.setLevel("Beginner");
            c3 = courseRepository.save(c3);

            addLesson(c3, "Python Basics", "Variables, data types, operators, and control flow in Python.", "https://www.youtube.com/watch?v=rfscVS0vtbw", 1, 20);
            addLesson(c3, "NumPy for Numerical Computing", "Array operations, broadcasting, and mathematical functions.", "https://www.youtube.com/watch?v=QUT1VHiLmmI", 2, 25);
            addLesson(c3, "Pandas for Data Analysis", "DataFrames, data cleaning, filtering, and aggregation.", "https://www.youtube.com/watch?v=vmEHCJofslg", 3, 30);
            addLesson(c3, "Data Visualization with Matplotlib", "Creating charts, plots, and interactive visualizations.", "https://www.youtube.com/watch?v=OZOOLe2olNo", 4, 20);

            // Course 4: Spring Boot
            Course c4 = new Course();
            c4.setTitle("Spring Boot Masterclass");
            c4.setDescription("Build enterprise-grade applications with Spring Boot. Learn REST APIs, Spring Security, JPA, microservices architecture, and deployment strategies.");
            c4.setInstructor("James Wilson");
            c4.setCategory("Programming");
            c4.setThumbnailUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600");
            c4.setRating(4.6);
            c4.setDurationHours(45);
            c4.setLevel("Advanced");
            c4 = courseRepository.save(c4);

            addLesson(c4, "Spring Boot Introduction", "Understanding Spring Boot auto-configuration and project setup.", "https://www.youtube.com/watch?v=vtPkZqGNvGI", 1, 15);
            addLesson(c4, "Building REST APIs", "Creating CRUD endpoints with Spring MVC.", "https://www.youtube.com/watch?v=vtPkZqGNvGI&t=300s", 2, 25);
            addLesson(c4, "Spring Data JPA", "Database operations with JPA repositories and entities.", "https://www.youtube.com/watch?v=vtPkZqGNvGI&t=600s", 3, 30);
            addLesson(c4, "Spring Security", "Authentication and authorization with Spring Security and JWT.", "https://www.youtube.com/watch?v=vtPkZqGNvGI&t=900s", 4, 35);

            // Course 5: AWS Cloud
            Course c5 = new Course();
            c5.setTitle("AWS Cloud Practitioner");
            c5.setDescription("Get certified in AWS Cloud. Learn EC2, S3, RDS, Lambda, and other core AWS services. Includes exam preparation tips and hands-on labs.");
            c5.setInstructor("Alex Rivera");
            c5.setCategory("Cloud Computing");
            c5.setThumbnailUrl("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600");
            c5.setRating(4.5);
            c5.setDurationHours(25);
            c5.setLevel("Beginner");
            c5 = courseRepository.save(c5);

            addLesson(c5, "Cloud Computing Basics", "What is cloud computing and why AWS?", "https://www.youtube.com/watch?v=SOTamWNgDKc", 1, 15);
            addLesson(c5, "EC2 and Compute Services", "Launching and managing virtual servers on AWS.", "https://www.youtube.com/watch?v=SOTamWNgDKc&t=400s", 2, 25);
            addLesson(c5, "S3 Storage", "Object storage, buckets, and data management.", "https://www.youtube.com/watch?v=SOTamWNgDKc&t=800s", 3, 20);

            // Course 6: Machine Learning
            Course c6 = new Course();
            c6.setTitle("Machine Learning A-Z");
            c6.setDescription("Comprehensive machine learning course covering supervised and unsupervised learning, neural networks, and real-world ML project implementation.");
            c6.setInstructor("Dr. Lisa Park");
            c6.setCategory("Data Science");
            c6.setThumbnailUrl("https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600");
            c6.setRating(4.8);
            c6.setDurationHours(50);
            c6.setLevel("Advanced");
            c6 = courseRepository.save(c6);

            addLesson(c6, "ML Fundamentals", "Understanding machine learning types and algorithms.", "https://www.youtube.com/watch?v=i_LwzRmAUM", 1, 20);
            addLesson(c6, "Linear Regression", "Building your first predictive model.", "https://www.youtube.com/watch?v=i_LwzRmAUM&t=600s", 2, 25);
            addLesson(c6, "Classification Algorithms", "Logistic regression, decision trees, and random forests.", "https://www.youtube.com/watch?v=i_LwzRmAUM&t=1200s", 3, 30);

            System.out.println("=== Sample data loaded successfully ===");
        }
    }

    private void addLesson(Course course, String title, String content, String videoUrl, int order, int duration) {
        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setContent(content);
        lesson.setVideoUrl(videoUrl);
        lesson.setOrderIndex(order);
        lesson.setDurationMinutes(duration);
        lesson.setCourse(course);
        lessonRepository.save(lesson);
    }
}
