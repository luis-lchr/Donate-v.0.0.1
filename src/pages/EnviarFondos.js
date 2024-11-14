import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './CrowdfundingABI.json';

const contractAddress = "0xa83f6c60FcaD935A2748d83c91df1CFa58102D06"; // Reemplaza con la dirección de tu contrato

const EnviarFondos = () => {
    const [monto, setMonto] = useState("");
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    const handleChange = (e) => setMonto(e.target.value);

    const sendFunds = async () => {
        if (web3 && contract && account) {
            try {
                await contract.methods.sendFunds().send({
                    from: account,
                    value: web3.utils.toWei(monto, 'ether')
                });
                alert("Fondos enviados con éxito");
            } catch (error) {
                console.error("Error al enviar fondos:", error);
            }
        }
    };

    const connectWeb3 = async () => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            const accounts = await web3Instance.eth.requestAccounts();
            setAccount(accounts[0]);
            const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
            setContract(contractInstance);
        } else {
            console.error("MetaMask no está instalado.");
        }
    };

    useEffect(() => {
        connectWeb3();
    }, []);

    return (
        <div>
            <h2>Enviar Fondos</h2>
            <input type="number" value={monto} onChange={handleChange} placeholder="Monto en ETH" />
            <button onClick={sendFunds}>Enviar</button>
        </div>
    );
};

export default EnviarFondos;
