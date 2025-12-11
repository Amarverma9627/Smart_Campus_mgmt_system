package com.smartcampus.websocket;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class IncidentWebSocketHandler extends TextWebSocketHandler {

    // Active client sessions
    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("WebSocket connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Jo message client bheje, abhi ke liye broadcast kar rahe hain (echo style)
        String payload = message.getPayload();
        System.out.println("Received message: " + payload);

        // Broadcast to all connected sessions
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

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.out.println("WebSocket error: " + exception.getMessage());
    }

    // Helper: server se message push karne ke liye
    public void sendToAll(String message) {
        for (WebSocketSession ws : sessions) {
            if (ws.isOpen()) {
                try {
                    ws.sendMessage(new TextMessage(message));
                } catch (Exception e) {
                    System.out.println("Error sending message: " + e.getMessage());
                }
            }
        }
    }
}
