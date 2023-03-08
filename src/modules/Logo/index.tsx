import { useNavigate } from 'react-router-dom'

function Logo() {
  const navigate = useNavigate()

  return (
    <img
      onClick={() => {
        navigate('/')
      }}
      style={{ borderRadius: '11px', cursor: 'pointer' }}
      width='170'
      height='60'
      src='https://likealocal.co.kr/wp-content/uploads/2022/02/cropped-대지-1@4x.png'
      className='custom-logo'
      alt='Like a local, 라이크어로컬'
      decoding='async'
      srcSet='https://likealocal.co.kr/wp-content/uploads/2022/02/cropped-대지-1@4x.png 1701w, https://likealocal.co.kr/wp-content/uploads/2022/02/cropped-대지-1@4x-300x110.png 300w, https://likealocal.co.kr/wp-content/uploads/2022/02/cropped-대지-1@4x-1024x374.png 1024w, https://likealocal.co.kr/wp-content/uploads/2022/02/cropped-대지-1@4x-768x281.png 768w, https://likealocal.co.kr/wp-content/uploads/2022/02/cropped-대지-1@4x-1536x562.png 1536w'
      sizes='(max-width: 1701px) 100vw, 1701px'
    />
  )
}

export default Logo
