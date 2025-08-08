import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign,
  Star,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  const isActive = (path: string) => {
    return location.pathname.includes(path) || activeTab === path;
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Total Orders',
      value: '3,847',
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Active Restaurants',
      value: '156',
      change: '+3.1%',
      icon: Store,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Total Users',
      value: '12,459',
      change: '+15.3%',
      icon: Users,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const recentOrders = [
    {
      id: '12345',
      customer: 'John Doe',
      restaurant: 'Pizza Palace',
      amount: 24.99,
      status: 'delivered',
      time: '2 hours ago'
    },
    {
      id: '12346',
      customer: 'Jane Smith',
      restaurant: 'Burger House',
      amount: 18.50,
      status: 'preparing',
      time: '3 hours ago'
    },
    {
      id: '12347',
      customer: 'Mike Johnson',
      restaurant: 'Sushi Zen',
      amount: 45.20,
      status: 'on_way',
      time: '4 hours ago'
    }
  ];

  const topRestaurants = [
    {
      name: 'Pizza Palace',
      orders: 245,
      revenue: '$5,430',
      rating: 4.8
    },
    {
      name: 'Burger House',
      orders: 198,
      revenue: '$4,250',
      rating: 4.6
    },
    {
      name: 'Sushi Zen',
      orders: 156,
      revenue: '$6,890',
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your platform and monitor performance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('restaurants')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'restaurants'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Restaurants
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Orders
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">#{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer} • {order.restaurant}</p>
                          <p className="text-xs text-gray-500">{order.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.amount}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Restaurants */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Top Restaurants</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topRestaurants.map((restaurant, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{restaurant.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{restaurant.orders} orders</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1">{restaurant.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{restaurant.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-gray-600">
              This section would contain the {activeTab} management interface.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}