import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const FriendshipAnalytics = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const timer = setTimeout(() => {
            const interactions = JSON.parse(localStorage.getItem('timeline') || '[]');

            const counts = interactions.reduce((acc, curr) => {
                acc[curr.type] = (acc[curr.type] || 0) + 1;
                return acc;
            }, {});

            setChartData([
                { name: 'Call', value: counts['Call'] || 0, color: '#244d3f' },
                { name: 'Text', value: counts['Text'] || 0, color: '#9B1CF6' },
                { name: 'Video', value: counts['Video'] || 0, color: '#50C874' }
            ]);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-[#f8fafc] h-auto py-20 px-4 md:px-20 lg:px-60">
            <div className="max-w-400 mx-auto">

                <h2 className="text-4xl font-bold text-[#0F172A] mb-8">Friendship Analytics</h2>

                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm min-h-[450px] flex flex-col">
                    <h3 className="text-md font-semibold text-[#244d3f] mb-2">By Interaction Type</h3>

                    <div className="h-80 w-full flex items-center justify-center">
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#244d3f] rounded-full animate-spin"></div>
                                <p className="mt-4 text-gray-400 font-medium animate-pulse">Calculating...</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        cornerRadius={50}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [`${value}`, name]}
                                        separator=": "
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        align="center"
                                        iconType="circle"
                                        formatter={(value) => <span className="text-md font-bold text-gray-500 mr-5">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FriendshipAnalytics;
