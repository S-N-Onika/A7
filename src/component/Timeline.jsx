import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';

const Timeline = () => {
    const [interactions, setInteractions] = useState(() => {
        return JSON.parse(localStorage.getItem('timeline') || '[]');
    });
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

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

    const processedData = interactions
        .filter(item => {
            const matchesFilter = filter === 'All' || item.type === filter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        })
        .sort((a, b) => {
            return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
        });

    const getIcon = (type) => {
        const iconPath = type === 'Call' ? '/assets/call.png' : type === 'Text' ? '/assets/text.png' : '/assets/video.png';
        return <img src={iconPath} alt={type} className="w-10 h-10 object-contain" />;
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen py-20 px-4 md:px-20 lg:px-60">
            <div className="max-w-400 mx-auto">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-[#0F172A]">Timeline</h2>
                        <p className="text-gray-400 text-sm mt-2 font-medium">
                            Showing {processedData.length} interactions
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                    <div className="relative md:col-span-1">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by friend or type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#244d3f] shadow-sm"
                        />
                    </div>

                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-sm font-bold py-2 px-3 rounded-md focus:outline-none shadow-sm cursor-pointer"
                    >
                        <option value="All">All</option>
                        <option value="Call">Calls</option>
                        <option value="Text">Texts</option>
                        <option value="Video">Video</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-600 text-sm font-bold py-2 px-3 rounded-md focus:outline-none shadow-sm cursor-pointer"
                    >
                        <option value="newest">Newest To Oldest</option>
                        <option value="oldest">Oldest To Newest</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {processedData.length > 0 ? processedData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-5 rounded-xl border border-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-6 hover:border-[#244d3f]/20 transition-all cursor-default group"
                        >
                            <div className="shrink-0">
                                {getIcon(item.type)}
                            </div>

                            <div className="flex-1">
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
                                <p className="text-gray-400 italic text-md">No matching interactions found.</p>
                            </div>
                        )}
                </div>

            </div>
        </div>
    );
};

export default Timeline;
