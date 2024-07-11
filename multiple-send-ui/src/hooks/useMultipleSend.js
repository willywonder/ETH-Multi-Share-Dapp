import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useMultipleSend = () => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initializeContract = async () => {
            const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_API_URL);
            const signer = provider.getSigner();
            const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
            const abi = [
                {
                    "inputs": [
                        { "internalType": "address payable[]", "name": "_addresses", "type": "address[]" },
                        { "internalType": "uint256[]", "name": "_amounts", "type": "uint256[]" }
                    ],
                    "name": "sendETH",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                }
            ];
            const multipleSendContract = new ethers.Contract(contractAddress, abi, signer);
            setContract(multipleSendContract);
        };
        initializeContract();
    }, []);

    const sendETH = async (addresses, amounts) => {
        if (!contract) return;
        const totalAmount = amounts.reduce((acc, amount) => acc.add(amount), ethers.BigNumber.from(0));
        const tx = await contract.sendETH(addresses, amounts, { value: totalAmount });
        await tx.wait();
    };

    return { sendETH };
};

export default useMultipleSend;
