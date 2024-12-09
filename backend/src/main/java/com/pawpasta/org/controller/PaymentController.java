package com.pawpasta.org.controller;

import com.pawpasta.org.model.PaymentRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> processPayment (@RequestBody PaymentRequest paymentRequest){
        // Basic Fee
        double basePee = 10000; //10,000 VND

        // Calculate Fee base on Distance

        double distance = paymentRequest.getDistance();
        double distanceFee = calculateDistanceFee(distance);

        double totalPrice = basePee + distanceFee;

        Map<String, Object> response = new HashMap<>();
        response.put("success",true);
        response.put("distance", distance);
        response.put("totalPrice", totalPrice);

        return ResponseEntity.ok(response);
    }

    private double calculateDistanceFee(double distance){
        if (distance <= 5000) {
            return distance * 0.07;
        }else if (distance <= 20000) {
            return distance * 0.05;
        }else{
            return distance * 0.03;
        }
    }


}
