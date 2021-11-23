import twitterLogo from './assets/twitter-logo.svg'
import React, {useEffect, useState} from "react"
import { AppContainer, Container, HeaderContainer, Header, SubText, FooterContainer, TwitterLogo, ConnectMintButton, FooterText, MintButton, Loader, LoaderContainer } from './AppStyledComponents'
import { ethers, providers } from 'ethers'
import myEpicNFT from './utils/MyEpicNFT.json'

// Constants
const TWITTER_HANDLE = 'Matteo_Mer'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
const CONTRACT_ADDRESS = '0x4F9EC0dE89e9a3aCa896210C8D85217537a8e70F'




const App = () => {

  const [currentAccount, setCurrentAccount] = useState("")
  const [isLoading, setIsLoading] = useState("")


  const connectListener = async () => {
    if (!window.ethereum) {
      console.error('Please install Metamask')
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const mintContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNFT.abi, provider.getSigner())

    mintContract.on("newNFTMinted", async (from, tokenId) => {

      console.log('A new NFT was minted.')
    })

  }

  const checkChain = async (ethereum) => {

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    const rinkebyChainId = "0x4"; 
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }
  }

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum){
      console.error('Please install Metamask.')
      return
    }
    checkChain(window.ethereum)
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })

    if (!accounts.length){
      console.log('Cannot find an account.')
      return
    }
    const account = accounts[0];
    console.log("Found an authorized account:", account);
    setCurrentAccount(account)
    connectListener()
  }

  const connectWallet = async () => {
    if (!window.ethereum){
      console.log('Please install Metamask.')
      return
    }
    checkChain(window.ethereum)
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

    if (accounts.length === 0){
      console.error('Error, cannot connect to account')
      return
    }

    console.log(`Connected to ${accounts[0]}`)
    setCurrentAccount(accounts[0])
    connectListener()
  }

  const mintNFT = async () => {
    if (!currentAccount || !window.ethereum) {
      console.log('Please connect to Metamask')
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const mintContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNFT.abi, provider.getSigner())

    const txn = await mintContract.mintNFT()

    setIsLoading("loading")
    await txn.wait()
    setIsLoading(txn.hash)

    console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`)

  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <ConnectMintButton onClick={connectWallet}>
      Connect to Wallet
    </ConnectMintButton>
  )

  const renderMintLink = () => {
    if (!isLoading) return <div></div>
    if (isLoading === "loading"){
      return (
        <LoaderContainer>
          <Loader></Loader>
        </LoaderContainer>
      )
    } else {
      const nftLink = `https://rinkeby.etherscan.io/tx/${isLoading}`
      return (
        <Container>
          <SubText>
            Congrats 🎉 Your NFT has been minted! You can see the transcation <a href={nftLink} target='_blank'>here</a> !
          </SubText>
        </Container>
      )
    }

  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <AppContainer>
      <Container>
        <HeaderContainer>
          <Header>The coolest NFT Galery you can find!</Header>
          <SubText>
            Beautiful squares, grey, and meaningful words.
          </SubText>
          {!currentAccount ? renderNotConnectedContainer() : <ConnectMintButton onClick={mintNFT}>Mint NFT!</ConnectMintButton>}
          {renderMintLink()}
        </HeaderContainer>
        <FooterContainer>
          <FooterText href="https://testnets.opensea.io/collection/wordsnft-e4zh5pnxlm" target="_blank" rel="noreferrer">🌊 View collection on Opensea</FooterText>
          <TwitterLogo alt="Twitter Logo" src={twitterLogo} />
          <FooterText
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</FooterText>
        </FooterContainer>
      </Container>
    </AppContainer>
  );
};

export default App;
