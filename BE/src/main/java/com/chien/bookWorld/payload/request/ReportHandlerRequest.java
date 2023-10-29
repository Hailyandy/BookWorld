package com.chien.bookWorld.payload.request;

import com.chien.bookWorld.entity.ReportStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportHandlerRequest {
    private ReportStatus status;
    private Long id;
}
