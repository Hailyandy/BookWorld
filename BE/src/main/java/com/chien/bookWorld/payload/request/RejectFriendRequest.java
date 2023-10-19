package com.chien.bookWorld.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RejectFriendRequest {
    @NotNull(message = "Not null")
    private Long senderId;
}
