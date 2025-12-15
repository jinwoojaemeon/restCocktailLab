package com.kh.cocktailLab.repository;

import com.kh.cocktailLab.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    // 로그인 아이디로 회원 찾기
    @Query("SELECT m FROM Member m WHERE m.memberId = :memberId")
    Optional<Member> findByMemberId(@Param("memberId") String memberId);
    
    // 로그인 아이디 중복 체크
    @Query("SELECT COUNT(m) > 0 FROM Member m WHERE m.memberId = :memberId")
    boolean existsByMemberId(@Param("memberId") String memberId);
    
    // 이메일로 회원 찾기
    @Query("SELECT m FROM Member m WHERE m.email = :email")
    Optional<Member> findByEmail(@Param("email") String email);
    
    // 이메일 중복 체크
    @Query("SELECT COUNT(m) > 0 FROM Member m WHERE m.email = :email")
    boolean existsByEmail(@Param("email") String email);
}

