import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiOutlineArchive, HiOutlineTrash, HiOutlineExternalLink } from 'react-icons/hi';
import { PiPhoneCallBold } from "react-icons/pi";
import { PiBellSimpleZBold } from "react-icons/pi";
import { MdOutlineTextsms } from "react-icons/md";
import { LiaVideoSolid } from "react-icons/lia";
import { toast } from 'react-hot-toast';

const FriendDetails = () => {
    const { id } = useParams();
    const [friend, setFriend] = useState(null);
    const [localTimeline, setLocalTimeline] = useState(JSON.parse(localStorage.getItem('timeline') || '[]'));

    useEffect(() => {
        fetch('/Friends.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(f => f.id === parseInt(id));
                setFriend(found);
            });
    }, [id]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case "overdue":
                return "bg-[#ef4444] text-white";
            case "almost due":
                return "bg-[#efad44] text-white";
            case "on-track":
                return "bg-[#244d3f] text-white";
        }
    };

    const handleCheckIn = (type) => {
        const newInteraction = {
            id: Date.now(),
            friendName: friend.name,
            type: type,
            date: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            title: `${type} with ${friend.name}`
        };

        const existingTimeline = JSON.parse(localStorage.getItem('timeline') || '[]');

        const updated = [newInteraction, ...existingTimeline];

        localStorage.setItem('timeline', JSON.stringify(updated));

        setLocalTimeline(updated);

        toast.success(`${type} entry added to timeline!`);
    };

    if (!friend) return <div className="text-center py-20 font-bold">Loading friend details...</div>;

    return (
        <div className="bg-[#f8fafc] min-h-screen py-12 px-4 md:px-20 lg:px-60">
            <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col items-center text-center">
                        <img src={friend.picture} className="w-20 h-20 rounded-full object-cover mb-4" alt="" />
                        <h2 className="text-xl font-bold text-[#1E293B] mb-1">{friend.name}</h2>

                        <div className={`px-3 py-1 rounded-full font-bold mb-3 ${getStatusStyles(friend.status)}`}>
                            {friend.status}
                        </div>

                        <div className="flex gap-2 mb-4">
                            {friend.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-[#cbfadb] text-[#244d3f] text-[10px] font-bold rounded-full uppercase tracking-widest">{tag}</span>
                            ))}
                        </div>
                        <p className="text-gray-500 italic mb-2 leading-relaxed">"{friend.bio}"</p>
                        <p className="text-gray-400 font-medium">Preferred: {friend.email}</p>
                    </div>

                    <div className="space-y-2">
                        <button className="w-full py-3 bg-white border border-gray-100 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-blue-300 transition-all shadow-sm">
                            <PiBellSimpleZBold size={16} /> SNOOZE 2 WEEKS
                        </button>
                        <button className="w-full py-3 bg-white border border-gray-100 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-green-300 transition-all shadow-sm">
                            <HiOutlineArchive size={16} /> ARCHIVE
                        </button>
                        <button className="w-full py-3 bg-white border border-gray-100 rounded-xl font-bold text-red-500 flex items-center justify-center gap-2 hover:bg-red-200 transition-all shadow-sm">
                            <HiOutlineTrash size={16} /> DELETE
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm text-center">
                            <p className="text-3xl font-bold text-[#244d3f]">{friend.days_since_contact}</p>
                            <p className=" text-gray-400 font-semibold mt-1">Days Since Contact</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm text-center">
                            <p className="text-3xl font-bold text-[#244d3f]">{friend.goal}</p>
                            <p className="text-gray-400 font-semibold mt-1">Goal (Days)</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm text-center">
                            <p className="text-3xl font-bold text-[#244d3f]">{friend.next_due_date}</p>
                            <p className="text-gray-400 font-semibold mt-1">Next Due</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="text-lg font-bold text-[#244d3f] mb-4">Relationship Goal</p>
                            <p className="text-sm text-gray-500 font-medium">Connect every <span className="font-semibold text-black"> {friend.goal} days</span></p>
                        </div>
                        <button className="p-1 border border-gray-100 rounded-lg bg-[#f8fafc] hover:bg-[#e9e9e9] text-[#244d3f] font-medium hover:text-gray-600 ">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-50 shadow-sm">
                        <h3 className="text-lg font-bold text-[#244d3f] mb-6">Quick Check-In</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <button onClick={() => handleCheckIn('Call')} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-50 bg-[#f8fafc] hover:bg-[#e9e9e9] transition-all group">
                                <PiPhoneCallBold size={24} className="text-gray-600 group-hover:text-black" />
                                <span className="font-bold">Call</span>
                            </button>
                            <button onClick={() => handleCheckIn('Text')} className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-50 bg-[#f8fafc] hover:bg-[#e9e9e9] transition-all group">
                                <MdOutlineTextsms size={24} className="text-gray-600 group-hover:text-black" />
                                <span className="font-bold">Text</span>
                            </button>
                            <button onClick={() => handleCheckIn('Video')} className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-50 bg-[#f8fafc] hover:bg-[#e9e9e9] transition-all group">
                                <LiaVideoSolid size={24} className="text-gray-600 group-hover:text-black" />
                                <span className="font-bold">Video</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-[#244d3f]">Recent Interactions</h3>

                            <Link
                                to="/timeline"
                                className="flex items-center gap-1 text-[#244d3f] hover:text-black bg-[#f8fafc] p-1 rounded-md">
                                <HiOutlineExternalLink /> Full History
                            </Link>
                        </div>

                        <div className="space-y-4">

                            {friend && localTimeline
                                .filter(item => item.friendName === friend.name)
                                .slice(0, 4)
                                .map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">

                                        <div className="flex items-center gap-3">

                                            {item.type === 'Call' && <PiPhoneCallBold size={18} />}
                                            {item.type === 'Text' && <MdOutlineTextsms size={18} />}
                                            {item.type === 'Video' && <LiaVideoSolid size={18} />}

                                            <div>
                                                <p className="font-semibold text-sm">{item.type}</p>
                                                <p className="text-xs text-gray-400 italic">
                                                    {item.type === 'Call' && 'Voice conversation'}
                                                    {item.type === 'Text' && 'Sent a message'}
                                                    {item.type === 'Video' && 'Video interaction'}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-xs text-gray-400 font-medium">
                                            {item.date}
                                        </span>
                                    </div>
                                ))
                            }

                            {friend &&
                                localTimeline.filter(item => item.friendName === friend.name).length === 0 && (
                                    <p className="text-center py-4 text-gray-400 text-sm italic"> No interactions yet. Try checking in above.</p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendDetails;
