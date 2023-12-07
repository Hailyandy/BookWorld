package com.chien.bookWorld.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse {
    private Long code = 0L;
    private String message = "Thành công!";
    private Integer totalPage;
    private Integer pageSize;
    private Long totalRecord;
    private Integer pageNumber;
    private Object data;

    public PageResponse(Integer totalPage, Integer pageSize, Long totalRecord, Integer pageNumber, Object data) {
        this.totalPage = totalPage;
        this.pageSize = pageSize;
        this.totalRecord = totalRecord;
        this.pageNumber = pageNumber;
        this.data = data;
    }
}
