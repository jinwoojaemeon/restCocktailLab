package com.kh.cocktailLab.repository;

import com.kh.cocktailLab.entity.Cocktail;
import com.kh.cocktailLab.entity.CocktailType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Long> {
    
    // 회원 번호로 칵테일 목록 조회
    List<Cocktail> findByMemberMemberNo(Long memberNo);
    
    // 칵테일 이름으로 검색
    List<Cocktail> findByCocktailNameContaining(String cocktailName);
    
    // 칵테일 타입으로 조회
    List<Cocktail> findByCocktailType(CocktailType cocktailType);
    
    // 회원 번호와 타입으로 조회
    List<Cocktail> findByMemberMemberNoAndCocktailType(Long memberNo, CocktailType cocktailType);
}

