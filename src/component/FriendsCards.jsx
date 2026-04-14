import { useNavigate } from "react-router-dom";

const FriendCard = ({ friend }) => {
    const navigate = useNavigate();

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

    return (
        <section>

            <div
                onClick={() => navigate(`/friend/${friend.id}`)}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-all duration-300"
            >
                <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                />

                <h3 className="text-lg font-bold text-[#1E293B] mb-1">
                    {friend.name}
                </h3>

                <p className="text-gray-500 text-[14px] mb-4 font-medium uppercase tracking-tighter">
                    {friend.days_since_contact}d ago
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {friend.tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-[#cbfadb] text-[#244d3f] text-[10px] font-bold rounded-full uppercase tracking-widest"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusStyles(
                        friend.status
                    )}`}
                >
                    {friend.status}
                </div>
            </div>
        </section>
    );
};

const FriendsCards = ({ friends = [] }) => {
    return (
        <section className="bg-[#F8FAFC] py-10 px-4 md:px-20 lg:px-60">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-10">
                    Your Friends
                </h2>

                {friends.length === 0 ? (
                    <p className="text-gray-400 text-center">No friends found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {friends.map((friend) => (
                            <FriendCard key={friend.id} friend={friend} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FriendsCards;