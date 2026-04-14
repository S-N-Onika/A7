import { LuPlus } from "react-icons/lu";

const Banner = () => {
    const summaryCards = [
        { label: "Total Friends", value: "10" },
        { label: "On Track", value: "3" },
        { label: "Need Attention", value: "6" },
        { label: "Interactions This Month", value: "12" }
    ];

    return (
        <section className="bg-[#F8FAFC] pt-20 pb-10 px-4 md:px-20 lg:px-61.25">
            <div className="max-w-6xl mx-auto text-center">

                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6">
                    Friends to keep close in your life
                </h1>

                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                    Your personal shelf of meaningful connections. Browse, track, and nurture the relationships that matter most.
                </p>

                <button className="bg-[#1B4332] text-white px-5 py-2.5 rounded-md font-semibold flex items-center gap-2 mx-auto hover:bg-[#143326] transition-all mb-10 text-sm">
                    <LuPlus className="text-lg" />
                    Add a Friend
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {summaryCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100"
                        >
                            <h2 className="text-4xl font-bold text-[#1E293B] mb-2">
                                {card.value}
                            </h2>
                            <p className="text-gray-400 text-xs font-medium uppercase tracking-tight">
                                {card.label}
                            </p>
                        </div>
                    ))}
                </div>

            <hr className="border border-[#e9e9e9] mt-10 "/>

            </div>
        </section>
    );
};

export default Banner;
