package com.example.onlinelearning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private String instructor;
    private String category;
    private String thumbnailUrl;
    private Double rating;
    private Integer durationHours;
    private String level;
    private List<LessonResponse> lessons;
    private Integer totalLessons;
}
