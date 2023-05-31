import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const BettingPage = () => {
    const [socket, setSocket] = useState(null);
    const [topics, setTopics] = useState(['Football', 'Basketball', 'Cricket', 'Tennis', 'Baseball']);
    const [myTopics, setMyTopics] = useState([]);
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const newSocket = io("https://localhost:3000");

        newSocket.on("new_topic", (topic) => {
            setMyTopics((prevTopics) => [...prevTopics, topic]);
            setTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
        });

        newSocket.on("remove_topic", (topic) => {
            setMyTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
            setTopics((prevTopics) => [...prevTopics, topic]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const addTopic = (topic) => {
        socket.emit('new_topic', topic);
    };

    const removeTopic = (topic) => {
        socket.emit('remove_topic', topic);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
                    <h1 className="text-3xl font-bold mb-4">Betting Page</h1>
                    <div className="w-full max-w-md bg-white rounded shadow-md p-4 mb-4">
                        <h2 className="text-2xl font-semibold mb-2">Please log in to see the topics</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
                <h1 className="text-3xl font-bold mb-4">Betting Page</h1>
                <div className="w-full max-w-md bg-white rounded shadow-md p-4 mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Topics</h2>
                    <div className="flex flex-col">
                        {topics.map((topic, index) => (
                            <div key={index} className="bg-blue-100 hover:bg-blue-200 rounded px-3 py-1 mb-1 cursor-pointer" onClick={() => addTopic(topic)}>{topic}</div>
                        ))}
                    </div>
                </div>
                <div className="w-full max-w-md bg-white rounded shadow-md p-4">
                    <h2 className="text-2xl font-semibold mb-2">My Topics</h2>
                    <div className="flex flex-col">
                        {myTopics.map((topic, index) => (
                            <div key={index} className="bg-green-100 hover:bg-green-200 rounded px-3 py-1 mb-1 cursor-pointer" onClick={() => removeTopic(topic)}>{topic}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BettingPage;
