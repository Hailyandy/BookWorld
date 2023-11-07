package com.chien.bookWorld.dto.DtoMap;

import org.modelmapper.PropertyMap;

import com.chien.bookWorld.dto.UserAndFriendshipDto;
import com.chien.bookWorld.entity.User;

public class UserToUserFriendshipDto extends PropertyMap<User, UserAndFriendshipDto> {

    @Override
    protected void configure() {
        // TODO Auto-generated method stub

    }

}
