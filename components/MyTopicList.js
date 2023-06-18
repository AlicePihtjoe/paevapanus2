import React from 'react';

const MyTopicList = ({ myTopics, openModal, removeTopic }) => {
    return (
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
    );
};

export default MyTopicList;