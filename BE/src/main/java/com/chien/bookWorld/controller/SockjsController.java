package com.chien.bookWorld.controller;

import com.chien.bookWorld.jwt.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

@Controller
public class SockjsController implements WebSocketHandler {

    @Autowired
    JwtUtils jwtUtils;
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        if (!session.getHandshakeHeaders().containsKey("Authorization")) {
            session.close(CloseStatus.NO_STATUS_CODE);
            return;
        }

        // Lấy token từ header
        String token = session.getHandshakeHeaders().getFirst("Authorization");



    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
