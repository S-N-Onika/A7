import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const FriendshipAnalytics = () => {
    const [chartData] = useState(() => {
        const interactions = JSON.parse(localStorage.getItem('timeline') || '[]');


        const counts = interactions.reduce((acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) + 1;
            return acc;
        }, {});

        return [
            { name: 'Call', value: counts['Call'] || 0, color: '#244d3f' },
            { name: 'Text', value: counts['Text'] || 0, color: '#9B1CF6' },
            { name: 'Video', value: counts['Video'] || 0, color: '#50C874' }
        ];
    });

    return (
        <div className="bg-[#f8fafc] h-auto py-20 px-4 md:px-20 lg:px-60">
            <div className="max-w-400 mx-auto">

                <h2 className="text-4xl font-bold text-[#0F172A] mb-8">Friendship Analytics</h2>

                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-md font-semibold text-[#244d3f] mb-2">By Interaction Type</h3>

                    <div className="h-80 w-full">
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
                                    formatter={(value) => <span style={{ marginRight: 20 }} className="text-md font-bold text-gray-500  ">{value}</span>}
                                />

                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FriendshipAnalytics;
