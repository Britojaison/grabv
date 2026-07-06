"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

interface Order {
  timestamp: string;
  name: string;
  packageSize: string;
  quantity: string | number;
  pincode: string;
  address: string;
}

type FilterType = 'all' | 'today' | 'yesterday' | 'last7' | 'thisMonth' | 'last30' | 'custom';

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const scriptUrl = process.env.NEXT_PUBLIC_SCRIPT_URL;
      
      if (!scriptUrl) {
        setError("Missing NEXT_PUBLIC_SCRIPT_URL in environment variables.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(scriptUrl);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        
        // Filter out empty rows (handles if user clears cell contents without deleting the row)
        const validOrders = data.filter((order: Order) => order.timestamp && order.name);
        setOrders(validOrders);
      } catch (err) {
        console.error(err);
        setError("Could not load orders. Make sure the Web App is deployed and accessible.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let result = [...orders];
    const now = new Date();
    
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (filterType !== 'all') {
      result = result.filter(order => {
        const orderDate = new Date(order.timestamp);
        const orderDay = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
        
        if (filterType === 'today') {
          return orderDay.getTime() === today.getTime();
        }
        if (filterType === 'yesterday') {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return orderDay.getTime() === yesterday.getTime();
        }
        if (filterType === 'last7') {
          const last7 = new Date(today);
          last7.setDate(last7.getDate() - 7);
          return orderDay >= last7;
        }
        if (filterType === 'last30') {
          const last30 = new Date(today);
          last30.setDate(last30.getDate() - 30);
          return orderDay >= last30;
        }
        if (filterType === 'thisMonth') {
          return orderDay.getFullYear() === today.getFullYear() && orderDay.getMonth() === today.getMonth();
        }
        if (filterType === 'custom') {
          if (!customStartDate || !customEndDate) return true;
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59, 999);
          return orderDate >= start && orderDate <= end;
        }
        return true;
      });
    }
    
    setFilteredOrders(result);
  }, [orders, filterType, customStartDate, customEndDate]);

  return (
    <div className="flex flex-col min-h-screen font-arpona bg-[rgb(239,239,231)]">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-[#0D3D1B] font-kura uppercase">Orders Dashboard</h1>
          
          <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter by:</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FilterType)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-[#156B37] text-sm font-medium bg-gray-50 text-gray-900"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7">Last 7 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="last30">Last 30 Days</option>
                <option value="custom">Custom Date</option>
              </select>
            </div>
            
            {filterType === 'custom' && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <input 
                  type="date" 
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-[#156B37] text-sm text-gray-900"
                />
                <span className="text-gray-500 text-sm">to</span>
                <input 
                  type="date" 
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-[#156B37] text-sm text-gray-900"
                />
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">
            <svg className="animate-spin h-10 w-10 text-[#156B37] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading orders...
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500 border border-gray-200">
            {orders.length === 0 ? "No orders found yet." : "No orders found for the selected date range."}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#156B37] text-white">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Date</th>
                    <th className="py-4 px-6 font-medium">Name</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Package</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Qty</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Pincode</th>
                    <th className="py-4 px-6 font-medium w-1/3">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(order.timestamp).toLocaleString()}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">{order.name}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{order.packageSize}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap font-semibold">{order.quantity}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{order.pincode}</td>
                      <td className="py-4 px-6 text-gray-700 break-words">
                        {order.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
