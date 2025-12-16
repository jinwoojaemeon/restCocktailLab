package com.kh.cocktailLab.controller;

import com.kh.cocktailLab.dto.request.LoginRequest;
import com.kh.cocktailLab.dto.request.SignupRequest;
import com.kh.cocktailLab.dto.response.MemberResponse;
import com.kh.cocktailLab.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
    
    private final MemberService memberService;
    
    // 회원가입
    @PostMapping
    public ResponseEntity<MemberResponse> signup(@Valid @RequestBody SignupRequest request) {
        MemberResponse response = memberService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<MemberResponse> login(@Valid @RequestBody LoginRequest request) {
        MemberResponse response = memberService.login(request);
        return ResponseEntity.ok(response);
    }
    
    // 아이디 중복 체크
    @GetMapping("/check-memberId")
    public ResponseEntity<Map<String, Boolean>> checkMemberId(@RequestParam String memberId) {
        boolean exists = memberService.checkMemberIdExists(memberId);
        Map<String, Boolean> result = new HashMap<>();
        result.put("available", !exists);
        
        return ResponseEntity.ok(result);
    }
    
    // 회원 정보 조회
    @GetMapping("/{memberNo}")
    public ResponseEntity<MemberResponse> getMember(@PathVariable Long memberNo) {
        MemberResponse response = memberService.getMember(memberNo);
        return ResponseEntity.ok(response);
    }
}

