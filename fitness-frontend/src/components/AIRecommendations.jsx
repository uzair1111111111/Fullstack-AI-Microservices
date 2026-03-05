import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getAIRecommendations } from '../services/api';

const AIRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Memoize user taake re-render par object change na ho
    const user = useMemo(() => {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    }, []);

    // 2. Fetch function mein se 'loading' ko dependency se nikaal diya
    // Is se loop khatam ho jayega
    const fetchAI = useCallback(async () => {
        if (!user?.name) return; 
        
        setLoading(true);
        try {
            const response = await getAIRecommendations(user.name);
            console.log("Backend Response:", response.data);

            // Response check: Agar list hai ya object
            const data = Array.isArray(response.data) ? response.data : 
                         (response.data ? [response.data] : []);
            
            setRecommendations(data);
        } catch (err) {
            console.error("AI Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, [user?.name]); // Sirf user name par function update hoga

    // 3. Page load par sirf aik baar chalay
    useEffect(() => {
        fetchAI();
    }, [fetchAI]); 

    return (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-indigo-50 text-left">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <h2 className="text-xl font-bold text-gray-800">AI Health Coach</h2>
                </div>
                <button 
                    onClick={fetchAI}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 shadow-md"
                >
                    {loading ? 'Thinking...' : 'Refresh Advice'}
                </button>
            </div>

            <div className="min-h-[100px] flex flex-col justify-center">
                {recommendations.length > 0 ? (
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                                <p className="text-gray-800 leading-relaxed text-sm font-medium">
                                    {rec.recommendationText || "Keep up the good work!"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        {loading ? (
                            <p className="text-indigo-600 font-medium animate-pulse">Fetching personalized recommendations...</p>
                        ) : (
                            <p className="text-gray-400 italic">No recommendations yet. Log some activities to get started!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIRecommendations;