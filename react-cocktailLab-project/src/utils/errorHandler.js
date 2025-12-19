import { ROUTES } from '../routes/routes'

/**
 * 에러 코드에 따라 NotFound 페이지로 라우팅할지 결정
 * @param {Error} error - 에러 객체 (errorCode 속성 포함 가능)
 * @param {Function} navigate - React Router의 navigate 함수
 * @returns {boolean} NotFound로 라우팅했는지 여부
 */
export const handleApiError = (error, navigate) => {
  const errorCode = error.errorCode || error.status || 500
  const errorMessage = error.errorMessage || error.message || '오류가 발생했습니다.'
  
  // 주요 에러 코드(404, 403, 500)는 NotFound 페이지로 이동
  if (errorCode === 404 || errorCode === 403 || errorCode === 500) {
    navigate(ROUTES.NOTFOUND, { 
      state: { 
        errorCode: errorCode, 
        errorMessage: errorMessage 
      } 
    })
    return true
  }
  
  return false
}
