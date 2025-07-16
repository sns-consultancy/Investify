package com.sns_consultancy.com.interior.app.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {


    @GetMapping("/api/translate")
    public Map<String, String> translate(
            @RequestParam(value = "text", required = false) String text,
            @RequestParam("lang") String lang) {
        if (text == null || text.isEmpty()) {
            text = "Welcome to 7 Star Interior App";
        }
        Map<String, String> dummyTranslations = new HashMap<>();

        dummyTranslations.put("Welcome to 7 Star Interior App|es", "Bienvenido a la Aplicación 7 Star Interior");
        dummyTranslations.put("Welcome to 7 Star Interior App|fr", "Bienvenue dans l'application 7 Star Interior");

        dummyTranslations.put("Design with Voice. Visualize with AI. Approve with Ease.|es", "Diseña con voz. Visualiza con IA. Aprueba con facilidad.");
        dummyTranslations.put("Design with Voice. Visualize with AI. Approve with Ease.|fr", "Concevez avec la voix. Visualisez avec l'IA. Approuvez facilement.");

        dummyTranslations.put("Welcome to 7 Star Interior App|es", "Bienvenido a la Aplicación 7 Star Interior");
        dummyTranslations.put("Welcome to 7 Star Interior App|fr", "Bienvenue dans l'application 7 Star Interior");
        dummyTranslations.put("Welcome to 7 Star Interior App|hi", "7 स्टार इंटीरियर ऐप में आपका स्वागत है");
        dummyTranslations.put("Welcome to 7 Star Interior App|te", "7 స్టార్ ఇంటీరియర్ యాప్‌కు స్వాగతం");

        dummyTranslations.put("Design with Voice. Visualize with AI. Approve with Ease.|es", "Diseña con voz. Visualiza con IA. Aprueba con facilidad.");
        dummyTranslations.put("Design with Voice. Visualiza con IA. Aprueba con facilidad.|fr", "Concevez avec la voix. Visualisez avec l'IA. Approuvez facilement.");
        dummyTranslations.put("Design with Voice. Visualize with AI. Approve with Ease.|hi", "आवाज़ से डिज़ाइन करें। एआई से कल्पना करें। आसानी से स्वीकृत करें।");
        dummyTranslations.put("Design with Voice. Visualize with AI. Approve with Ease.|te", "వాయిస్‌తో డిజైన్ చేయండి. AIతో విజువలైజ్ చేయండి. సులభంగా ఆమోదించండి.");

        String key = text + "|" + lang;
        String translated = dummyTranslations.getOrDefault(key, text);
        Map<String, String> response = new HashMap<>();
        response.put("translation", translated);
        return response;
    }
}
