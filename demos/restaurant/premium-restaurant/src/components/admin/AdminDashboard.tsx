import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  Settings,
  LogOut,
  Plus,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { dishes, reservations, heroContent, type Reservation } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/utils/cn';

type Tab = 'dashboard' | 'menu' | 'reservations' | 'settings';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Items', icon: UtensilsCrossed },
    { id: 'reservations', label: 'Reservations', icon: CalendarDays },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Dishes', value: dishes.length, change: '+2 this week' },
    { label: 'Active Reservations', value: reservations.filter(r => r.status === 'confirmed').length, change: '+5 today' },
    { label: 'Pending Reviews', value: reservations.filter(r => r.status === 'pending').length, change: '3 urgent' },
    { label: 'Avg. Order Value', value: '$24.50', change: '+12%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        className={cn(
          'fixed lg:relative z-30 w-72 h-screen bg-white border-r border-gray-200 flex flex-col',
          !isSidebarOpen && 'lg:w-0 lg:overflow-hidden'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Grand Veggie</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="font-medium text-green-700">
                {user?.name.split(' ').map(n => n[0]).join('') || 'AD'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@grandveggie.com'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardView key="dashboard" stats={stats} />}
            {activeTab === 'menu' && <MenuView key="menu" />}
            {activeTab === 'reservations' && <ReservationsView key="reservations" />}
            {activeTab === 'settings' && <SettingsView key="settings" />}
          </AnimatePresence>
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Dashboard View
const DashboardView = ({ stats }: { stats: { label: string; value: number | string; change: string }[] }) => {
  const recentReservations = reservations.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
            <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-sm text-green-600 mt-2">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Reservations</h3>
          <button className="text-sm text-green-700 hover:text-green-800">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentReservations.map((reservation) => (
            <div key={reservation.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="font-medium text-green-700">
                    {reservation.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{reservation.name}</p>
                  <p className="text-sm text-gray-500">
                    {reservation.date} at {reservation.time} · {reservation.guests} guests
                  </p>
                </div>
              </div>
              <StatusBadge status={reservation.status} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Menu View
const MenuView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Dish
        </button>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map((dish, index) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                  {dish.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{dish.name}</h4>
                <span className="text-green-700 font-semibold">${dish.price}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{dish.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {dish.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Reservations View
const ReservationsView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'Pending', 'Confirmed', 'Cancelled'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Guest</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Date & Time</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Guests</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{reservation.name}</p>
                    <p className="text-sm text-gray-500">{reservation.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{reservation.date}</p>
                  <p className="text-sm text-gray-500">{reservation.time}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{reservation.guests} people</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={reservation.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// Settings View
const SettingsView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl space-y-6"
    >
      {/* Hero Content Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Headline</label>
            <input
              type="text"
              defaultValue={heroContent.headline}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Subtext</label>
            <textarea
              defaultValue={heroContent.subtext}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">CTA Text</label>
            <input
              type="text"
              defaultValue={heroContent.ctaText}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Restaurant Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Restaurant Name</label>
            <input
              type="text"
              defaultValue="Grand Veggie"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <input
                type="email"
                defaultValue="hello@grandveggie.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-colors">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: Reservation['status'] }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const icons = {
    pending: Clock,
    confirmed: CheckCircle,
    cancelled: XCircle,
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className="w-3.5 h-3.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};