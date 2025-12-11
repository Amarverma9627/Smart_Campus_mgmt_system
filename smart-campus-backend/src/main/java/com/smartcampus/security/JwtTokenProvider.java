package com.smartcampus.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.smartcampus.config.JwtConfig;
import com.smartcampus.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long jwtExpirationInMs;

    public JwtTokenProvider(JwtConfig jwtConfig) {
        this.key = Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes());
        this.jwtExpirationInMs = jwtConfig.getExpiration();
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(user.getEmail()) // email as username
                .claim("role", user.getRole().name())
                .claim("userId", user.getId())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key) // algorithm inferred from key
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)   // validate + parse
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (ExpiredJwtException ex) {
            System.out.println("JWT expired: " + ex.getMessage());
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT: " + ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT: " + ex.getMessage());
        } catch (IllegalArgumentException ex) {
            System.out.println("Empty JWT claims: " + ex.getMessage());
        }
        return false;
    }
}
