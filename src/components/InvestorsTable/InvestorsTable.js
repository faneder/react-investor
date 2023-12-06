import React, {useEffect, useState} from "react";
import {getInvestorsByFirmIds} from '../../api/investorApi';

const firmIds = [2670, 2792, 332, 3611];

const InvestorsTable = () => {
    const [investors, setInvestors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getInvestorsByFirmIds(firmIds);
                setInvestors(response.data);
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) return <p>{error}</p>;

    return (
        <table className="investors-table">
            <caption className="caption">Investors</caption>
            <thead>
            <tr>
                <th>FirmId</th>
                <th>FirmName</th>
                <th>FirmType</th>
                <th>Address</th>
            </tr>
            </thead>
            <tbody>
            {investors && investors.map((investor, index) => (
                <tr key={index}>
                    <td>{investor.firmID}</td>
                    <td>{investor.firmName}</td>
                    <td>{investor.firmType}</td>
                    <td>{investor.address}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default InvestorsTable;