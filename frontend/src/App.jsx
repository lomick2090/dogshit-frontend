import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import dogshit from './ABIs/dogshit.json'
import Header from './components/Header'
import NameChange from './components/NameChange'

export default function App() {
    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum));
    const [walletInfo, setWalletInfo] = useState({});
    const [dogShitContract, setDogShitContract] = useState()
    const [name, setName] = useState('dogshitcoin')
    const [nameInput, setNameInput]= useState('')

    function handleChange(e) {
        const { value } = e.target
        setNameInput(value)
    }

    async function handleSubmit() {
        try {
            const connectedDogShit = dogShitContract.connect(walletInfo.signer)
            let tx = connectedDogShit.addWord(nameInput)

        } catch(err) {
            console.log(err)
        }

        let yo = tx.wait();
        alert("You've added " + nameInput + " to the name!")
        setNameInput('')
    }

    async function initialize() {
        const dogShitAddy = '0x1B903E8C442c38ABDA0c2d9701B023A72F27F988'
        setDogShitContract(new ethers.Contract(dogShitAddy, dogshit, provider))
    }

    useEffect(() => {
        initialize()
    }, [])

    provider.provider.on('chainChanged', () => {
        window.location.reload()
    })

    provider.provider.on("accountsChanged", () => {
        connectWallet();
    })

    async function connectWallet() {
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
        const accounts = await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()


        setWalletInfo(prevInfo => {
            return {
                ...prevInfo,
                address: accounts[0],
                signer,
            }
        })
    }

    async function getName() {
        setName(await dogShitContract.name())
    }

    if (dogShitContract) {
        getName()
    }

    return (
        <div>
            <p className='name'>{name}</p>
            <Header 
                getAccount={connectWallet} 
                walletInfo={walletInfo} 
            />

            <div className="page">
            <div className="namechange">
                <h1>Add Name To Coin:</h1>

                <input type="text" value={nameInput} onChange={(e) => handleChange(e)} name='nameinput' />

                <button onClick={handleSubmit}>Submit Name</button>

            </div>

            </div>


        </div>
    )
}