package com.chien.bookWorld.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddFriendRequest {

    @NotBlank
    @Size(min = 1, max = 40)
    private Long receiverId;
}
