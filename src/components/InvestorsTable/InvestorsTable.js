import React, {useEffect, useState} from "react";
import {getInvestors} from '../../api/investorApi';
import {useNavigate} from "react-router-dom";

const firmIds = [2670, 2792, 332, 3611];

const InvestorsTable = () => {
    const [investors, setInvestors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getInvestors(firmIds);
                setInvestors(response.data);
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (firmId) => {
        navigate(`/investors/${firmId}`);
    }

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
            {investors.length > 0 ? (investors.map((investor, index) => (
                <tr data-testid="investor-row" role="row" key={index} onClick={() => handleRowClick(investor.firmID)}>
                    <td data-testid="firmID">{investor.firmID}</td>
                    <td data-testid="firmName">{investor.firmName}</td>
                    <td data-testid="firmType">{investor.firmType}</td>
                    <td data-testid="address">{investor.address}</td>
                </tr>
                ))
            ) : 'No investors found'}
            </tbody>
        </table>
    );
}

export default InvestorsTable;