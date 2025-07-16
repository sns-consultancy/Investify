package com.sns_consultancy.com.interior.app.Service;

import com.google.cloud.speech.v1.*;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    public String handleMessage(String input) {
        // Process the user input with your AI logic (e.g., GPT, Dialogflow)
        String response = processAIRequest(input);

        // You can customize responses with your own services
        if (input.toLowerCase().contains("vastu")) {
            response = "Would you like to check vastu guidelines or update recommendations?";
        }
        return response;
    }

    public String processAIRequest(String input) {
        // Here we can add logic to connect to an AI provider (e.g., OpenAI, Dialogflow)
        // Placeholder response
        return "AI response for: " + input;
    }

    // Speech-to-Text functionality
    public String speechToText(byte[] audio) throws Exception {
        SpeechClient speechClient = SpeechClient.create();

        ByteString audioData = ByteString.copyFrom(audio);

        RecognitionAudio recognitionAudio = RecognitionAudio.newBuilder()
                .setContent(audioData)
                .build();

        RecognitionConfig recognitionConfig = RecognitionConfig.newBuilder()
                .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                .setLanguageCode("en-US")
                .build();

        RecognizeResponse response = speechClient.recognize(recognitionConfig, recognitionAudio);

        StringBuilder transcript = new StringBuilder();
        for (SpeechRecognitionResult result : response.getResultsList()) {
            transcript.append(result.getAlternatives(0).getTranscript());
        }

        speechClient.close();
        return transcript.toString();
    }

    // Text-to-Speech functionality
    public byte[] textToSpeech(String input) throws Exception {
        TextToSpeechClient textToSpeechClient = TextToSpeechClient.create();

        SynthesisInput synthesisInput = SynthesisInput.newBuilder()
                .setText(input)
                .build();

        VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                .setLanguageCode("en-US")
                .setSsmlGender(SsmlVoiceGender.MALE)
                .build();

        AudioConfig audioConfig = AudioConfig.newBuilder()
                .setAudioEncoding(AudioEncoding.LINEAR16)
                .build();

        SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(synthesisInput, voice, audioConfig);

        textToSpeechClient.close();
        return response.getAudioContent().toByteArray();
    }
}

