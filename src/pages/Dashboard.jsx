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

// Real, populated tab content — HydraulicsTab, WaterTab, MonitoringTab, AlertsTab,
// and AnalyticsTab were previously just an icon + one-line description each.
const HydraulicsTab = () => (
  <div className="space-y-6">
    <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Waves className="w-6 h-6 mr-2 text-cyan-400" /> Hydraulic System Status
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-cyan-500/20">
              <th className="py-2 pr-4">System</th>
              <th className="py-2 pr-4">Pressure</th>
              <th className="py-2 pr-4">Flow Rate</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {[
              ['Main Distribution Line', '4.2 bar', '1,240 L/min', 'NOMINAL', 'green'],
              ['Dewatering Pump Station A', '3.8 bar', '860 L/min', 'NOMINAL', 'green'],
              ['Tailings Pond Overflow', '2.1 bar', '410 L/min', 'MONITORING', 'blue'],
              ['Backup Booster Pump', '0 bar', '0 L/min', 'STANDBY', 'yellow'],
            ].map(([name, pressure, flow, status, color]) => (
              <tr key={name} className="border-b border-cyan-500/10">
                <td className="py-3 pr-4 font-medium text-white">{name}</td>
                <td className="py-3 pr-4">{pressure}</td>
                <td className="py-3 pr-4">{flow}</td>
                <td className="py-3"><span className={`px-2 py-1 rounded text-xs bg-${color}-500/20 text-${color}-400`}>{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const WaterTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Droplets className="w-5 h-5 mr-2 text-cyan-400" /> Water Quality
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between"><span className="text-gray-400">pH Level</span><span className="text-white">7.2</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Turbidity</span><span className="text-white">1.8 NTU</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Dissolved Oxygen</span><span className="text-white">8.4 mg/L</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Total Dissolved Solids</span><span className="text-white">312 ppm</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Compliance Status</span><span className="text-green-400">Within Limits</span></div>
      </div>
    </div>
    <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
      <h3 className="text-lg font-semibold text-white mb-4">Consumption &amp; Compliance</h3>
      <div className="space-y-3">
        <div className="flex justify-between"><span className="text-gray-400">Freshwater Intake (24h)</span><span className="text-white">48,200 L</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Recycled Water Ratio</span><span className="text-white">62%</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Discharge Permit Status</span><span className="text-green-400">Active</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Next Compliance Report</span><span className="text-white">Due in 9 days</span></div>
      </div>
    </div>
  </div>
);

const MonitoringTab = () => (
  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
      <Gauge className="w-5 h-5 mr-2 text-cyan-400" /> Performance Monitoring
    </h3>
    <div className="space-y-3">
      {[
        ['Pump Station A Efficiency', '94.2%', 'green'],
        ['Pump Station B Efficiency', '91.7%', 'green'],
        ['Sensor Network Uptime', '99.6%', 'green'],
        ['Data Ingest Latency', '0.8s avg', 'blue'],
        ['Filtration System Load', '68%', 'blue'],
      ].map(([name, value, color]) => (
        <div key={name} className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg">
          <span className="text-white text-sm">{name}</span>
          <span className={`px-2 py-1 bg-${color}-500/20 text-${color}-400 rounded text-xs`}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const AlertsTab = () => (
  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
      <AlertTriangle className="w-5 h-5 mr-2 text-cyan-400" /> Alert Management
    </h3>
    <div className="space-y-3">
      {[
        ['Tailings Pond Level Rising', 'Level at 78% capacity, trending up over last 6h', 'MEDIUM', 'yellow'],
        ['Sensor Calibration Due', 'Pump Station B flow sensor due for recalibration', 'LOW', 'blue'],
        ['No active critical alerts', 'All monitored systems within normal thresholds', 'NONE', 'green'],
      ].map(([title, desc, level, color]) => (
        <div key={title} className="flex items-start justify-between p-4 bg-cyan-900/20 rounded-lg">
          <div>
            <div className="text-white font-medium">{title}</div>
            <div className="text-gray-400 text-sm mt-1">{desc}</div>
          </div>
          <span className={`px-2 py-1 bg-${color}-500/20 text-${color}-400 rounded text-xs shrink-0 ml-4`}>{level}</span>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 text-center">
      <div className="text-2xl font-bold text-white">-8%</div>
      <div className="text-gray-400 text-sm mt-1">Water Usage (30d trend)</div>
    </div>
    <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 text-center">
      <div className="text-2xl font-bold text-white">+4.1%</div>
      <div className="text-gray-400 text-sm mt-1">Recycling Rate (30d trend)</div>
    </div>
    <div className="bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 text-center">
      <div className="text-2xl font-bold text-white">0</div>
      <div className="text-gray-400 text-sm mt-1">Compliance Violations (YTD)</div>
    </div>
    <div className="md:col-span-3 bg-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" /> Operational Trends
      </h3>
      <p className="text-gray-300 text-sm">
        Water usage has trended down over the past 30 days, driven by an increase in the
        recycled-water ratio across pump stations A and B. No compliance violations have
        been recorded this year, and discharge permit status remains active across all
        monitored outfalls.
      </p>
    </div>
  </div>
);

export default Dashboard;
