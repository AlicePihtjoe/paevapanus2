import React from 'react';

const TopicList = ({ topics, addTopic, openModal }) => {
    return (
        <div className="w-full max-w-md bg-white rounded shadow-md p-4 mb-4">
            <h2 className="text-2xl font-semibold mb-2">Topics</h2>
            <div className="flex flex-col">
                {topics.map((topic, index) => (
                    <div key={index} className="bg-blue-100 hover:bg-blue-200 rounded px-3 py-1 mb-1 cursor-pointer">
                        {topic}
                        <button onClick={() => addTopic(topic)} className="bg-green-600 hover:bg-green-750 text-white font-bold px-4 rounded float-right mr-2">Add</button>
                        <button onClick={() => openModal(topic)} className="bg-blue-600 hover:bg-blue-750 text-white font-bold px-4 rounded float-right">View</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicList;
