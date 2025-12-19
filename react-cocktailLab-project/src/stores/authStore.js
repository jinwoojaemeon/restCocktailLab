import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const API_BASE_URL = '/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { memberNo: Long, memberId: String, nickname: String }

      // 아이디 중복 체크
      checkUsernameExists: async (memberId) => {
        try {
          const response = await fetch(`${API_BASE_URL}/members/check-memberId?memberId=${encodeURIComponent(memberId)}`)
          const data = await response.json()
          
          // ApiResponse 제거로 직접 Map 반환
          if (data && typeof data === 'object' && 'available' in data) {
            return !data.available // available이 false면 존재함
          }
          return false
        } catch (error) {
          console.error('아이디 중복 체크 실패:', error)
          return false
        }
      },

      // 회원가입
      signup: async (userData) => {
        const { username: memberId, password: userPwd, nickname, email } = userData
        
        try {
          const response = await fetch(`${API_BASE_URL}/members`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              memberId,
              userPwd,
              nickname,
              email
            })
          })

          const data = await response.json()

          if (response.ok && data) {
            // ApiResponse 제거로 직접 MemberResponse 반환
            set({
              user: {
                memberNo: data.memberNo,
                memberId: data.memberId,
                nickname: data.nickname
              }
            })
            return { success: true }
          } else {
            // 에러 코드와 메시지 포함
            const errorCode = data.errorCode || response.status
            const errorMessage = data.errorMessage || (typeof data === 'string' ? data : '회원가입에 실패했습니다.')
            return { 
              success: false, 
              error: errorMessage,
              errorCode: errorCode
            }
          }
        } catch (error) {
          console.error('회원가입 실패:', error)
          return { success: false, error: '회원가입 중 오류가 발생했습니다.' }
        }
      },

      // 로그인
      login: async (memberId, userPwd) => {
        try {
          const response = await fetch(`${API_BASE_URL}/members/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              memberId,
              userPwd
            })
          })

          const data = await response.json()

          if (response.ok && data) {
            // ApiResponse 제거로 직접 MemberResponse 반환
            set({
              user: {
                memberNo: data.memberNo,
                memberId: data.memberId,
                nickname: data.nickname
              }
            })
            return { success: true }
          } else {
            // 에러 코드와 메시지 포함
            const errorCode = data.errorCode || response.status
            const errorMessage = data.errorMessage || (typeof data === 'string' ? data : '아이디 또는 비밀번호가 올바르지 않습니다.')
            return { 
              success: false, 
              error: errorMessage,
              errorCode: errorCode
            }
          }
        } catch (error) {
          console.error('로그인 실패:', error)
          return { success: false, error: '로그인 중 오류가 발생했습니다.' }
        }
      },

      // 로그아웃
      logout: () => set({ user: null }),
    }),
    {
      name: 'cocktail-lab-auth',
    }
  )
)
