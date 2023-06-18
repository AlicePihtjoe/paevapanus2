import { useEffect, useState } from 'react';
import styles from './LogPage.module.css';

function AdminPage() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('api/logs')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }
                setLogs(data);
            })
            .catch(error => {
                console.error('An error occurred:', error);
                setError(error.message);
            });
    }, []);

    if (error) {
        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Log Page</h1>
                <h2 className={styles.errorText}>Error: {error}</h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Log Page</h1>
            <h2 className={styles.subHeader}>Event Logs</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.slice().reverse().map((log, index) => {
                        const dateObject = new Date(log.timestamp);
                        const date = dateObject.toLocaleDateString();
                        const time = dateObject.toLocaleTimeString();

                        return (
                            <tr key={index}>
                                <td>{log.message}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{log.timestamp}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;