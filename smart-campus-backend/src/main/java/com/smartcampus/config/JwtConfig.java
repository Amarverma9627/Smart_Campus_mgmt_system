package com.smartcampus.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtConfig {

    /**
     * Secret key used to sign JWT tokens.
     * Keep it long & random (preferably Base64 encoded).
     */
    private String secret = "MyVerySecretKeyMyVerySecretKey123456";

    /**
     * Expiration time in milliseconds (default: 1 day).
     */
    private long expiration = 86400000L;

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public long getExpiration() {
        return expiration;
    }

    public void setExpiration(long expiration) {
        this.expiration = expiration;
    }
}
