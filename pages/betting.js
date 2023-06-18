import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import Modal from 'react-modal';
import TopicList from '/components/TopicList';
import MyTopicList from 'components/MyTopicList';

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

const TopicInfo = ({ topic, details, editing, onEdit }) => {
    const handleChange = (e) => {
        onEdit(e.target.value);
    };

    return (
        <div>
            <h2 style={{ fontSize: '2em', marginBottom: '0.5em' }}>{topic}</h2>
            {editing ? (
                <textarea defaultValue={details} onChange={handleChange} style={{ width: '100%', height: '200px' }} />
            ) : (
                <p style={{ marginBottom: '1em' }}>{details}</p>
            )}
        </div>
    );
};

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
        if (localStorage.getItem('topics')) {
            setTopics(JSON.parse(localStorage.getItem('topics')));
        }
        if (localStorage.getItem('myTopics')) {
            setMyTopics(JSON.parse(localStorage.getItem('myTopics')));
        }
        if (localStorage.getItem('topicDetails')) {
            setTopicDetails(JSON.parse(localStorage.getItem('topicDetails')));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('topics', JSON.stringify(topics));
        localStorage.setItem('myTopics', JSON.stringify(myTopics));
        localStorage.setItem('topicDetails', JSON.stringify(topicDetails));
    }, [myTopics, topics, topicDetails]);


    const openModal = (topic) => {
        setCurrentTopic(topic);
        setModalOpen(true);
    };


    const addTopic = async (topic) => {
        try {
            const description = topicDetails[topic] || 'Default description';
            const response = await fetch('/api/topics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: topic,
                    description: topicDetails[topic],
                    userId: user.id || user.googleId,
                }),
            });

            if (response.ok) {
                const newTopic = await response.json();
                socket.emit('new_topic', newTopic.name);

                await logEvent(`User ${user.name} added a new topic ${newTopic.name} at ${new Date().toISOString()}`);
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
                socket.emit('remove_topic', topic);

                await logEvent(`User ${user.name} removed ${topic} at ${new Date().toISOString()}`);
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
                <TopicList topics={topics} addTopic={addTopic} openModal={openModal} />
                <MyTopicList myTopics={myTopics} openModal={openModal} removeTopic={removeTopic} />
                <Modal isOpen={modalOpen} onRequestClose={closeModal} style={modalStyles}>
                    {currentTopic && (
                        <div>
                            <TopicInfo topic={currentTopic} details={topicDetails[currentTopic]} editing={editing} onEdit={setEditedDetails} />
                            {editing ? (
                                <button onClick={() => stopEditing(editedDetails)} className="bg-green-600 hover:bg-green-750 text-white font-bold py-2 px-4 rounded">Save</button>
                            ) : (
                                <button onClick={() => startEditing(currentTopic)} className="bg-blue-600 hover:bg-blue-750 text-white font-bold py-2 px-4 rounded">Edit</button>
                            )}
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default BettingPage;