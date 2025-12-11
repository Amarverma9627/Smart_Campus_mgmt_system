package com.smartcampus.util;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * Simple utility for sending plain-text emails.
 * Requires JavaMailSender bean configured in application.
 */
//@Component
public class EmailUtil {

    private final JavaMailSender mailSender;

    public EmailUtil(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleMail(String to, String subject, String text) {
        if (to == null || to.isBlank()) {
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject != null ? subject : "");
        message.setText(text != null ? text : "");

        mailSender.send(message);
    }

    // Example helper for incident alert
    public void sendIncidentAlert(String to, String incidentSummary) {
        String subject = "Smart Campus: New Incident Alert";
        String body = "A new incident has been reported:\n\n" +
                incidentSummary + "\n\n" +
                "Please check the Smart Campus dashboard for details.";
        sendSimpleMail(to, subject, body);
    }
}
