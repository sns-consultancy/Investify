package com.sns_consultancy.com.interior.app.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trade")
public class TradeController {

    @PostMapping("/buy")
    public ResponseEntity<String> buy(@RequestBody TradeRequest req) {
        String msg = String.format("Bought %d shares of %s", req.getQuantity(), req.getSymbol());
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/sell")
    public ResponseEntity<String> sell(@RequestBody TradeRequest req) {
        String msg = String.format("Sold %d shares of %s", req.getQuantity(), req.getSymbol());
        return ResponseEntity.ok(msg);
    }

    public static class TradeRequest {
        private String symbol;
        private int quantity;

        public String getSymbol() { return symbol; }
        public void setSymbol(String symbol) { this.symbol = symbol; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
}
