package com.codecool.teamup.service;

import com.codecool.teamup.model.feedback.Feedback;
import com.codecool.teamup.model.feedback.FeedbackDTO;
import com.codecool.teamup.model.user.User;
import com.codecool.teamup.repository.FeedbackRepository;
import com.codecool.teamup.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    public void registerFeedback(long userId, FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackText(feedbackDTO.feedbackText());

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            feedback.setUser(user);
            feedback.setUserName(user.getUsername());
            feedback.setUserImage(user.getImage());
            feedback.setUserLevel(user.getLevel());
            feedbackRepository.save(feedback);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
}
