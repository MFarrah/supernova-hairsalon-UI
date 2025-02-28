import {useState} from "react";

function ReusableForm({type1, placeholder1, onChange1}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
        <h1>ReusableForm title (h1)</h1>
            <input
                type={type1}
                placeholder={placeholder1}
                onChange={onChange1}
            />
        </>

    );
}
export default ReusableForm