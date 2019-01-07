package io.agibalov;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @RestController
    @Slf4j
    public static class DummyController {
        // Make sure to enable Google+ API for this google app
        private final static String GOOGLE_CLIENT_ID = "293281611213-o3e5d2df4nh6s2dke25gck5n5em2mma5.apps.googleusercontent.com";
        private final static String GOOGLE_CLIENT_SECRET = "htvmbOD5l_hON4sVDKj90CdY";

        private final static String FACEBOOK_CLIENT_ID = "1150208065128018";
        private final static String FACEBOOK_CLIENT_SECRET = "aa4f8e33d6c7b1076d7c2ca2205a2b0b";

        private final RestTemplate restTemplate = new RestTemplate();

        @PostMapping("/auth/google")
        public ResponseEntity<?> google(@RequestBody Ng2UiRequestDto ng2UiRequest) {
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.put("code", Arrays.asList(ng2UiRequest.oAuthData.code));
            body.put("client_id", Arrays.asList(ng2UiRequest.authorizationData.clientId));
            body.put("client_secret", Arrays.asList(GOOGLE_CLIENT_SECRET));
            body.put("redirect_uri", Arrays.asList(ng2UiRequest.authorizationData.redirectUri));
            body.put("grant_type", Arrays.asList("authorization_code"));
            body.put("scope", Arrays.asList("https://www.googleapis.com/auth/userinfo.profile"));

            GoogleTokenResponseDto response = restTemplate.postForObject(
                    "https://www.googleapis.com/oauth2/v4/token",
                    body,
                    GoogleTokenResponseDto.class);

            ResponseEntity<GoogleMeResponseDto> meResponse = restTemplate.exchange(
                    RequestEntity.get(URI.create("https://www.googleapis.com/plus/v1/people/me"))
                            .header("Authorization", String.format("%s %s",
                                    response.getTokenType(), response.getAccessToken()))
                    .build(),
                    GoogleMeResponseDto.class);

            return ResponseEntity.ok(Collections.singletonMap("message", meResponse.getBody()));
        }

        @PostMapping("/auth/facebook")
        public ResponseEntity<?> facebook(@RequestBody Ng2UiRequestDto ng2UiRequest) {
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.put("code", Arrays.asList(ng2UiRequest.oAuthData.code));
            body.put("client_id", Arrays.asList(ng2UiRequest.authorizationData.clientId));
            body.put("client_secret", Arrays.asList(FACEBOOK_CLIENT_SECRET));
            body.put("redirect_uri", Arrays.asList(ng2UiRequest.authorizationData.redirectUri));

            FacebookTokenResponseDto response = restTemplate.getForObject(
                    UriComponentsBuilder.fromHttpUrl("https://graph.facebook.com/v2.5/oauth/access_token")
                            .queryParams(body).toUriString(),
                    FacebookTokenResponseDto.class);

            FacebookMeResponseDto meDto = restTemplate.getForObject(
                    "https://graph.facebook.com/v2.5/me?fields={fields}&access_token={accessToken}",
                    FacebookMeResponseDto.class,
                    "id,name",
                    response.getAccessToken());

            return ResponseEntity.ok(Collections.singletonMap("message", meDto));
        }
    }

    @Data
    public static class Ng2UiRequestDto {
        @JsonProperty("authorizationData")
        private Ng2UiAuthorizationDataDto authorizationData;

        @JsonProperty("oauthData")
        private Ng2UiOAuthData oAuthData;

        @JsonProperty("userData")
        private Ng2UiUserDataDto userData;
    }

    @Data
    public static class Ng2UiAuthorizationDataDto {
        @JsonProperty("response_type")
        private String responseType;

        @JsonProperty("client_id")
        private String clientId;

        @JsonProperty("redirect_uri")
        private String redirectUri;

        @JsonProperty("state")
        private String state;

        @JsonProperty("scope")
        private String scope;

        @JsonProperty("display")
        private String display;
    }

    @Data
    public static class Ng2UiOAuthData {
        @JsonProperty("state")
        private String state;

        @JsonProperty("code")
        private String code;

        @JsonProperty("authuser")
        private String authUser;

        @JsonProperty("session_state")
        private String sessionState;

        @JsonProperty("prompt")
        private String prompt;
    }

    @Data
    public static class Ng2UiUserDataDto {
    }

    @Data
    public static class GoogleTokenResponseDto {
        @JsonProperty("access_token")
        private String accessToken;

        @JsonProperty("token_type")
        private String tokenType;

        @JsonProperty("expires_in")
        private int expiresIn;

        @JsonProperty("refresh_token")
        private String refreshToken;

        @JsonProperty("id_token")
        private String idToken;
    }

    @Data
    public static class GoogleMeResponseDto {
        @JsonProperty("id")
        private String id;

        @JsonProperty("displayName")
        private String displayName;
    }

    @Data
    public static class FacebookTokenResponseDto {
        @JsonProperty("access_token")
        private String accessToken;

        @JsonProperty("token_type")
        private String tokenType;

        @JsonProperty("expires_in")
        private int expiresIn;
    }

    @Data
    public static class FacebookMeResponseDto {
        @JsonProperty("id")
        private String id;

        @JsonProperty("name")
        private String name;
    }
}
