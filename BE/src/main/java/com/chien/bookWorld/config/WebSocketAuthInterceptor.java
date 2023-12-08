package com.chien.bookWorld.config;


import com.chien.bookWorld.jwt.JwtUtils;
import com.chien.bookWorld.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;

import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;
    private Message<?> Exception;
    private static final Logger logger = LoggerFactory.getLogger(WebSocketAuthInterceptor.class);

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        final var accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        final var cmd = accessor.getCommand();
        String jwt = null;
        if (StompCommand.CONNECT == cmd || StompCommand.SEND == cmd) {
            final var requestTokenHeader = accessor.getFirstNativeHeader("Authorization");
            if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer")) {
                jwt = requestTokenHeader.substring(7);
                logger.info("test jwt web config interceptor:  " + jwt);
            }
            if (!jwtUtils.validateJwtToken(jwt)){
                return Exception;
            }


        }
        return message;
    }

}





