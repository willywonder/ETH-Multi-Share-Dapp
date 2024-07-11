import { useState } from 'react';
import { ethers } from 'ethers';
import useMultipleSend from '../hooks/useMultipleSend';

export default function Home() {
    const { sendETH } = useMultipleSend();
    const [addresses, setAddresses] = useState(['']);
    const [amounts, setAmounts] = useState(['']);
    const [loading, setLoading] = useState(false);

    const handleAddField = () => {
        setAddresses([...addresses, '']);
        setAmounts([...amounts, '']);
    };

    const handleChange = (index, field, value) => {
        const newField = [...field];
        newField[index] = value;
        field === addresses ? setAddresses(newField) : setAmounts(newField);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const amountsInWei = amounts.map(amount => ethers.utils.parseEther(amount));
            await sendETH(addresses, amountsInWei);
            alert('Transaction successful');
        } catch (error) {
            console.error(error);
            alert('Transaction failed');
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Multiple Send ETH</h1>
            <form onSubmit={handleSubmit}>
                {addresses.map((address, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Address"
                            value={addresses[index]}
                            onChange={(e) => handleChange(index, addresses, e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            value={amounts[index]}
                            onChange={(e) => handleChange(index, amounts, e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddField}>Add More</button>
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send ETH'}
                </button>
            </form>
        </div>
    );
}
