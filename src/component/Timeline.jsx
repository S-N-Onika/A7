import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi';

const Timeline = () => {
    const [interactions, setInteractions] = useState(() => {
        return JSON.parse(localStorage.getItem('timeline') || '[]');
    });
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const update = () => {
            const data = JSON.parse(localStorage.getItem('timeline') || '[]');
            setInteractions(data);
        };
        window.addEventListener('focus', update);
        return () => window.removeEventListener('focus', update);
    }, []);

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear all history?")) {
            localStorage.setItem('timeline', JSON.stringify([]));
            setInteractions([]);
            toast.error("All history cleared");
        }
    };

    const filteredData = filter === 'All'
        ? interactions
        : interactions.filter(item => item.type === filter);

    const getIcon = (type) => {
        const iconPath = type === 'Call' ? '/assets/call.png' : type === 'Text' ? '/assets/text.png' : '/assets/video.png';
        return <img src={iconPath} alt={type} className="w-10 h-10 object-contain" />;
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen py-12 px-4 md:px-20 lg:px-60">
            <div className="max-w-400 mx-auto">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-[#0F172A]">Timeline</h2>
                        <p className="text-gray-400 text-xs mt-2 font-medium uppercase tracking-widest">
                            Showing {interactions.length} interactions
                        </p>
                    </div>

                    {interactions.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500 text-[12px] font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
                        >
                            <HiOutlineTrash size={14} /> Clear All History
                        </button>
                    )}
                </div>

                <div className="mb-8">
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-md font-bold py-2 px-3 rounded-md focus:outline-none shadow-sm cursor-pointer"
                    >
                        <option value="All">Filter timeline</option>
                        <option value="Call">Calls Only</option>
                        <option value="Text">Texts Only</option>
                        <option value="Video">Video Only</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredData.length > 0 ? filteredData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-5 rounded-xl border border-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-6 hover:border-gray-200 transition-all cursor-default"
                        >
                            <div className="shrink-0">
                                {getIcon(item.type)}
                            </div>

                            <div>

                                <h4 className="text-[16px] font-semibold text-gray-800">
                                    
                                    <span className="text-[#244d3f]">
                                        {item.title.split(' ')[0]}
                                    </span>
                                    <span className="text-gray-500 font-medium">
                                        {item.title.substring(item.title.indexOf(' '))}
                                    </span>
                                </h4>

                                <p className="text-[12px] text-gray-400 font-medium mt-1">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                    )) 
                    : 
                    (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-100">
                            <p className="text-gray-400 italic text-md">No interactions logged yet.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Timeline;
