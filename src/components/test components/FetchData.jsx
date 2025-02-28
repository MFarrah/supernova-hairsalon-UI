import axios from "axios";
import {useEffect, useState} from "react";

function FetchData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchData() {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get ('https://jsonplaceholder.typicode.com/posts');
            setData(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>something is wrong.. : {error}</p>}

            <h2>Data:</h2>
            <button onClick={fetchData} type='button'>Fetch Data</button>
            <ul>
                {data.map((post) => (<li key={post.id}>
                    {post.title ? post.title : 'No title'}
                </li>))}
            </ul>

        </>
    )
}

export default FetchData;