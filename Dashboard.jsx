
import React, { useState, useEffect } from 'react';
import { Activity, Shield, AlertTriangle, BarChart3, Clock, Lock, Filter } from 'lucide-react';
import PerformanceDashboard from './PerformanceDashboard';
import KRIScorecard from './components/KRIScorecard'; // Renamed TickerRow
import ComplianceMatrix from './components/ComplianceMatrix'; // Renamed FTFCMatrix
import AuditPlanCard from './components/AuditPlanCard'; // Renamed TradePlanCard

/**
 * GRC Command Center (formerly Mufasa Terminal)
 * 
 * A centralized dashboard for visualizing Key Risk Indicators (KRIs) 
 * and operational compliance in real-time.
 */
export default function RiskCommandCenter() {
    const { riskData, setRiskData, status } = useRiskStream(); // Hook for WebSocket Data
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [activeTab, setActiveTab] = useState("dashboard");

    // "Defcon" logic rebranded to "Risk Posture"
    const [riskPosture, setRiskPosture] = useState("NORMAL"); 

    return (
        <div className="flex h-screen bg-black text-gray-300 font-sans overflow-hidden relative">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="w-16 bg-[#0a0a0a] border-r border-gray-900 flex flex-col items-center py-6 z-20">
                <div className="mb-8 p-0.5 rounded-lg ring-1 ring-blue-500/50">
                    <Shield size={36} className="text-blue-500" />
                </div>
                <div className="space-y-4 flex flex-col items-center">
                    <button onClick={() => setActiveTab('dashboard')} className="p-3 bg-gray-800 text-white rounded-xl" title="KRI Dashboard">
                        <Activity size={20} />
                    </button>
                    <button onClick={() => setActiveTab('reports')} className="p-3 text-gray-600 hover:text-white transition" title="Audit Reports">
                        <BarChart3 size={20} />
                    </button>
                    <button onClick={() => setActiveTab('alerts')} className="p-3 text-gray-600 hover:text-white transition" title="Active Alerts">
                        <AlertTriangle size={20} />
                    </button>
                </div>
            </div>

            {/* MAIN DASHBOARD AREA */}
            <div className="flex-1 flex flex-col min-w-0 bg-black border-r border-gray-900">
                
                {/* HEADER */}
                <div className="h-16 border-b border-gray-900 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <h2 className="text-white font-bold tracking-tight text-lg">
                            RISK <span className="text-blue-500">COMMAND CENTER</span>
                        </h2>
                        <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold uppercase">
                            SYSTEM ONLINE
                        </div>
                    </div>
                </div>

                {/* KRI VISUALIZATION GRID */}
                <div className="flex-1 overflow-y-auto p-6">
                    
                    {/* Compliance Scorecards Section */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Control Monitoring</h3>
                            <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded text-xs">
                                <Filter size={12} /> Filter by Risk Level
                            </button>
                        </div>
                        
                        {/* Renamed Ticker Rows to "Scorecards" */}
                        <div className="grid grid-cols-1 gap-1">
                            {/* Header Row */}
                            <div className="grid grid-cols-7 px-4 py-2 bg-gray-900/50 text-[10px] uppercase text-gray-500 font-bold border-b border-gray-800">
                                <div className="col-span-1">Control ID</div>
                                <div className="col-span-1">Status</div>
                                <div className="col-span-1 text-center">Audit Grade</div>
                                <div className="col-span-2">Drift Analysis</div>
                                <div className="col-span-1 text-right">Risk Score</div>
                            </div>
                            
                            {/* Data Rows */}
                            {/* Logic would map over 'riskData' here */}
                            <KRIScorecard 
                                data={{symbol: "ACCESS-01", price: "98.5%", grade: "A+", status: "Compliant"}} 
                                onClick={() => setSelectedAsset("ACCESS-01")}
                            />
                            <KRIScorecard 
                                data={{symbol: "DATA-DL-03", price: "45.2%", grade: "C-", status: "Critical"}} 
                                onClick={() => setSelectedAsset("DATA-DL-03")}
                            />
                        </div>
                    </div>

                    {/* Deep Dive Panel (Replaced Price Chart) */}
                    {selectedAsset && (
                        <div className="grid grid-cols-12 gap-6 h-[400px]">
                            <div className="col-span-8 bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                                <h3 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
                                    <Activity size={16} className="text-blue-500"/>
                                    Control Drift Analysis: {selectedAsset}
                                </h3>
                                {/* Placeholder for Chart Component */}
                                <div className="h-64 flex items-center justify-center border-t border-gray-800">
                                    <span className="text-xs text-gray-600">[Visualization: Compliance Rate over Time]</span>
                                </div>
                            </div>
                            
                            <div className="col-span-4 space-y-4">
                                {/* Risk Matrix Widget (Formerly FTFC) */}
                                <ComplianceMatrix asset={selectedAsset} />
                                
                                {/* Audit Plan Widget (Formerly Trade Plan) */}
                                <AuditPlanCard asset={selectedAsset} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
