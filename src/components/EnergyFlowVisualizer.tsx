import React, { useState } from 'react';
import { Sun, Battery, Home, Zap, ArrowRight, ShieldCheck, Leaf, RotateCcw } from 'lucide-react';

export const EnergyFlowVisualizer: React.FC = () => {
  // Sliders
  const [solarIrradiance, setSolarIrradiance] = useState<number>(85); // 0 - 100%
  const [homeDemand, setHomeDemand] = useState<number>(2400); // 500 - 6500 Watts
  const [batterySoc, setBatterySoc] = useState<number>(75); // 0 - 100%

  // Calculations
  const maxPvRating = 6000; // 6kW PV array
  const rawSolarGeneration = Math.round((solarIrradiance / 100) * maxPvRating);
  const inverterEfficiency = 0.984; // 98.4%
  const acSolarYield = Math.round(rawSolarGeneration * inverterEfficiency);

  // Energy distribution
  let batteryPower = 0; // positive = charging, negative = discharging
  let gridPower = 0; // positive = exporting (green), negative = importing

  const netBalance = acSolarYield - homeDemand;

  if (netBalance >= 0) {
    if (batterySoc < 100) {
      const maxCharge = 3000;
      batteryPower = Math.min(netBalance, maxCharge);
      gridPower = netBalance - batteryPower;
    } else {
      batteryPower = 0;
      gridPower = netBalance;
    }
  } else {
    const deficit = Math.abs(netBalance);
    if (batterySoc > 10) {
      const maxDischarge = 3500;
      batteryPower = -Math.min(deficit, maxDischarge);
      const remainingDeficit = deficit + batteryPower;
      gridPower = -remainingDeficit;
    } else {
      batteryPower = 0;
      gridPower = -deficit;
    }
  }

  const cleanEnergyPercentage = homeDemand > 0 
    ? Math.min(100, Math.round(((acSolarYield + Math.max(0, -batteryPower)) / homeDemand) * 100))
    : 100;

  return (
    <section id="simulator" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Interactive Clean Energy Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Watch How a Hybrid Inverter Balances Real-Time Power
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Adjust sun intensity, household load, and battery state below. See how the smart MPPT inverter seamlessly prioritizes solar energy, charges your LiFePO4 battery, and feeds surplus clean energy back to the grid.
          </p>
        </div>

        {/* Interactive Controls Bar in Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs mb-8">
          {/* Solar Irradiance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Sun Intensity / Irradiance</span>
              </span>
              <span className="font-mono font-bold text-emerald-700 text-sm">{solarIrradiance}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={solarIrradiance}
              onChange={(e) => setSolarIrradiance(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>0% (Night)</span>
              <span>100% (Noon Peak)</span>
            </div>
          </div>

          {/* Household Demand Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Home className="w-4 h-4 text-blue-600" />
                <span>Household Load Demand</span>
              </span>
              <span className="font-mono font-bold text-blue-700 text-sm">{homeDemand.toLocaleString()} W</span>
            </div>
            <input
              type="range"
              min="500"
              max="6500"
              step="100"
              value={homeDemand}
              onChange={(e) => setHomeDemand(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>500W (Base idle)</span>
              <span>6.5 kW (2 ACs + Pumps)</span>
            </div>
          </div>

          {/* Battery State Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Battery className="w-4 h-4 text-emerald-600" />
                <span>Battery State of Charge</span>
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">{batterySoc}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={batterySoc}
              onChange={(e) => setBatterySoc(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>0% (Empty)</span>
              <span>100% (Full)</span>
            </div>
          </div>
        </div>

        {/* Live System Schematic Diagram in LIGHT THEME */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md overflow-hidden text-slate-900">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          {/* Live Top Telemetry Banner */}
          <div className="relative flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
              </span>
              <span className="text-xs font-bold tracking-wide uppercase text-slate-900">
                Active MPPT Inverter Routing
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs font-mono">
              <div className="bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                <span className="text-slate-600 font-sans">Clean Energy Ratio:</span>{' '}
                <strong className="text-emerald-800">{cleanEnergyPercentage}%</strong>
              </div>
              <div className="bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                <span className="text-slate-600 font-sans">Inverter Efficiency:</span>{' '}
                <strong className="text-amber-800">98.4%</strong>
              </div>
            </div>
          </div>

          {/* Schematic Nodes Grid in LIGHT THEME */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Node 1: Solar PV Array (Left) */}
            <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200/90 flex flex-col items-center text-center space-y-3 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                <Sun className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Tier-1 Solar PV Array</h4>
                <p className="text-xs text-slate-500">10 × 600W Bifacial Panels</p>
              </div>
              <div className="w-full bg-white p-2.5 rounded-xl border border-amber-200 font-mono">
                <div className="text-[10px] text-slate-500 uppercase font-sans font-medium">Current Solar Yield</div>
                <div className="text-xl font-extrabold text-amber-800 tabular-nums">
                  {rawSolarGeneration.toLocaleString()} W
                </div>
              </div>
            </div>

            {/* Node 2: Central Hybrid Inverter (Middle) */}
            <div className="bg-gradient-to-b from-emerald-50 to-white rounded-3xl p-6 border-2 border-emerald-600 shadow-md flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                <Zap className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-widest font-bold block">
                  SYSTEM CORE
                </span>
                <h3 className="text-base font-bold text-slate-900">HomePower 6kW Hybrid Inverter</h3>
                <p className="text-xs text-slate-500">Pure Sine Wave · 0ms Auto-Bypass</p>
              </div>

              {/* Status parameters */}
              <div className="w-full bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-left font-mono text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span>DC Input:</span>
                  <span className="text-amber-700 font-bold tabular-nums">{rawSolarGeneration} W</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>AC Output:</span>
                  <span className="text-emerald-700 font-extrabold tabular-nums">{acSolarYield} W</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Transfer Switch:</span>
                  <span className="text-emerald-700 font-semibold">Online (0ms)</span>
                </div>
              </div>
            </div>

            {/* Node 3: Home Appliances & Consumption (Right) */}
            <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-200/90 flex flex-col items-center text-center space-y-3 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700">
                <Home className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Home Connected Loads</h4>
                <p className="text-xs text-slate-500">ACs, Lighting, Pumps &amp; Fridge</p>
              </div>
              <div className="w-full bg-white p-2.5 rounded-xl border border-blue-200 font-mono">
                <div className="text-[10px] text-slate-500 uppercase font-sans font-medium">Active Consumption</div>
                <div className="text-xl font-extrabold text-blue-800 tabular-nums">
                  {homeDemand.toLocaleString()} W
                </div>
              </div>
            </div>
          </div>

          {/* Lower Row: Battery Storage & Utility Grid in Light Theme */}
          <div className="relative mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Battery Bank Card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                  <Battery className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">LiFePO4 Battery Bank</h4>
                  <p className="text-xs text-slate-500">5.12 kWh / 48V Storage</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs">
                  {batteryPower > 0 ? (
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Charging</span>
                  ) : batteryPower < 0 ? (
                    <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Discharging</span>
                  ) : (
                    <span className="text-slate-500">Standby</span>
                  )}
                </div>
                <div className="text-base font-bold text-slate-900 tabular-nums mt-1">
                  {Math.abs(batteryPower).toLocaleString()} W
                </div>
              </div>
            </div>

            {/* Utility Grid & Net Metering Card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Utility Grid / Net Metering</h4>
                  <p className="text-xs text-slate-500">Bi-directional 230V Connection</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs">
                  {gridPower > 0 ? (
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Exporting Clean Power</span>
                  ) : gridPower < 0 ? (
                    <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">Importing from Grid</span>
                  ) : (
                    <span className="text-slate-500">Self-Sustaining 0W</span>
                  )}
                </div>
                <div className="text-base font-bold text-slate-900 tabular-nums mt-1">
                  {Math.abs(gridPower).toLocaleString()} W
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Sustainable Impact Note in Light Theme */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700 bg-emerald-50/70 px-4 py-3 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {gridPower > 0
                  ? `Your system is exporting ${gridPower}W of clean energy into the local power grid, actively reducing fossil fuel generation.`
                  : cleanEnergyPercentage === 100
                  ? 'Your home is operating 100% on zero-emission solar and lithium battery storage.'
                  : `Solar and battery are supplying ${cleanEnergyPercentage}% of your active load, minimizing grid power consumption.`}
              </span>
            </div>
            <span className="font-mono text-emerald-800 font-bold text-[11px] whitespace-nowrap">
              {((rawSolarGeneration * 0.82) / 1000).toFixed(2)} kg CO2 saved/hour
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
