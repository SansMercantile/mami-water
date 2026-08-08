import React, { useState } from 'react';
import axios from 'axios';
import { Droplets, AlertTriangle, Activity, Settings, Shield, Gauge, RefreshCw, Waves, TrendingUp } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState('');

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshStatus('Checking API health...');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      setRefreshStatus(`API status: ${response.status} ${response.statusText}`);
    } catch (error) {
      setRefreshStatus(`API health check failed: ${error.message}`);
    } finally {
      setRefreshing(false);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'hydraulics', name: 'Hydraulics', icon: Waves },
    { id: 'water', name: 'Water Systems', icon: Droplets },
    { id: 'monitoring', name: 'Monitoring', icon: Gauge },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'system', name: 'System', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'hydraulics':
        return <HydraulicsTab />;
      case 'water':
        return <WaterTab />;
      case 'monitoring':
        return <MonitoringTab />;
      case 'alerts':
        return <AlertsTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'system':
        return (
          <div className="space-y-6">
            <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">System Configuration</h3>
              <p className="text-gray-300">MAMI_WATA water systems and hydraulics configuration.</p>
            </div>
          </div>
        );
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-cyan-900/30 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg mr-4">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MAMI_WATA</h1>
                <p className="text-cyan-200 text-sm">Water Systems & Hydraulics Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full hover:bg-cyan-500/30 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <div className="flex items-center px-3 py-1 bg-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-400 text-sm font-medium">System Online</span>
              </div>
              {refreshStatus && (
                <div className="text-xs text-gray-400">{refreshStatus}</div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-cyan-900/20 backdrop-blur-sm border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = () => (
  <div className="space-y-6">
    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
        <div className="flex items-center">
          <Droplets className="w-8 h-8 text-cyan-400 mr-3" />
          <div>
            <p className="text-cyan-200 text-sm">Water Flow Rate</p>
            <p className="text-2xl font-bold text-white">4,892 GPM</p>
          </div>
        </div>
      </div>

      <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
        <div className="flex items-center">
          <Waves className="w-8 h-8 text-blue-400 mr-3" />
          <div>
            <p className="text-blue-200 text-sm">Pressure Level</p>
            <p className="text-2xl font-bold text-white">847 PSI</p>
          </div>
        </div>
      </div>

      <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-green-400 mr-3" />
          <div>
            <p className="text-green-200 text-sm">Contamination Level</p>
            <p className="text-2xl font-bold text-white">0.3 PPM</p>
          </div>
        </div>
      </div>

      <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
        <div className="flex items-center">
          <Gauge className="w-8 h-8 text-teal-400 mr-3" />
          <div>
            <p className="text-teal-200 text-sm">System Efficiency</p>
            <p className="text-2xl font-bold text-white">98.2%</p>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[
          { time: '2 minutes ago', event: 'Water flow optimization completed', type: 'optimization' },
          { time: '18 minutes ago', event: 'Quarterly contamination test passed', type: 'test' },
          { time: '1 hour ago', event: 'Hydraulic system maintenance completed', type: 'maintenance' },
          { time: '3 hours ago', event: 'Pressure relief valve inspection complete', type: 'inspection' }
        ].map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-cyan-500/20 last:border-b-0">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                activity.type === 'test' ? 'bg-green-400' :
                activity.type === 'maintenance' ? 'bg-blue-400' :
                activity.type === 'inspection' ? 'bg-yellow-400' : 'bg-cyan-400'
              }`}></div>
              <span className="text-gray-300">{activity.event}</span>
            </div>
            <span className="text-cyan-400 text-sm">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Placeholder components for other tabs
const HydraulicsTab = () => (
  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-8 text-center border border-cyan-500/20">
    <Waves className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Hydraulic Systems</h3>
    <p className="text-gray-300">Monitor and manage all hydraulic systems</p>
  </div>
);

const WaterTab = () => (
  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-8 text-center border border-cyan-500/20">
    <Droplets className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Water Management</h3>
    <p className="text-gray-300">Real-time water quality and flow tracking</p>
  </div>
);

const MonitoringTab = () => (
  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-8 text-center border border-cyan-500/20">
    <Gauge className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Performance Monitoring</h3>
    <p className="text-gray-300">Track operational metrics and performance indicators</p>
  </div>
);

const AlertsTab = () => (
  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-8 text-center border border-cyan-500/20">
    <AlertTriangle className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Alert Management</h3>
    <p className="text-gray-300">System alerts and anomaly notifications</p>
  </div>
);

const AnalyticsTab = () => (
  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-8 text-center border border-cyan-500/20">
    <TrendingUp className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
    <p className="text-gray-300">View detailed operational trends and analytics</p>
  </div>
);

export default Dashboard;
