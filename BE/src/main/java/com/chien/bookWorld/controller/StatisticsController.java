package com.chien.bookWorld.controller;

import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.BookBasketService;
import com.chien.bookWorld.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/statistics")
@PreAuthorize("hasRole('ADMIN') ")
public class StatisticsController {
    @Autowired
    private UserService userService;

    @Autowired
    private BookBasketService bookBasketService;

    @GetMapping("new-registrations-by-month/{year}")
    public ResponseEntity<SuccessResponse> getNewRegistrationsByMonth(@PathVariable int year) {
        return ResponseEntity.status(200).body(userService.getNewRegistrationsByMonth(year));
    }

    @GetMapping("bookbasket/{year}")
    public ResponseEntity<SuccessResponse> getCountBookBasketStatus(@PathVariable int year) {
        return ResponseEntity.status(200).body(bookBasketService.statisticBookBasketStatus(year));
    }
}
