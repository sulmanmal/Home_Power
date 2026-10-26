import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, TrendingUp, Check, ShoppingBag, ArrowRight, Sun, Battery, ShieldCheck, DollarSign, Download, Sliders, Calendar, Zap, PieChart } from 'lucide-react';
import { ApplianceRowItem, CalculationResult, CitySunHours } from '../types/solar';
import { APPLIANCE_PRESETS, CITY_SUN_HOURS, PRODUCTS } from '../data/solarData';

interface SolarCalculatorProps {
  onAddBundleToCart: (inverterId: number, panelId: number, panelCount: number, batteryId: number, batteryCount: number) => void;
  onOpenQuote: () => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({
  onAddBundleToCart,
  onOpenQuote,
}) => {
  // Mode selector: Sizing vs ROI Payback Engine
  const [calculatorView, setCalculatorView] = useState<'sizing' | 'roi'>('sizing');

  // Appliances state
  const [appliances, setAppliances] = useState<ApplianceRowItem[]>([
    { id: '1', name: 'Ceiling Fan (BLDC/Standard)', watts: 75, qty: 4, hours: 12, runsAtNight: true },
    { id: '2', name: 'LED Lights (Energy Saver)', watts: 15, qty: 8, hours: 8, runsAtNight: true },
    { id: '3', name: 'Inverter Refrigerator', watts: 200, qty: 1, hours: 24, runsAtNight: true },
    { id: '4', name: 'Inverter AC (1.5 Ton)', watts: 1400, qty: 1, hours: 6, runsAtNight: false },
    { id: '5', name: 'Water Pump / Motor (1 HP)', watts: 750, qty: 1, hours: 1.5, runsAtNight: false }
  ]);

  const [selectedCity, setSelectedCity] = useState<string>('Lahore');
  const [systemMode, setSystemMode] = useState<'hybrid' | 'offgrid' | 'ongrid'>('hybrid');
  const [batteryDoD, setBatteryDoD] = useState<number>(0.9); // 0.9 for Lithium, 0.5 for Tubular
  const [batteryVoltage, setBatteryVoltage] = useState<number>(48);
  const [tariffRate, setTariffRate] = useState<number>(65); // Rs / unit
  const [selectedPresetId, setSelectedPresetId] = useState<string>('fan');

  // Advanced ROI Specific Parameters
  const [tariffEscalationRate, setTariffEscalationRate] = useState<number>(10); // 10% annual electricity inflation
  const [selfConsumptionPct, setSelfConsumptionPct] = useState<number>(70); // 70% self-consumed, 30% exported
  const [exportFeedInRate, setExportFeedInRate] = useState<number>(32); // Rs / unit exported
  const [customCapexOverride, setCustomCapexOverride] = useState<number | null>(null);

  // Add new row from preset
  const handleAddPreset = () => {
    const preset = APPLIANCE_PRESETS.find((p) => p.id === selectedPresetId);
    if (!preset) return;
    const newRow: ApplianceRowItem = {
      id: Date.now().toString(),
      name: preset.name,
      watts: preset.watts,
      qty: preset.defaultQty,
      hours: preset.defaultHours,
      runsAtNight: preset.defaultNight,
    };
    setAppliances([...appliances, newRow]);
  };

  const handleUpdateAppliance = (id: string, field: keyof ApplianceRowItem, value: any) => {
    setAppliances(
      appliances.map((app) => (app.id === id ? { ...app, [field]: value } : app))
    );
  };

  const handleDeleteAppliance = (id: string) => {
    setAppliances(appliances.filter((app) => app.id !== id));
  };

  // Perform calculation
  const result: CalculationResult = useMemo(() => {
    let peakLoad = 0;
    let dailyEnergy = 0;
    let nightEnergy = 0;

    appliances.forEach((app) => {
      const load = app.watts * app.qty;
      peakLoad += load;
      dailyEnergy += load * app.hours;
      if (app.runsAtNight) {
        nightEnergy += load * Math.min(app.hours, 8);
      }
    });

    const cityData = CITY_SUN_HOURS.find((c) => c.name === selectedCity) || CITY_SUN_HOURS[0];
    const sunHours = cityData.sunHours;

    // Inverter kW with 25% safety headroom
    const invKw = Math.max(1.0, Math.ceil((peakLoad * 1.25) / 100) / 10);

    // Solar PV watts with 80% derate / system losses factor
    const pvWatts = Math.ceil(dailyEnergy / (sunHours * 0.8) / 100) * 100;
    const pvKw = Number((pvWatts / 1000).toFixed(1));

    // Battery Bank calculation
    const batteryWh = systemMode === 'ongrid' ? 0 : Math.round(nightEnergy / batteryDoD / 0.95);
    const batteryAh = batteryVoltage > 0 ? Math.ceil(batteryWh / batteryVoltage) : 0;

    // Monthly Energy Generated (kWh)
    const monthlySolarGenerationKwh = (pvWatts * sunHours * 30 * 0.85) / 1000;
    const yearlySolarGenerationKwh = monthlySolarGenerationKwh * 12;

    // Savings model
    const selfConsumedKwh = (monthlySolarGenerationKwh * selfConsumptionPct) / 100;
    const exportedKwh = (monthlySolarGenerationKwh * (100 - selfConsumptionPct)) / 100;

    const monthlyDirectSavings = selfConsumedKwh * tariffRate;
    const monthlyExportIncome = systemMode === 'offgrid' ? 0 : exportedKwh * exportFeedInRate;
    const monthlyTotalSavings = Math.round(monthlyDirectSavings + monthlyExportIncome);
    const firstYearSavings = monthlyTotalSavings * 12;

    // Match recommended hardware bundle
    const inverters = PRODUCTS.filter((p) => p.category === 'inverters');
    const panels = PRODUCTS.filter((p) => p.category === 'panels');
    const batteries = PRODUCTS.filter((p) => p.category === 'batteries');

    const recommendedInverter =
      inverters.find((inv) => {
        const kw = parseFloat(inv.capacity || '0');
        return kw >= invKw;
      }) || inverters[0];

    const recommendedPanel = panels[0];
    const panelWatts = 585;
    const panelCount = Math.max(1, Math.ceil(pvWatts / panelWatts));

    const recommendedBattery =
      batteryDoD === 0.9
        ? batteries.find((b) => b.sku.includes('BAT-LI5')) || batteries[0]
        : batteries.find((b) => b.categoryName.includes('Tubular')) || batteries[2];

    const batteryCapAh = batteryDoD === 0.9 ? 100 : 200;
    const batteryCount = systemMode === 'ongrid' ? 0 : Math.max(1, Math.ceil(batteryAh / batteryCapAh));

    const inverterCost = recommendedInverter ? (recommendedInverter.salePrice || recommendedInverter.price) : 0;
    const panelCost = recommendedPanel ? (recommendedPanel.salePrice || recommendedPanel.price) * panelCount : 0;
    const batteryCost = (recommendedBattery && systemMode !== 'ongrid') ? (recommendedBattery.salePrice || recommendedBattery.price) * batteryCount : 0;
    const installationAndBOS = Math.round((inverterCost + panelCost) * 0.12); // ~12% balance of system

    const calculatedBundleCost = inverterCost + panelCost + batteryCost + installationAndBOS;
    const totalBundleCost = customCapexOverride !== null ? customCapexOverride : calculatedBundleCost;

    // Payback period accounting for annual tariff escalation
    let cumulativeSavings = 0;
    let paybackYears = 0;
    let foundBreakeven = false;
    const tenYearReturns = [];

    for (let yr = 1; yr <= 25; yr++) {
      // tariff escalates year over year
      const yearTariffFactor = Math.pow(1 + tariffEscalationRate / 100, yr - 1);
      const yearSavings = firstYearSavings * yearTariffFactor;
      cumulativeSavings += yearSavings;
      const netCumulative = cumulativeSavings - totalBundleCost;

      if (!foundBreakeven && cumulativeSavings >= totalBundleCost) {
        // Linear interpolation for exact fraction of year
        const priorSavings = cumulativeSavings - yearSavings;
        const remainder = totalBundleCost - priorSavings;
        paybackYears = Number(((yr - 1) + remainder / yearSavings).toFixed(1));
        foundBreakeven = true;
      }

      if (yr <= 10) {
        tenYearReturns.push({ year: yr, netReturn: Math.round(netCumulative) });
      }
    }

    if (!foundBreakeven) {
      paybackYears = firstYearSavings > 0 ? Number((totalBundleCost / firstYearSavings).toFixed(1)) : 0;
    }

    return {
      peakLoadWatts: peakLoad,
      dailyEnergyWh: dailyEnergy,
      nightEnergyWh: nightEnergy,
      recommendedInverterKw: invKw,
      recommendedSolarKw: pvKw,
      recommendedBatteryWh: batteryWh,
      recommendedBatteryAh: batteryAh,
      batteryVoltage,
      monthlySavings: monthlyTotalSavings,
      yearlySavings: firstYearSavings,
      paybackYears,
      recommendedBundle: {
        inverter: recommendedInverter,
        panel: recommendedPanel,
        panelCount,
        battery: systemMode === 'ongrid' ? null : recommendedBattery,
        batteryCount,
        totalCost: totalBundleCost,
      },
      tenYearReturns,
    };
  }, [appliances, selectedCity, systemMode, batteryDoD, batteryVoltage, tariffRate, tariffEscalationRate, selfConsumptionPct, exportFeedInRate, customCapexOverride]);

  // Derived financial metrics for the 25-year lifecycle
  const lifetime25YearSavings = useMemo(() => {
    let total = 0;
    for (let y = 1; y <= 25; y++) {
      total += result.yearlySavings * Math.pow(1 + tariffEscalationRate / 100, y - 1);
    }
    return Math.round(total);
  }, [result.yearlySavings, tariffEscalationRate]);

  const net25YearProfit = lifetime25YearSavings - result.recommendedBundle.totalCost;
  const lcoePerUnit = result.recommendedBundle.totalCost > 0
    ? Number((result.recommendedBundle.totalCost / (result.recommendedSolarKw * 1450 * 25)).toFixed(1))
    : 0;

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Solar Sizing &amp; Return On Investment (ROI) Suite</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Calculate System Sizing &amp; Exact Financial Payback
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Estimate your monthly solar generation, capital cost, and exact break-even timeline based on your local electricity tariff and annual inflation rates.
            </p>
          </div>

          {/* Sizing vs ROI View Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setCalculatorView('sizing')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                calculatorView === 'sizing'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>1. Load Sizing</span>
            </button>
            <button
              onClick={() => setCalculatorView('roi')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                calculatorView === 'roi'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>2. ROI &amp; Payback Period</span>
            </button>
          </div>
        </div>

        {/* View 1: Appliance Load & Inverter Sizing View */}
        {calculatorView === 'sizing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Appliance Input Table & System Options (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Appliance List Box */}
              <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Connected Home Appliances
                  </h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedPresetId}
                      onChange={(e) => setSelectedPresetId(e.target.value)}
                      className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium"
                    >
                      {APPLIANCE_PRESETS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.watts}W)
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddPreset}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                        <th className="pb-2">Appliance</th>
                        <th className="pb-2 w-20">Watts</th>
                        <th className="pb-2 w-16">Qty</th>
                        <th className="pb-2 w-20">Hours/day</th>
                        <th className="pb-2 text-center w-20">Night Backup</th>
                        <th className="pb-2 text-right w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70">
                      {appliances.map((app) => (
                        <tr key={app.id} className="hover:bg-white/80">
                          <td className="py-2.5 pr-2">
                            <input
                              type="text"
                              value={app.name}
                              onChange={(e) => handleUpdateAppliance(app.id, 'name', e.target.value)}
                              className="w-full bg-transparent font-medium text-slate-800 border-none p-0 focus:outline-none"
                            />
                          </td>
                          <td className="py-2.5 pr-2">
                            <input
                              type="number"
                              min="1"
                              value={app.watts}
                              onChange={(e) => handleUpdateAppliance(app.id, 'watts', Number(e.target.value))}
                              className="w-full bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-800 font-mono"
                            />
                          </td>
                          <td className="py-2.5 pr-2">
                            <input
                              type="number"
                              min="1"
                              value={app.qty}
                              onChange={(e) => handleUpdateAppliance(app.id, 'qty', Number(e.target.value))}
                              className="w-full bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-800 font-mono"
                            />
                          </td>
                          <td className="py-2.5 pr-2">
                            <input
                              type="number"
                              min="0.5"
                              max="24"
                              step="0.5"
                              value={app.hours}
                              onChange={(e) => handleUpdateAppliance(app.id, 'hours', Number(e.target.value))}
                              className="w-full bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-800 font-mono"
                            />
                          </td>
                          <td className="py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={app.runsAtNight}
                              onChange={(e) => handleUpdateAppliance(app.id, 'runsAtNight', e.target.checked)}
                              className="accent-emerald-600 rounded cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleDeleteAppliance(app.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                              title="Remove appliance"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System Parameters & City Location */}
              <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2">
                  Regional Irradiance &amp; Storage Architecture
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  {/* City */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Location Sun Hours</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
                    >
                      {CITY_SUN_HOURS.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.sunHours} peak sun-hrs)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* System Architecture */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">System Mode</label>
                    <select
                      value={systemMode}
                      onChange={(e) => setSystemMode(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
                    >
                      <option value="hybrid">Hybrid (Solar + Battery + Grid)</option>
                      <option value="offgrid">Off-Grid (100% Self-Reliant)</option>
                      <option value="ongrid">On-Grid (Net-metering only)</option>
                    </select>
                  </div>

                  {/* Battery Technology */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Battery Technology</label>
                    <select
                      value={batteryDoD}
                      onChange={(e) => setBatteryDoD(Number(e.target.value))}
                      disabled={systemMode === 'ongrid'}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium disabled:opacity-50"
                    >
                      <option value="0.9">Lithium LiFePO4 (90% DoD · 6,000 cycles)</option>
                      <option value="0.5">Tall Tubular / Lead-Acid (50% DoD)</option>
                    </select>
                  </div>

                  {/* Battery Voltage */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Battery Bank Voltage</label>
                    <select
                      value={batteryVoltage}
                      onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                      disabled={systemMode === 'ongrid'}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-medium disabled:opacity-50"
                    >
                      <option value="48">48V DC (Standard Residential)</option>
                      <option value="24">24V DC</option>
                      <option value="12">12V DC</option>
                    </select>
                  </div>

                  {/* Electricity Tariff */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex justify-between items-center">
                      <label className="font-semibold text-slate-700">Utility Electricity Rate (Rs / kWh)</label>
                      <span className="font-mono text-emerald-700 font-bold">Rs {tariffRate} / unit</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="110"
                      step="5"
                      value={tariffRate}
                      onChange={(e) => setTariffRate(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Rs 25/unit (Base slab)</span>
                      <span>Rs 110/unit (Peak summer tier)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sizing Results Card in LIGHT THEME */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-600/30 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono block">
                      ENGINEERING RECOMMENDATION
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Sized For {selectedCity}
                    </h3>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-mono px-2.5 py-1 rounded font-semibold border border-emerald-200">
                    {CITY_SUN_HOURS.find((c) => c.name === selectedCity)?.sunHours}h Sun
                  </span>
                </div>

                {/* KPI Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Peak Load Demand</span>
                    <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                      {result.peakLoadWatts.toLocaleString()} W
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Daily Energy Need</span>
                    <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                      {(result.dailyEnergyWh / 1000).toFixed(1)} kWh/day
                    </span>
                  </div>

                  <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                    <span className="text-[11px] text-emerald-800 font-medium block">Recommended Inverter</span>
                    <span className="text-lg font-extrabold text-emerald-900 font-mono tabular-nums">
                      {result.recommendedInverterKw} kW
                    </span>
                  </div>

                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                    <span className="text-[11px] text-amber-800 font-medium block">Solar PV Array Required</span>
                    <span className="text-lg font-extrabold text-amber-900 font-mono tabular-nums">
                      {result.recommendedSolarKw} kW
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 col-span-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[11px] text-slate-500 block">Battery Bank Sizing</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          {systemMode === 'ongrid'
                            ? 'Not Required (Net-Metering)'
                            : `${result.recommendedBatteryAh} Ah @ ${result.batteryVoltage}V (${(result.recommendedBatteryWh / 1000).toFixed(1)} kWh)`}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-500 block">Est. Monthly Savings</span>
                        <span className="text-base font-bold text-emerald-700 font-mono tabular-nums">
                          Rs {result.monthlySavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suggested Hardware Bundle Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Recommended Turnkey Bundle</span>
                    <span className="font-mono text-emerald-700 font-bold text-sm">
                      Rs {result.recommendedBundle.totalCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    {result.recommendedBundle.inverter && (
                      <div className="flex items-center justify-between">
                        <span className="truncate pr-2">1 × {result.recommendedBundle.inverter.name}</span>
                        <span className="font-mono text-slate-600 font-medium shrink-0">
                          Rs {((result.recommendedBundle.inverter.salePrice || result.recommendedBundle.inverter.price)).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {result.recommendedBundle.panel && (
                      <div className="flex items-center justify-between">
                        <span className="truncate pr-2">
                          {result.recommendedBundle.panelCount} × {result.recommendedBundle.panel.name}
                        </span>
                        <span className="font-mono text-slate-600 font-medium shrink-0">
                          Rs {(
                            (result.recommendedBundle.panel.salePrice || result.recommendedBundle.panel.price) *
                            result.recommendedBundle.panelCount
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {result.recommendedBundle.battery && systemMode !== 'ongrid' && (
                      <div className="flex items-center justify-between">
                        <span className="truncate pr-2">
                          {result.recommendedBundle.batteryCount} × {result.recommendedBundle.battery.name}
                        </span>
                        <span className="font-mono text-slate-600 font-medium shrink-0">
                          Rs {(
                            (result.recommendedBundle.battery.salePrice || result.recommendedBundle.battery.price) *
                            result.recommendedBundle.batteryCount
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span>Payback Period:</span>
                    <strong className="text-emerald-700 font-mono text-sm">{result.paybackYears} Years</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      if (result.recommendedBundle.inverter && result.recommendedBundle.panel) {
                        onAddBundleToCart(
                          result.recommendedBundle.inverter.id,
                          result.recommendedBundle.panel.id,
                          result.recommendedBundle.panelCount,
                          result.recommendedBundle.battery ? result.recommendedBundle.battery.id : 0,
                          result.recommendedBundle.batteryCount
                        );
                      }
                    }}
                    className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Recommended Bundle to Cart</span>
                  </button>

                  <button
                    onClick={() => setCalculatorView('roi')}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>Open Advanced ROI &amp; Cash Flow Analysis</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Advanced Return on Investment (ROI) & Payback Engine */}
        {calculatorView === 'roi' && (
          <div className="space-y-8">
            {/* ROI Control Inputs Bar */}
            <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Financial Payback &amp; Tariff Inflation Simulation
                  </h3>
                  <p className="text-xs text-slate-600">
                    Configure your current utility tariff, annual tariff increases, and net-metering export ratio.
                  </p>
                </div>
                <button
                  onClick={() => setCalculatorView('sizing')}
                  className="text-xs text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  &larr; Back to Load Sizing
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
                {/* 1. Electricity Tariff */}
                <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Local Grid Tariff</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">Rs {tariffRate}/kWh</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="115"
                    step="5"
                    value={tariffRate}
                    onChange={(e) => setTariffRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">Peak blended electricity tariff on your bill.</p>
                </div>

                {/* 2. Annual Tariff Inflation Rate */}
                <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Annual Tariff Escalation</span>
                    <span className="font-mono font-bold text-amber-700 text-sm">{tariffEscalationRate}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={tariffEscalationRate}
                    onChange={(e) => setTariffEscalationRate(Number(e.target.value))}
                    className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">Historical average tariff increase per annum.</p>
                </div>

                {/* 3. Self-Consumption vs Export */}
                <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Self-Consumption %</span>
                    <span className="font-mono font-bold text-blue-700 text-sm">{selfConsumptionPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    value={selfConsumptionPct}
                    onChange={(e) => setSelfConsumptionPct(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">{100 - selfConsumptionPct}% exported via net-metering.</p>
                </div>

                {/* 4. Net-Metering Buyback Rate */}
                <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Export Buyback Rate</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">Rs {exportFeedInRate}/kWh</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    step="1"
                    value={exportFeedInRate}
                    onChange={(e) => setExportFeedInRate(Number(e.target.value))}
                    className="w-full accent-slate-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">DISCO credit for surplus energy exported.</p>
                </div>
              </div>
            </div>

            {/* Key Financial Summary Cards (Light Theme) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Payback Period */}
              <div className="bg-emerald-50/80 rounded-2xl p-6 border-2 border-emerald-300 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                  Estimated Payback Period
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-mono tabular-nums">
                  {result.paybackYears} Years
                </div>
                <div className="text-xs text-emerald-700 font-medium pt-1">
                  ~{Math.round(result.paybackYears * 12)} Months to 100% Breakeven
                </div>
              </div>

              {/* First Year Savings */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Year 1 Total Savings
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  Rs {result.yearlySavings.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  Rs {result.monthlySavings.toLocaleString()} / month average
                </div>
              </div>

              {/* 25-Year Lifetime Net Profit */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  25-Year Net Profit
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
                  Rs {(net25YearProfit / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  After full recovery of initial capital
                </div>
              </div>

              {/* Levelized Cost of Solar Energy (LCOE) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Solar Energy Cost (LCOE)
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  Rs {lcoePerUnit} <span className="text-sm font-sans font-normal text-slate-500">/ unit</span>
                </div>
                <div className="text-xs text-emerald-700 font-medium pt-1">
                  90% cheaper than Rs {tariffRate}/unit grid power
                </div>
              </div>
            </div>

            {/* Visual Breakeven & Cumulative Cash Flow Chart */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    10-Year Cumulative Cash Flow &amp; Equity Trajectory
                  </h4>
                  <p className="text-xs text-slate-500">
                    Green bars denote net positive profit after amortizing hardware and installation investment.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-400 inline-block" />
                    <span className="text-slate-600">Amortization Period</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                    <span className="text-slate-600">Net Profit</span>
                  </div>
                </div>
              </div>

              {/* Interactive Bar Chart (Light Theme) */}
              <div className="h-44 flex items-end gap-2 pt-6 pb-2 border-b border-slate-200">
                {result.tenYearReturns.map((item) => {
                  const isPositive = item.netReturn >= 0;
                  const maxNet = Math.max(1, Math.abs(result.tenYearReturns[result.tenYearReturns.length - 1].netReturn));
                  const heightPct = Math.min(100, Math.max(18, (Math.abs(item.netReturn) / maxNet) * 90));

                  return (
                    <div
                      key={item.year}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                    >
                      {/* Bar */}
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t transition-all ${
                          isPositive
                            ? 'bg-emerald-600 group-hover:bg-emerald-500 shadow-2xs'
                            : 'bg-rose-400 group-hover:bg-rose-500 shadow-2xs'
                        }`}
                      />
                      <span className="text-[11px] font-mono text-slate-600 mt-2 font-medium">
                        Y{item.year}
                      </span>

                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 whitespace-nowrap z-20 transition-opacity font-mono">
                        Year {item.year}: {isPositive ? '+' : ''}Rs {item.netReturn.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 25-Year Comparison Table Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block mb-1">Status Quo (Grid Only over 25 Years)</span>
                  <div className="text-lg font-bold text-rose-700 font-mono">
                    -Rs {((lifetime25YearSavings * 1.15) / 1000000).toFixed(1)} Million
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Paid directly to utility company with 0 equity return.</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-800 block mb-1 font-semibold">With HomePower Solar System</span>
                  <div className="text-lg font-bold text-emerald-900 font-mono">
                    +Rs {(net25YearProfit / 1000000).toFixed(1)} Million
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-1">Net accumulated wealth kept in your household bank.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-slate-500 block mb-1">Hardware Investment (CAPEX)</span>
                    <div className="text-lg font-bold text-slate-900 font-mono">
                      Rs {result.recommendedBundle.totalCost.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={onOpenQuote}
                    className="mt-2 text-emerald-700 font-semibold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request itemized BOM &amp; survey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
