package com.example.onlinelearning.controller;

import com.example.onlinelearning.entity.Certificate;
import com.example.onlinelearning.service.CertificateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping("/generate/{courseId}")
    public ResponseEntity<Map<String, Object>> generate(@PathVariable("courseId") Long courseId, Authentication auth) {
        Certificate cert = certificateService.generateCertificate(auth.getName(), courseId);
        Map<String, Object> response = new HashMap<>();
        response.put("certificateNumber", cert.getCertificateNumber());
        response.put("courseName", cert.getCourse().getTitle());
        response.put("userName", cert.getUser().getFullName());
        response.put("issuedAt", cert.getIssuedAt());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> myCertificates(Authentication auth) {
        List<Certificate> certs = certificateService.getCertificatesByUser(auth.getName());
        List<Map<String, Object>> result = certs.stream().map(c -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("certificateNumber", c.getCertificateNumber());
            map.put("courseName", c.getCourse().getTitle());
            map.put("issuedAt", c.getIssuedAt());
            return map;
        }).toList();
        return ResponseEntity.ok(result);
    }
}
