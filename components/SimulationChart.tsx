import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';
import { SimulationData } from '../types';

interface SimulationChartProps {
  data: SimulationData[];
}

const SimulationChart: React.FC<SimulationChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">资产与幸福感走势推演</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="year" label={{ value: '年龄/年份', position: 'insideBottomRight', offset: -5 }} />
          <YAxis yAxisId="left" label={{ value: '净资产', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" height={36} />
          
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="steadyWealth" 
            name="英语老师 (资产)" 
            stroke="#059669" 
            strokeWidth={3} 
            dot={false}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="riskyWealth" 
            name="玄学小众赛道/投机 (资产)" 
            stroke="#e11d48" 
            strokeWidth={2} 
            dot={{ r: 4 }}
          />
           <Line 
             yAxisId="right"
            type="monotone" 
            dataKey="steadyHappiness" 
            name="职业成就感" 
            stroke="#34d399" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            dot={false}
          />
           <Line 
             yAxisId="right"
            type="monotone" 
            dataKey="riskyHappiness" 
            name="情绪波动" 
            stroke="#fda4af" 
            strokeWidth={1} 
            strokeDasharray="3 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationChart;