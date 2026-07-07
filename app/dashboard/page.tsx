"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

interface Order {
  timestamp: string;
  name: string;
  phone?: string;
  packageSize: string;
  quantity: string | number;
  pincode: string;
  address: string;
  orderId?: string;
  status?: string;
}

type FilterType = 'all' | 'today' | 'yesterday' | 'last7' | 'thisMonth' | 'last30' | 'custom';

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  
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

  const handleStatusChange = async (timestamp: string, orderId: string | undefined, newStatus: string) => {
    setUpdatingOrder(timestamp);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp, orderId, status: newStatus })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.timestamp === timestamp ? { ...o, status: newStatus } : o));
      } else {
        alert('Failed to update status');
      }
    } catch (e) {
      alert('Error updating status');
    } finally {
      setUpdatingOrder(null);
    }
  };

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
      
      <main className="flex-1 w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 xl:pb-[220px] 2xl:pb-[14vw] relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-[#0D3D1B] font-kura uppercase">Orders Dashboard</h1>
          
          <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter by:</label>
              <div className="relative">
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className="appearance-none border border-gray-300 rounded-lg pl-3 pr-10 py-1.5 outline-none focus:border-[#156B37] text-sm font-medium bg-gray-50 text-gray-900 cursor-pointer"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7">Last 7 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="custom">Custom Date</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
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
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 relative z-10">
            <div className="overflow-x-auto overflow-y-auto max-h-[650px] relative">
              <table className="w-full text-center border-collapse min-w-[800px]">
                <thead className="sticky top-0 z-20 shadow-md bg-[#156B37]">
                  <tr className="text-white">
                    <th className="py-6 px-6 font-medium whitespace-nowrap">Date</th>
                    <th className="py-6 px-6 font-medium">Name</th>
                    <th className="py-6 px-6 font-medium">Phone</th>
                    <th className="py-6 px-6 font-medium whitespace-nowrap">Package</th>
                    <th className="py-6 px-6 font-medium whitespace-nowrap">Qty</th>
                    <th className="py-6 px-6 font-medium whitespace-nowrap">Pincode</th>
                    <th className="py-6 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-6 px-6 font-medium w-1/3 text-center">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-6 px-6 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(order.timestamp).toLocaleString()}
                      </td>
                      <td className="py-6 px-6 font-medium text-gray-900">{order.name}</td>
                      <td className="py-6 px-6 text-gray-700 whitespace-nowrap">{order.phone || 'N/A'}</td>
                      <td className="py-6 px-6 text-gray-700 whitespace-nowrap">{order.packageSize}</td>
                      <td className="py-6 px-6 text-gray-700 whitespace-nowrap font-semibold">{order.quantity}</td>
                      <td className="py-6 px-6 text-gray-700 whitespace-nowrap">{order.pincode}</td>
                      <td className="py-6 px-6 whitespace-nowrap">
                        <div className="relative inline-block min-w-[240px]">
                          <select 
                            value={order.status || 'Order Placed'}
                            onChange={(e) => handleStatusChange(order.timestamp, order.orderId, e.target.value)}
                            disabled={updatingOrder === order.timestamp}
                            style={{ textAlignLast: 'center' }}
                            className={`appearance-none border rounded-lg pl-4 pr-8 py-1.5 outline-none focus:border-[#156B37] text-sm text-center font-medium cursor-pointer transition-colors w-full shadow-sm ${
                              (order.status || 'Order Placed') === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' :
                              (order.status || 'Order Placed') === 'Delivery on the way' ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' :
                              'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100'
                            } ${updatingOrder === order.timestamp ? 'opacity-50 cursor-wait' : ''}`}
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Delivery on the way">Delivery on the way</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            {updatingOrder === order.timestamp ? (
                              <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-gray-700 break-words text-left">
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
