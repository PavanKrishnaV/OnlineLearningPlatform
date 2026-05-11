package com.example.onlinelearning.dto;

import lombok.Data;

@Data
public class LessonRequest {
    private String title;
    private String content;
    private String videoUrl;
    private Integer orderIndex;
    private Integer durationMinutes;
}
