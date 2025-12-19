import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const API_BASE_URL = '/api'

// API 헬퍼 함수
const apiRequest = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  // 응답 본문을 먼저 텍스트로 읽기 (한 번만 읽을 수 있음)
  const contentType = response.headers.get('content-type') || ''
  const text = await response.text()

  if (!response.ok) {
    let errorData
    try {
      // JSON으로 파싱 시도
      if (contentType.includes('application/json')) {
        errorData = JSON.parse(text)
      } else {
        errorData = { 
          errorCode: response.status,
          errorMessage: text || `요청 실패 (${response.status} ${response.statusText})` 
        }
      }
    } catch (e) {
      // 파싱 실패 시 텍스트를 메시지로 사용
      errorData = { 
        errorCode: response.status,
        errorMessage: text || `요청 실패 (${response.status} ${response.statusText})` 
      }
    }
    
    // 에러 상세 정보 로깅
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      errorData
    })
    
    // 에러 객체 생성 (에러 코드와 메시지 포함)
    const error = new Error(errorData.errorMessage || errorData.message || `요청 실패 (${response.status})`)
    error.errorCode = errorData.errorCode || response.status
    error.errorMessage = errorData.errorMessage || errorData.message || error.message
    error.errors = errorData.errors // Validation 에러의 경우 필드별 에러 정보
    
    throw error
  }

  // 성공 응답 처리
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(text)
    } catch (e) {
      return text
    }
  } else {
    return text
  }
}

export const useCocktailStore = create(
  persist(
    (set, get) => ({
      customCocktails: [],
      loading: false,
      error: null,

      // 서버에서 칵테일 목록 가져오기
      fetchCocktails: async (memberNo = null) => {
        set({ loading: true, error: null })
        try {
          // 현재 로그인한 사용자 정보 가져오기
          const user = JSON.parse(localStorage.getItem('cocktail-lab-auth') || '{}')?.state?.user
          const currentMemberNo = memberNo || user?.memberNo
          
          // memberNo를 쿼리 파라미터로 전달
          const url = currentMemberNo 
            ? `${API_BASE_URL}/cocktails?memberNo=${currentMemberNo}`
            : `${API_BASE_URL}/cocktails`
          
          const data = await apiRequest(url)
          // ApiResponse 제거로 직접 배열 반환
          const cocktails = Array.isArray(data) ? data : []
          const mappedCocktails = cocktails.map(cocktail => ({
            id: cocktail.cocktailNo,
            name: cocktail.cocktailName,
            description: cocktail.description,
            ingredients: cocktail.ingredients || [],
            instructions: cocktail.instructions,
            image: cocktail.cocktailImagePath,
            cocktailType: cocktail.cocktailType || 'CUSTOM', // DEFAULT 또는 CUSTOM
            userId: cocktail.memberNo,
            likeCount: cocktail.likeCount || 0,
            isLiked: cocktail.isLiked || false,
            createdAt: cocktail.createdAt ? new Date(cocktail.createdAt).getTime() : Date.now(),
            updatedAt: cocktail.updatedAt ? new Date(cocktail.updatedAt).getTime() : null
          }))
          set({ customCocktails: mappedCocktails, loading: false })
          return mappedCocktails
        } catch (error) {
          console.error('칵테일 목록 조회 실패:', error)
          set({ error: error.message, loading: false })
          return []
        }
      },

      // 칵테일 생성
      addCocktail: async (cocktail, userId) => {
        try {
          // ingredients가 비어있으면 에러 발생 가능 - 최소 1개 필요
          if (!cocktail.ingredients || cocktail.ingredients.length === 0) {
            throw new Error('재료는 최소 1개 이상 필요합니다.')
          }

          if (!userId) {
            throw new Error('로그인이 필요합니다.')
          }

          const requestBody = {
            memberNo: userId,
            cocktailName: cocktail.name || '',
            description: cocktail.description || '',
            ingredients: cocktail.ingredients,
            instructions: cocktail.instructions || '',
            cocktailImagePath: cocktail.image || null
          }

          console.log('칵테일 생성 요청:', requestBody)
          console.log('요청 URL:', `${API_BASE_URL}/cocktails`)

          const response = await apiRequest(`${API_BASE_URL}/cocktails`, {
            method: 'POST',
            body: JSON.stringify(requestBody)
          })

          // 성공 메시지만 반환하므로 목록 새로고침 필요
          if (typeof response === 'string' && response.includes('성공')) {
            // 목록 새로고침
            const cocktails = await get().fetchCocktails()
            return cocktails[cocktails.length - 1] // 가장 최근 추가된 칵테일 반환
          }
          
          throw new Error('칵테일 생성에 실패했습니다.')
        } catch (error) {
          console.error('칵테일 생성 실패:', error)
          // 에러 메시지에 상세 정보 포함
          if (error.message) {
            alert(`칵테일 생성 실패: ${error.message}`)
          }
          throw error
        }
      },

      // 칵테일 수정
      updateCocktail: async (id, updatedCocktail, userId) => {
        try {
          if (!userId) {
            throw new Error('로그인이 필요합니다.')
          }

          const requestBody = {
            memberNo: userId,
            cocktailName: updatedCocktail.name,
            description: updatedCocktail.description || '',
            ingredients: updatedCocktail.ingredients || [],
            instructions: updatedCocktail.instructions || '',
            cocktailImagePath: updatedCocktail.image || null
          }

          const response = await apiRequest(`${API_BASE_URL}/cocktails/${id}`, {
            method: 'PUT',
            body: JSON.stringify(requestBody)
          })

          // 성공 메시지만 반환하므로 목록 새로고침 필요
          if (typeof response === 'string' && response.includes('수정')) {
            // 목록 새로고침
            await get().fetchCocktails()
            const cocktail = get().customCocktails.find(c => String(c.id) === String(id))
            return cocktail
          }
          
          throw new Error('칵테일 수정에 실패했습니다.')
        } catch (error) {
          console.error('칵테일 수정 실패:', error)
          throw error
        }
      },

      // 칵테일 삭제
      deleteCocktail: async (id, userId) => {
        try {
          if (!userId) {
            throw new Error('로그인이 필요합니다.')
          }

          await apiRequest(`${API_BASE_URL}/cocktails/${id}?memberNo=${userId}`, {
            method: 'DELETE'
          })

          set((state) => ({
            customCocktails: state.customCocktails.filter(cocktail => String(cocktail.id) !== String(id))
          }))
        } catch (error) {
          console.error('칵테일 삭제 실패:', error)
          throw error
        }
      },

      // 현재 로그인한 유저의 칵테일만 가져오기
      getUserCocktails: (userId) => {
        return get().customCocktails.filter(cocktail => cocktail.userId === userId)
      },

      // 사용자별 좋아요 상태 확인
      isLikedByUser: (id, userId) => {
        if (!userId) return false
        const cocktail = get().customCocktails.find(c => String(c.id) === String(id))
        return cocktail?.isLiked || false
      },

      // 좋아요 토글
      toggleLike: async (id, userId) => {
        if (!userId) return

        try {
          await apiRequest(`${API_BASE_URL}/cocktails/${id}/likes?memberNo=${userId}`, {
            method: 'POST'
          })

          // 성공 메시지만 반환하므로 목록 새로고침 필요
          await get().fetchCocktails()
        } catch (error) {
          console.error('좋아요 토글 실패:', error)
          throw error
        }
      },

      // 좋아요 개수 조회
      getLikeCount: (id) => {
        const cocktail = get().customCocktails.find(c => String(c.id) === String(id))
        return cocktail?.likeCount || 0
      }
    }),
    {
      name: 'cocktail-lab-cocktails',
    }
  )
)
