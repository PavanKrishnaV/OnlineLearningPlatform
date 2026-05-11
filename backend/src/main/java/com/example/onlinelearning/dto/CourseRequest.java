package com.example.onlinelearning.dto;

import lombok.Data;
import java.util.List;

@Data
public class CourseRequest {
    private String title;
    private String description;
    private String instructor;
    private String category;
    private String thumbnailUrl;
    private Double rating;
    private Integer durationHours;
    private String level;
    private List<LessonRequest> lessons;
}
