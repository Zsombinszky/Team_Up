package com.codecool.teamup.controller;

import com.codecool.teamup.model.feedback.Feedback;
import com.codecool.teamup.model.feedback.FeedbackDTO;
import com.codecool.teamup.model.guild.Guild;
import com.codecool.teamup.model.guild.GuildDTO;
import com.codecool.teamup.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/create")
    public void createFeedBack(@RequestParam long userId, @RequestBody FeedbackDTO feedbackDTO) {
        feedbackService.registerFeedback(userId, feedbackDTO);
    }

    @GetMapping("/all")
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }
}
