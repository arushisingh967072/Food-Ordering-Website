import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, MapPin, Phone, Star, Package, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'confirmed' | 'preparing' | 'on_way' | 'delivered';
  orderDate: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
}

export default function Orders() {
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '12345',
      restaurantName: 'Pizza Palace',
      restaurantImage: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Garlic Bread', quantity: 2, price: 4.99 }
      ],
      total: 22.97,
      status: 'preparing',
      orderDate: '2025-01-17T10:30:00Z',
      deliveryAddress: '123 Main St, Downtown',
      estimatedDelivery: '25-35 min'
    }
  ]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (location.state?.orderPlaced) {
      setShowSuccessMessage(true);
      // Add new order to the list
      const newOrder: Order = {
        id: Date.now().toString(),
        restaurantName: 'Pizza Palace',
        restaurantImage: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
        items: [
          { name: 'Sample Item', quantity: 1, price: 15.99 }
        ],
        total: 18.98,
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        deliveryAddress: '123 Main St, Downtown',
        estimatedDelivery: '25-35 min'
      };
      setOrders(prev => [newOrder, ...prev]);
      
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [location.state]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'preparing': return 'text-yellow-600 bg-yellow-100';
      case 'on_way': return 'text-orange-600 bg-orange-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Clock className="h-4 w-4" />;
      case 'preparing': return <Package className="h-4 w-4" />;
      case 'on_way': return <MapPin className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Order placed successfully!</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your order has been confirmed and the restaurant is preparing your food.
                </p>
              </div>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start exploring restaurants!
            </p>
            <a
              href="/restaurants"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Restaurants
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={order.restaurantImage}
                        alt={order.restaurantName}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.restaurantName}</h3>
                        <p className="text-sm text-gray-500">Order #{order.id}</p>
                      </div>
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2 capitalize">{order.status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-700">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-orange-500">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Delivery Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-700">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{order.deliveryAddress}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Ordered: {formatDate(order.orderDate)}</span>
                          </div>
                          {order.estimatedDelivery && order.status !== 'delivered' && (
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>Estimated delivery: {order.estimatedDelivery}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {order.status === 'delivered' && (
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">How was your order?</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}