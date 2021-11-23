import styled, {keyframes} from 'styled-components'

export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }

`

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const AppContainer = styled.div`
  height: 100vh;
  background-color: #0d1116;
  overflow: scroll;
  text-align: center;
`

export const Container = styled.div`
  height: 100%;
  background-color: #0d1116;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const HeaderContainer = styled.div`
  padding-top: 30px;
`

export const Header = styled.p`
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  background: -webkit-linear-gradient(left, #ffd129 30%, #d10000 60%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const SubText = styled.p`
  font-size: 25px;
  color: white;
`

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`

export const TwitterLogo = styled.img`
  width: 35px;
  height: 35px;
`

export const FooterText = styled.a`
  color: white;
  font-size: 16px;
  font-weight: bold;
`

export const ConnectMintButton = styled.button`
  height: 45px;
  border: 0;
  width: auto;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: -webkit-linear-gradient(left, #ffd129, #d10000);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;
`

export const Loader = styled.div`
  border-top: 4px solid #ffd129;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  animation: ${spin} 1s linear infinite;
`

export const LoaderContainer = styled.div`
  display:flex;
  align-items: center;
  margin-top: 2em;
  flex-direction: column;
`