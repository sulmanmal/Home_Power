import { Product, CitySunHours, AppliancePreset, WarrantyRecord, OrderTrackingInfo } from '../types/solar';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'HomePower Hybrid Inverter 6kW Max',
    slug: 'hybrid-inverter-6kw',
    sku: 'INV-6KW-PRO',
    brand: 'Inverex Pro',
    category: 'inverters',
    categoryName: 'Hybrid Inverters',
    description: 'High-efficiency 6kW hybrid solar inverter featuring dual independent MPPT trackers, pure sine wave output, 0ms UPS grid transfer, and intelligent Wi-Fi mobile telemetry. Built for demanding residential homes with air conditioning and backup priorities.',
    price: 285000,
    salePrice: 269000,
    installerPrice: 255000,
    stock: 18,
    capacity: '6.0 kW',
    voltage: '48V DC / 230V AC',
    warrantyMonths: 60,
    weightKg: 18.5,
    efficiency: '98.4%',
    mpptChannels: 2,
    maxPvVoltage: '500V DC',
    isFeatured: true,
    isNew: true,
    specs: {
      'Rated Output Power': '6,000 Watts (Peak 12,000W Surge)',
      'Waveform': 'Pure Sine Wave (THD < 2%)',
      'Max PV Array Power': '8,000 Watts',
      'MPPT Operating Voltage': '120V – 450V DC',
      'Battery Nominal Voltage': '48V (Lead-Acid & LiFePO4 compatible)',
      'Grid Net-Metering': 'Full Reverse Feed-in support with Anti-Islanding',
      'Protection Degree': 'IP65 Weatherproof & Anti-Dust',
      'Operating Temperature': '-25°C to +60°C'
    },
    features: [
      'Dual MPPT with 99.9% tracking efficiency',
      'Seamless 10ms UPS grade transfer switch',
      'Integrated Wi-Fi dongle & mobile cloud dashboard',
      'Parallel capability up to 9 units (54kW total)'
    ],
    imageSvgType: 'hybrid-inverter'
  },
  {
    id: 2,
    name: 'Apex Hybrid Inverter 3.6kW Eco',
    slug: 'hybrid-inverter-3-6kw',
    sku: 'INV-36KW',
    brand: 'Growatt Tech',
    category: 'inverters',
    categoryName: 'Hybrid Inverters',
    description: 'Compact 3.6kW residential hybrid inverter engineered specifically for medium residential homes running 1-2 inverter air conditioners, refrigerators, and essential lighting loads.',
    price: 165000,
    salePrice: 155000,
    installerPrice: 148000,
    stock: 24,
    capacity: '3.6 kW',
    voltage: '24V / 48V DC',
    warrantyMonths: 36,
    weightKg: 12.0,
    efficiency: '97.8%',
    mpptChannels: 1,
    maxPvVoltage: '450V DC',
    isFeatured: true,
    specs: {
      'Rated Output Power': '3,600 Watts (7,200W Surge)',
      'Waveform': 'Pure Sine Wave',
      'Max PV Input': '4,500 Watts',
      'MPPT Voltage Range': '90V – 430V DC',
      'Battery Voltage': '24V DC / 48V DC option',
      'Cooling': 'Smart silent temperature-controlled fan',
      'Protection Degree': 'IP21 Indoor'
    },
    features: [
      'Cost-effective high-yield residential choice',
      'Zero-export limiter clamp included',
      'RGB ambient status ring on front display',
      'BMS communication with Lithium storage'
    ],
    imageSvgType: 'hybrid-inverter'
  },
  {
    id: 3,
    name: 'Titan IP65 Hybrid Inverter 10kW 3-Phase',
    slug: 'hybrid-inverter-10kw-ip65',
    sku: 'INV-10KW-IP65',
    brand: 'Deye Global',
    category: 'inverters',
    categoryName: 'Hybrid Inverters',
    description: 'Heavy-duty 10kW three-phase outdoor rated IP65 hybrid inverter with unbalanced phase loading, generator auto-start relay, and high-voltage PV inputs.',
    price: 465000,
    salePrice: 445000,
    installerPrice: 420000,
    stock: 8,
    capacity: '10.0 kW',
    voltage: '48V DC / 400V 3-Phase',
    warrantyMonths: 60,
    weightKg: 32.0,
    efficiency: '98.6%',
    mpptChannels: 2,
    maxPvVoltage: '800V DC',
    isFeatured: true,
    isUpcoming: false,
    specs: {
      'Rated Output Power': '10,000 Watts (Three Phase 380/400V)',
      'Max PV Input Power': '13,000 Watts',
      'MPPT Channels': '2 Trackers (2+1 Strings)',
      'Unbalanced Output': '100% unbalanced phase output capability',
      'Enclosure': 'IP65 Die-cast Aluminum Housing',
      'Generator Support': 'Smart generator auto-cranking interface'
    },
    features: [
      'Supports peak shaving & tariff arbitrage modes',
      'Full 100% unbalanced 3-phase power delivery',
      'Rugged outdoor all-weather operation',
      'Touchscreen color graphical user interface'
    ],
    imageSvgType: 'commercial-inverter'
  },
  {
    id: 4,
    name: 'Terra Off-Grid Solar Inverter 5kW Pure Sine',
    slug: 'offgrid-inverter-5kw',
    sku: 'INV-5KW-OG',
    brand: 'HomePower Pro',
    category: 'inverters',
    categoryName: 'Off-Grid Inverters',
    description: 'Reliable standalone 5kW pure sine off-grid inverter with integrated 100A MPPT solar charge controller. Ideal for remote farmhouses, telecommunications towers, and areas with chronic grid outages.',
    price: 195000,
    salePrice: 185000,
    installerPrice: 172000,
    stock: 14,
    capacity: '5.0 kW',
    voltage: '48V DC',
    warrantyMonths: 24,
    weightKg: 14.2,
    efficiency: '96.5%',
    mpptChannels: 1,
    maxPvVoltage: '450V DC',
    specs: {
      'Continuous Rating': '5,000 Watts (10,000W Surge)',
      'Built-in MPPT': '100A Solar Charger',
      'Battery Voltage': '48V DC',
      'Cold Start': 'Yes, battery cold-start supported',
      'Bypass Transfer': '< 15ms'
    },
    features: [
      'Battery equalization for extended lead-acid life',
      'Works seamlessly with or without utility grid',
      'Configurable AC / Solar input priority via LCD'
    ],
    imageSvgType: 'offgrid-inverter'
  },
  {
    id: 5,
    name: 'EcoVault LiFePO4 Lithium Battery 5.12kWh',
    slug: 'lithium-battery-5kwh',
    sku: 'BAT-LI5-48V',
    brand: 'Pylontech US5000',
    category: 'batteries',
    categoryName: 'Lithium Batteries',
    description: 'Tier-1 Lithium Iron Phosphate (LiFePO4) storage module. 48V 100Ah capacity offering 6,000+ deep cycles at 90% Depth of Discharge with a 10-year design life and integrated smart BMS.',
    price: 325000,
    salePrice: 310000,
    installerPrice: 295000,
    stock: 22,
    capacity: '5.12 kWh / 100Ah',
    voltage: '51.2V Nominal (48V)',
    warrantyMonths: 120,
    weightKg: 44.0,
    efficiency: '96.0% Round-trip',
    isFeatured: true,
    isNew: true,
    specs: {
      'Nominal Energy': '5.12 kWh (100 Amp Hours)',
      'Usable Energy': '4.8 kWh (90% recommended DoD)',
      'Cycle Life': '> 6,000 Cycles @ 25°C, 90% DoD',
      'Nominal Voltage': '51.2V DC (Operating 44.5V – 53.5V)',
      'Max Continuous Discharge': '100A (5.12 kW Peak)',
      'Communication': 'CAN / RS485 to all major inverters',
      'Dimensions': '442 × 420 × 161 mm (Standard 19-inch rack)'
    },
    features: [
      'Non-toxic, safe thermal-stable LiFePO4 chemistry',
      'Zero maintenance, no acid fumes, no water topping',
      'Stackable up to 16 units in parallel (82kWh total)',
      '10-Year manufacturer performance warranty'
    ],
    imageSvgType: 'lithium-battery'
  },
  {
    id: 6,
    name: 'PowerWall Slim 10.24kWh Wall-Mount Storage',
    slug: 'wall-lithium-10kwh',
    sku: 'BAT-WALL-10K',
    brand: 'HomePower SolarCore',
    category: 'batteries',
    categoryName: 'Lithium Batteries',
    description: 'Ultra-slim architectural wall-mounted 10.24kWh battery bank with built-in LCD capacity gauge, automatic circuit breaker, and fire-suppression aerosol capsule.',
    price: 590000,
    salePrice: 565000,
    installerPrice: 535000,
    stock: 7,
    capacity: '10.24 kWh / 200Ah',
    voltage: '51.2V DC',
    warrantyMonths: 120,
    weightKg: 88.0,
    efficiency: '97.2% Round-trip',
    isUpcoming: false,
    specs: {
      'Usable Capacity': '9.6 kWh at 90% DoD',
      'Cell Chemistry': 'Grade-A prismatic LiFePO4 cells',
      'Wall Mount Footprint': '650 × 900 × 185 mm',
      'Safety Standard': 'IEC 62619 / UN38.3 / CE Certified',
      'BMS Protections': 'Over-charge, over-discharge, over-current, cell balance'
    },
    features: [
      'Sleek residential aesthetic for living spaces or garage',
      'Plug-and-play communication with Hybrid inverters',
      'Integrated fire safety thermal barrier',
      'Real-time state of charge (SoC) LED bar meter'
    ],
    imageSvgType: 'lithium-battery'
  },
  {
    id: 7,
    name: 'Phoenix Deep Cycle Tall Tubular Battery 200Ah',
    slug: 'tubular-battery-200ah',
    sku: 'BAT-TB200',
    brand: 'Phoenix Power',
    category: 'batteries',
    categoryName: 'Tubular Batteries',
    description: 'Heavy-duty lead-antimony tall tubular plate battery designed for high ambient temperatures and repetitive deep discharges in tropical climates.',
    price: 62000,
    salePrice: 58000,
    installerPrice: 54000,
    stock: 45,
    capacity: '200 Ah @ C20',
    voltage: '12V DC',
    warrantyMonths: 18,
    weightKg: 62.0,
    efficiency: '85.0%',
    specs: {
      'Nominal Voltage': '12V DC',
      'Rated Capacity': '200 Ampere Hours at 20-hour rate',
      'Plate Technology': 'High pressure die-cast spine tubular',
      'Electrolyte': 'Sp. Gravity 1.250 at 27°C',
      'Cycle Life': '1,200 to 1,500 cycles at 50% DoD'
    },
    features: [
      'Low antimony alloy ensures minimal water loss',
      'Ceramic vent plugs with electrolyte level indicators',
      'Robust handles for easy transport and rack installation'
    ],
    imageSvgType: 'tubular-battery'
  },
  {
    id: 8,
    name: 'Longi Hi-MO 6 Tier-1 Mono PERC 585W Panel',
    slug: 'mono-perc-585w',
    sku: 'PV-585-LONGI',
    brand: 'Longi Solar Tier-1',
    category: 'panels',
    categoryName: 'Solar PV Panels',
    description: 'World-leading Tier-1 monocrystalline half-cell photovoltaic module with 22.8% module efficiency, anti-PID technology, and 25-year linear power guarantee.',
    price: 29000,
    salePrice: 27500,
    installerPrice: 26000,
    stock: 220,
    capacity: '585 Watts',
    voltage: '42.6V Vmp / 51.4V Voc',
    warrantyMonths: 144,
    weightKg: 27.5,
    efficiency: '22.8%',
    isFeatured: true,
    specs: {
      'Maximum Power (Pmax)': '585 Watts',
      'Open Circuit Voltage (Voc)': '51.4 Volts',
      'Short Circuit Current (Isc)': '14.35 Amps',
      'Voltage at Pmax (Vmp)': '42.6 Volts',
      'Current at Pmax (Imp)': '13.73 Amps',
      'Frame': 'Anodized 35mm Aluminum Alloy',
      'Front Glass': '3.2mm Anti-reflective tempered glass',
      'Connector': 'Original MC4-EVO2 IP68'
    },
    features: [
      'Half-cut cell design minimizes shade losses',
      'Lower temperature coefficient: -0.29%/°C',
      'Withstands 5400 Pa snow and 2400 Pa wind loads',
      '12-year product warranty & 25-year 85% power guarantee'
    ],
    imageSvgType: 'solar-panel'
  },
  {
    id: 9,
    name: 'Jinko Tiger Neo N-Type TOPCon 610W Bifacial',
    slug: 'n-type-topcon-610w',
    sku: 'PV-610-JINKO',
    brand: 'JinkoSolar',
    category: 'panels',
    categoryName: 'Solar PV Panels',
    description: 'Next-generation N-Type TOPCon bifacial dual-glass module producing up to 25% additional energy yield from rear-side albedo reflection.',
    price: 33000,
    salePrice: 31000,
    installerPrice: 29500,
    stock: 160,
    capacity: '610 Watts (up to 750W with albedo)',
    voltage: '44.8V Vmp / 53.6V Voc',
    warrantyMonths: 180,
    weightKg: 31.0,
    efficiency: '23.4%',
    isNew: true,
    specs: {
      'Front Power': '610 Watts',
      'Bifaciality Factor': '80% ± 5%',
      'Glass': '2.0mm + 2.0mm Dual Heat-strengthened Glass',
      'Degradation': '< 1.0% in Year 1, < 0.40% Annual',
      'Temperature Coefficient': '-0.30%/°C'
    },
    features: [
      'Dual-glass encapsulation for 30-year lifetime',
      'Higher energy production in low-light and cloudy days',
      'Zero Light Induced Degradation (LID/LeTID)'
    ],
    imageSvgType: 'solar-panel'
  },
  {
    id: 10,
    name: 'Galvanized L2 Heavy Duty Roof Mounting Structure',
    slug: 'mounting-structure',
    sku: 'ACC-MNT-L2',
    brand: 'HomePower SolarRig',
    category: 'accessories',
    categoryName: 'Mounting & Balance of System',
    description: 'Hot-dip galvanized GI structure designed to hold 2 large format PV panels with adjustable tilt angle (15° to 30°) and anti-corrosive stainless fasteners.',
    price: 6500,
    salePrice: 5900,
    stock: 280,
    warrantyMonths: 120,
    weightKg: 8.5,
    specs: {
      'Material': 'Hot-dip galvanized iron (80 micron zinc coating)',
      'Wind Tolerance': 'Up to 150 km/h wind shear',
      'Fasteners': 'SS-304 Stainless Steel Bolts & Washers',
      'Configuration': 'L2 (2 panels portrait or landscape)'
    },
    features: [
      'Pre-drilled slotted holes for rapid toolless panel clamping',
      'Resistant to coastal moisture and urban pollution',
      '10-Year rust-free structural integrity warranty'
    ],
    imageSvgType: 'accessory'
  },
  {
    id: 11,
    name: 'DC Solar Distribution Box 2-String with SPD & Breakers',
    slug: 'dc-distribution-box',
    sku: 'ACC-DB-2S',
    brand: 'Suntree IP65',
    category: 'accessories',
    categoryName: 'Protection & Switchgear',
    description: 'Pre-wired IP65 distribution box featuring 1000V DC surge protection device (SPD Type II), dual 32A DC circuit breakers, and fuse holders for electrical safety.',
    price: 14500,
    stock: 60,
    warrantyMonths: 36,
    weightKg: 3.2,
    specs: {
      'Max Operating Voltage': '1000 Volts DC',
      'Surge Protector': 'Type II SPD In 20kA / Imax 40kA',
      'Breakers': '2 × 2-Pole 32A DC Breakers',
      'Protection Degree': 'IP65 Waterproof Enclosure'
    },
    features: [
      'Protects hybrid inverter against lightning strikes & surges',
      'Transparent viewing window with safety padlock latch',
      'Pre-installed PG13.5 weatherproof cable glands'
    ],
    imageSvgType: 'accessory'
  },
  {
    id: 12,
    name: 'Smart Wi-Fi Data Logger Stick & Cloud Gateway',
    slug: 'wifi-dongle-cloud',
    sku: 'ACC-WIFI-GTW',
    brand: 'HomePower Cloud',
    category: 'accessories',
    categoryName: 'Monitoring & Controls',
    description: 'Plug-and-play RS232/USB Wi-Fi telemetry stick connecting your solar inverter to mobile iOS/Android apps for live wattage, generation logs, and grid net-metering metrics.',
    price: 7500,
    stock: 95,
    warrantyMonths: 24,
    weightKg: 0.3,
    specs: {
      'Wireless': '802.11 b/g/n (2.4 GHz)',
      'Data Refresh Rate': 'Real-time (5-second streaming)',
      'Cloud Server': 'Encrypted AWS IoT Core telemetry',
      'Interface': 'DB9 Serial / USB Inverter Port'
    },
    features: [
      'Automatic firmware over-the-air (OTA) updates',
      'Push notification alerts for grid outage & faults',
      'Exportable CSV generation history reports'
    ],
    imageSvgType: 'accessory'
  }
];

export const CITY_SUN_HOURS: CitySunHours[] = [
  { name: 'Lahore', sunHours: 5.5, avgIrradiance: '1,850 kWh/m²/yr' },
  { name: 'Karachi', sunHours: 5.8, avgIrradiance: '1,980 kWh/m²/yr' },
  { name: 'Islamabad / Rawalpindi', sunHours: 5.6, avgIrradiance: '1,890 kWh/m²/yr' },
  { name: 'Multan', sunHours: 6.0, avgIrradiance: '2,050 kWh/m²/yr' },
  { name: 'Quetta', sunHours: 6.2, avgIrradiance: '2,180 kWh/m²/yr' },
  { name: 'Peshawar', sunHours: 5.4, avgIrradiance: '1,820 kWh/m²/yr' },
  { name: 'Faisalabad', sunHours: 5.7, avgIrradiance: '1,910 kWh/m²/yr' },
  { name: 'Dubai / Gulf Region', sunHours: 6.4, avgIrradiance: '2,240 kWh/m²/yr' },
];

export const APPLIANCE_PRESETS: AppliancePreset[] = [
  { id: 'ac15', name: 'Inverter AC (1.5 Ton)', watts: 1400, defaultQty: 1, defaultHours: 8, defaultNight: false, category: 'cooling' },
  { id: 'ac10', name: 'Inverter AC (1.0 Ton)', watts: 1000, defaultQty: 1, defaultHours: 6, defaultNight: false, category: 'cooling' },
  { id: 'fan', name: 'Ceiling Fan (BLDC/Standard)', watts: 75, defaultQty: 4, defaultHours: 12, defaultNight: true, category: 'cooling' },
  { id: 'fridge', name: 'Inverter Refrigerator', watts: 200, defaultQty: 1, defaultHours: 24, defaultNight: true, category: 'kitchen' },
  { id: 'freezer', name: 'Deep Freezer', watts: 300, defaultQty: 1, defaultHours: 18, defaultNight: true, category: 'kitchen' },
  { id: 'pump', name: 'Water Pump / Motor (1 HP)', watts: 750, defaultQty: 1, defaultHours: 1.5, defaultNight: false, category: 'heavy' },
  { id: 'led', name: 'LED Lights (Energy Saver)', watts: 15, defaultQty: 8, defaultHours: 8, defaultNight: true, category: 'lighting' },
  { id: 'tv', name: 'Smart LED TV (55")', watts: 110, defaultQty: 1, defaultHours: 6, defaultNight: true, category: 'electronics' },
  { id: 'wifi', name: 'Wi-Fi Router & Surveillance', watts: 35, defaultQty: 1, defaultHours: 24, defaultNight: true, category: 'electronics' },
  { id: 'iron', name: 'Electric Clothes Iron', watts: 1000, defaultQty: 1, defaultHours: 1, defaultNight: false, category: 'heavy' },
  { id: 'wash', name: 'Automatic Washing Machine', watts: 500, defaultQty: 1, defaultHours: 1.5, defaultNight: false, category: 'heavy' },
];

export const SAMPLE_WARRANTY_DB: Record<string, WarrantyRecord> = {
  'INV-6K-98241': {
    serialNumber: 'INV-6K-98241',
    productName: 'HomePower Hybrid Inverter 6kW Max',
    model: 'INV-6KW-PRO',
    purchaseDate: '2025-04-12',
    installedBy: 'GreenPeak Solar Certified Engineers',
    warrantyPeriodMonths: 60,
    warrantyExpires: '2030-04-12',
    status: 'valid',
    ownerName: 'Rashid Mehmood',
    city: 'Lahore (DHA Phase 5)'
  },
  'BAT-5K-44109': {
    serialNumber: 'BAT-5K-44109',
    productName: 'EcoVault LiFePO4 Lithium Battery 5.12kWh',
    model: 'BAT-LI5-48V',
    purchaseDate: '2025-08-20',
    installedBy: 'SunVolt Systems',
    warrantyPeriodMonths: 120,
    warrantyExpires: '2035-08-20',
    status: 'valid',
    ownerName: 'Zainab Tariq',
    city: 'Islamabad (Sector F-7)'
  },
  'INV-36K-10294': {
    serialNumber: 'INV-36K-10294',
    productName: 'Apex Hybrid Inverter 3.6kW Eco',
    model: 'INV-36KW',
    purchaseDate: '2024-02-15',
    installedBy: 'Premier Solar Dynamics',
    warrantyPeriodMonths: 36,
    warrantyExpires: '2027-02-15',
    status: 'valid',
    ownerName: 'Kamran Siddiqui',
    city: 'Karachi (Clifton)'
  }
};

export const SAMPLE_TRACKING_ORDERS: Record<string, OrderTrackingInfo> = {
  'HP-89211': {
    orderNumber: 'HP-89211',
    customerName: 'Muhammad Ali Khan',
    city: 'Lahore',
    orderDate: 'October 24, 2026',
    totalAmount: 312500,
    status: 'dispatched',
    courierName: 'Trax Logistics Heavy Cargo',
    trackingNumber: 'TRX-9982410-PK',
    estimatedDelivery: 'October 27, 2026',
    timeline: [
      { title: 'Order Confirmed', description: 'Payment verified via Meezan Direct Bank Transfer', timestamp: 'Oct 24, 11:20 AM', done: true },
      { title: 'Technical Quality Inspection', description: 'Inverter firmware flashed and serial number logged for warranty', timestamp: 'Oct 24, 04:45 PM', done: true },
      { title: 'Dispatched from Warehouse', description: 'Handed to Trax Logistics Heavy freight team', timestamp: 'Oct 25, 09:15 AM', done: true },
      { title: 'Out for Installation Delivery', description: 'Courier courier en route to destination address', timestamp: 'Oct 27, In Transit', done: false },
      { title: 'Completed & Certified', description: 'On-site installation and grid commissioning', timestamp: 'Pending delivery', done: false }
    ],
    items: [
      { productName: 'HomePower Hybrid Inverter 6kW Max', qty: 1, price: 269000 },
      { productName: 'Longi Hi-MO 6 Tier-1 Mono PERC 585W', qty: 2, price: 55000 }
    ]
  },
  'HP-94102': {
    orderNumber: 'HP-94102',
    customerName: 'Dr. Shahbaz Ahmed',
    city: 'Islamabad',
    orderDate: 'October 25, 2026',
    totalAmount: 645000,
    status: 'verified',
    courierName: 'TCS Overland Specialized',
    trackingNumber: 'TCS-881230-ISB',
    estimatedDelivery: 'October 29, 2026',
    timeline: [
      { title: 'Order Confirmed', description: 'Raast instant transaction approved', timestamp: 'Oct 25, 02:10 PM', done: true },
      { title: 'Technical Quality Inspection', description: 'LiFePO4 battery pack cell voltage balancing check passed', timestamp: 'Oct 26, 10:00 AM', done: true },
      { title: 'Dispatched from Warehouse', description: 'Packaging with wooden crating for heavy battery transport', timestamp: 'Preparing dispatch', done: false },
      { title: 'Out for Installation Delivery', description: 'Courier dispatch to Islamabad depot', timestamp: 'Estimated Oct 28', done: false },
      { title: 'Completed & Certified', description: 'Installation and commissioning', timestamp: 'Pending', done: false }
    ],
    items: [
      { productName: 'EcoVault LiFePO4 Lithium Battery 5.12kWh', qty: 2, price: 620000 },
      { productName: 'Smart Wi-Fi Data Logger Stick', qty: 1, price: 7500 }
    ]
  }
};
