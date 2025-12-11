package com.smartcampus.config;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class IncidentWebSocketHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("WebSocket connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Received message: " + payload);

        // Broadcast to all
        for (WebSocketSession ws : sessions) {
            if (ws.isOpen()) {
                ws.sendMessage(new TextMessage(payload));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket disconnected: " + session.getId());
    }

    // Server-side push helper
    public void sendToAll(String message) {
        for (WebSocketSession ws : sessions) {
            if (ws.isOpen()) {
                try {
                    ws.sendMessage(new TextMessage(message));
                } catch (Exception e) {
                    System.out.println("Error sending WS message: " + e.getMessage());
                }
            }
        }
    }
}
