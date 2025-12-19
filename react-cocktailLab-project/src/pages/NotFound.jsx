import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import notFoundImage from '../resources/images/404Image.png'
import badRequestImage from '../resources/images/400badrequest.png'
import serverErrorImage from '../resources/images/servererror500.png'
import { NotFoundImage, ErrorContainer, ErrorCode, ErrorMessage, BackButton } from '../components/Layout.styled'

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // location.state에서 에러 정보 가져오기 (API 에러로부터 전달된 경우)
  const errorCode = location.state?.errorCode || 404
  const errorMessage = location.state?.errorMessage || '페이지를 찾을 수 없습니다.'
  
  // 에러 코드에 따른 이미지 설정
  const getErrorImage = (code) => {
    switch (code) {
      case 400:
        return badRequestImage
      case 500:
        return serverErrorImage
      default:
        return notFoundImage
    }
  }
  
  // 에러 코드에 따른 메시지 설정
  const getErrorMessage = (code) => {
    switch (code) {
      case 400:
        return '잘못된 요청입니다. 입력값을 확인해주세요.'
      case 403:
        return '접근 권한이 없습니다.'
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.'
      case 409:
        return '이미 사용 중인 정보입니다.'
      case 500:
        return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      default:
        return errorMessage || '오류가 발생했습니다.'
    }
  }

  return (
    <ErrorContainer>
      <NotFoundImage src={getErrorImage(errorCode)} alt={`Error ${errorCode}`} />
      <ErrorCode>Error {errorCode}</ErrorCode>
      <ErrorMessage>{getErrorMessage(errorCode)}</ErrorMessage>
      <BackButton onClick={() => navigate('/')}>홈으로 돌아가기</BackButton>
    </ErrorContainer>
  )
}

export default NotFound