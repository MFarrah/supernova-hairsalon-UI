import { useNavigate } from 'react-router-dom';

function DashboardDropdown() {
    const navigate = useNavigate();

    const navigateToPage = (page) => {
        if (page && page !== "/") {
            navigate(`/${page}`);
        }
    };

    return (
        <>
            <select onChange={(e) => navigateToPage(e.target.value)}>
                <option value="/" >please select a page</option>
                <option value="PostEmployeePage">Post Employee (Admin)</option>
                <option value="PostOrderPage">Post Order (Admin)</option>
            </select>
        </>
    );
}

export default DashboardDropdown;