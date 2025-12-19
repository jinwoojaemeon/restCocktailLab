import React, { useEffect, useMemo } from 'react'
import {
  RecipesContainer,
  PageTitle,
  RecipesGrid,
  RecipeCard,
  RecipeImageContainer,
  RecipeImage,
  RecipeImagePlaceholder,
  RecipeContent,
  RecipeHeader,
  RecipeName,
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag,
  EmptyState,
  EmptyStateText
} from './Recipes.styled'
import { CocktailTypeBadge } from '../components/RecipeCard.styled'
import { useCocktailStore } from '../stores/cocktailStore'

const Recipes = () => {
  const { customCocktails, fetchCocktails } = useCocktailStore()

  // 서버에서 칵테일 목록 가져오기
  useEffect(() => {
    fetchCocktails()
  }, [fetchCocktails])

  // 일반 레시피(DEFAULT 타입)만 필터링
  const defaultRecipes = useMemo(() => {
    return customCocktails.filter(cocktail => cocktail.cocktailType === 'DEFAULT')
  }, [customCocktails])

  return (
    <RecipesContainer>
      <PageTitle>Cocktail Recipes</PageTitle>
      {defaultRecipes.length > 0 ? (
        <RecipesGrid>
          {defaultRecipes.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <RecipeImageContainer>
                {recipe.image ? (
                  <RecipeImage src={recipe.image} alt={recipe.name} />
                ) : (
                  <RecipeImagePlaceholder>🍹</RecipeImagePlaceholder>
                )}
              </RecipeImageContainer>
              <RecipeContent>
                <RecipeHeader>
                  <RecipeName>
                    {recipe.name}
                    <CocktailTypeBadge className="default">일반 레시피</CocktailTypeBadge>
                  </RecipeName>
                </RecipeHeader>
                <RecipeDescription>{recipe.description}</RecipeDescription>
                {recipe.instructions && (
                  <RecipeDescription style={{ marginTop: '12px', fontSize: '13px', fontStyle: 'italic' }}>
                    제조법: {recipe.instructions}
                  </RecipeDescription>
                )}
                <RecipeIngredients>
                  <IngredientsList>
                    {recipe.ingredients.map((ingredient, index) => (
                      <IngredientTag key={index}>{ingredient}</IngredientTag>
                    ))}
                  </IngredientsList>
                </RecipeIngredients>
              </RecipeContent>
            </RecipeCard>
          ))}
        </RecipesGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>등록된 일반 레시피가 없습니다.</EmptyStateText>
        </EmptyState>
      )}
    </RecipesContainer>
  )
}

export default Recipes