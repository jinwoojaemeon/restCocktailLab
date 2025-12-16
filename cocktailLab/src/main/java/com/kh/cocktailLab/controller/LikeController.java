package com.kh.cocktailLab.controller;

import com.kh.cocktailLab.dto.response.LikeResponse;
import com.kh.cocktailLab.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cocktails")
@RequiredArgsConstructor
public class LikeController {
    
    private final LikeService likeService;
    
    // 좋아요 토글
    @PostMapping("/{cocktailNo}/likes")
    public ResponseEntity<String> toggleLike(
            @PathVariable Long cocktailNo,
            @RequestParam Long memberNo) {
        
        if (memberNo == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.BAD_REQUEST);
        }
        
        LikeResponse response = likeService.toggleLike(cocktailNo, memberNo);
        return new ResponseEntity<>("좋아요 처리 완료", HttpStatus.OK);
    }
    
    // 좋아요 개수 조회
    @GetMapping("/{cocktailNo}/likes")
    public ResponseEntity<Map<String, Long>> getLikeCount(@PathVariable Long cocktailNo) {
        Long likeCount = likeService.getLikeCount(cocktailNo);
        Map<String, Long> result = new HashMap<>();
        result.put("likeCount", likeCount);
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    // 사용자가 좋아요 했는지 확인
    @GetMapping("/{cocktailNo}/likes/check")
    public ResponseEntity<Map<String, Boolean>> checkLiked(
            @PathVariable Long cocktailNo,
            @RequestParam(required = false) Long memberNo) {
        
        Boolean isLiked = likeService.isLikedByMember(cocktailNo, memberNo);
        Map<String, Boolean> result = new HashMap<>();
        result.put("isLiked", isLiked != null && isLiked);
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

