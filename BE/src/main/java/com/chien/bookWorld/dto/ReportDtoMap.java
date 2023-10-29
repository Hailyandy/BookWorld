package com.chien.bookWorld.dto;

import org.modelmapper.PropertyMap;

import com.chien.bookWorld.entity.Report;

public class ReportDtoMap extends PropertyMap<Report, ReportDto> {

    @Override
    protected void configure() {
        // TODO Auto-generated method stub
        map().setUserName(source.getUser().getName());
        map().setUrlAvatar(source.getUser().getUrlAvatar());
    }

}
