package com.kh.cocktailLab.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long expiration;

    public JwtTokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expiration = expiration;
    }

    /**
     * JWT 토큰 생성
     * @param memberId 회원 아이디
     * @param memberNo 회원 번호
     * @return JWT 토큰 문자열
     */
    public String generateToken(String memberId, Long memberNo) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .subject(memberId)
                .claim("memberNo", memberNo)
                .claim("role", "USER")
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    /**
     * 토큰에서 회원 아이디 추출
     */
    public String getMemberIdFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    /**
     * 토큰에서 회원 번호 추출
     */
    public Long getMemberNoFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.get("memberNo", Long.class);
    }

    /**
     * 토큰에서 권한 추출
     */
    public String getRoleFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.get("role", String.class);
    }

    /**
     * 토큰 유효성 검증 및 Claims 반환
     * 검증 성공 시 Claims를 포함한 Optional 반환, 실패 시 Optional.empty() 반환
     */
    public Optional<Claims> validateToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return Optional.of(claims);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    /**
     * 토큰에서 Claims 추출
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

