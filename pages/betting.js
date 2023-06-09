import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import Modal from 'react-modal';

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        position: 'relative',
        width: '80%',
        height: 'auto',
        padding: '2em',
        outline: 'none',
        borderRadius: '15px',
        backgroundColor: '#f4f4f4',
    },
};

Modal.setAppElement('#__next');

const TopicInfo = ({ topic, details, editing, onEdit }) => (
    <div>
        <h2 style={{ fontSize: '2em', marginBottom: '0.5em' }}>{topic}</h2>
        {editing ? (
            <textarea defaultValue={details} onChange={(e) => onEdit(e.target.value)} style={{ width: '100%', height: '200px' }} />
        ) : (
            <p style={{ marginBottom: '1em' }}>{details}</p>
        )}
    </div>
);

const BettingPage = () => {
    const [socket, setSocket] = useState(null);
    const [topics, setTopics] = useState(['Football', 'Basketball', 'Cricket', 'Tennis', 'Baseball']);
    const [myTopics, setMyTopics] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTopic, setCurrentTopic] = useState(null);
    const { isAuthenticated, isLoading, user } = useAuth();

    const [topicDetails, setTopicDetails] = useState({
        'Football': 'Details about Football',
        'Basketball': 'Details about Basketball',
        'Cricket': 'Details about Cricket',
        'Tennis': 'Details about Tennis',
        'Baseball': 'Details about Baseball',
    });

    const [editing, setEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState('');

    useEffect(() => {
        const newSocket = io('https://localhost:3000');

        newSocket.on('new_topic', (topic) => {
            setMyTopics((prevTopics) => [...prevTopics, topic]);
            setTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
        });

        newSocket.on('remove_topic', (topic) => {
            setMyTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
            setTopics((prevTopics) => [...prevTopics, topic]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (user) {
            fetch(`/api/topics?userId=${user.id}`)
                .then((response) => response.json())
                .then((data) => {
                    setMyTopics(data.topics.map((topic) => topic.name));
                })
                .catch((error) => console.error('Error fetching topics:', error));
        }
    }, [user]);

    const openModal = (topic) => {
        setCurrentTopic(topic);
        setModalOpen(true);
    };

    const startEditing = (topic) => {
        setEditing(true);
        setEditedDetails(topicDetails[topic]);
    };

    const stopEditing = async (newDetails) => {
        setEditing(false);
        setTopicDetails({
            ...topicDetails,
            [currentTopic]: newDetails,
        });
    }

    const addTopic = async (topic) => {
        try {
            const response = await fetch('/api/topics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: topic,
                    description: topicDetails[topic],
                    userId: user.id,
                }),
            });

            if (response.ok) {
                const newTopic = await response.json();
                // setMyTopics((prevTopics) => [...prevTopics, newTopic.name]);
                closeModal();
                socket.emit('new_topic', newTopic.name);
            } else {
                throw new Error('Error creating topic');
            }
        } catch (error) {
            console.error('Error creating topic:', error);
        }
    };

    const removeTopic = async (topic) => {
        try {
            const response = await fetch(`/api/topics?topic=${topic}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // setMyTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
                socket.emit('remove_topic', topic);
            } else {
                throw new Error('Error removing topic');
            }
        } catch (error) {
            console.error('Error removing topic:', error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditing(false);
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
                            <div key={index} className="bg-blue-100 hover:bg-blue-200 rounded px-3 py-1 mb-1 cursor-pointer">
                                {topic}
                                <button onClick={() => openModal(topic)} className="bg-blue-600 hover:bg-blue-750 text-white font-bold px-4 rounded float-right">View</button>
                                <button onClick={() => addTopic(topic)} className="bg-green-600 hover:bg-green-750 text-white font-bold px-4 rounded float-right mr-2">Add</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full max-w-md bg-white rounded shadow-md p-4">
                    <h2 className="text-2xl font-semibold mb-2">My Topics</h2>
                    <div className="flex flex-col">
                        {myTopics.map((topic, index) => (
                            <div key={index} className="bg-blue-100 hover:bg-blue-200 rounded px-3 py-1 mb-1 cursor-pointer">
                                {topic}
                                <button onClick={() => openModal(topic)} className="bg-blue-600 hover:bg-blue-750 text-white font-bold px-4 rounded float-right">View</button>
                                <button onClick={() => removeTopic(topic)} className="bg-red-600 hover:bg-red-750 text-white font-bold px-4 rounded float-right mr-2">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                <Modal isOpen={modalOpen} onRequestClose={closeModal} style={modalStyles}>
                    {currentTopic && (
                        <div>
                            <TopicInfo topic={currentTopic} details={topicDetails[currentTopic]} editing={editing} onEdit={setEditedDetails} />
                            {editing ? (
                                <button onClick={() => stopEditing(editedDetails)} className="bg-blue-600 hover:bg-blue-750 text-white font-bold px-4 py-2 rounded mt-4">Save</button>
                            ) : (
                                <>
                                <button onClick={() => startEditing(currentTopic)} className="bg-blue-600 hover:bg-blue-750 text-white font-bold px-4 py-2 rounded mt-4">Edit</button>
                                    <button onClick={() => closeModal()} className="bg-red-600 hover:bg-red-750 text-white font-bold px-4 py-2 rounded mt-4 ml-1">Close</button>
                                </>
                            )}
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default BettingPage;