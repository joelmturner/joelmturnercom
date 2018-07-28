import styled from 'styled-components'

const sizer = size => {
  let sized
  switch (size) {
    default:
    case 's':
      sized = '2rem'
      break
    case 'l':
      sized = '8rem'
      break
  }
  return sized
}

const Avatar = styled.div`
    background-image: url('${({ url }) => url}');
    background-size: cover;
    border-radius: 50%;
    width: ${({ size }) => sizer(size)};
    height: ${({ size }) => sizer(size)};
`

export default Avatar
