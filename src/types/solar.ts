export type ProductCategory = 'inverters' | 'batteries' | 'panels' | 'accessories';

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  price: number;
  salePrice?: number;
  installerPrice?: number;
  stock: number;
  capacity?: string;
  voltage?: string;
  warrantyMonths: number;
  weightKg: number;
  efficiency?: string;
  mpptChannels?: number;
  maxPvVoltage?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isUpcoming?: boolean;
  launchDate?: string;
  specs: Record<string, string>;
  features: string[];
  imageSvgType: 'hybrid-inverter' | 'offgrid-inverter' | 'commercial-inverter' | 'lithium-battery' | 'tubular-battery' | 'solar-panel' | 'accessory';
}

export interface AppliancePreset {
  id: string;
  name: string;
  watts: number;
  defaultQty: number;
  defaultHours: number;
  defaultNight: boolean;
  category: 'cooling' | 'lighting' | 'kitchen' | 'heavy' | 'electronics';
}

export interface ApplianceRowItem {
  id: string;
  name: string;
  watts: number;
  qty: number;
  hours: number;
  runsAtNight: boolean;
}

export interface CitySunHours {
  name: string;
  sunHours: number;
  avgIrradiance: string;
}

export interface CalculationResult {
  peakLoadWatts: number;
  dailyEnergyWh: number;
  nightEnergyWh: number;
  recommendedInverterKw: number;
  recommendedSolarKw: number;
  recommendedBatteryWh: number;
  recommendedBatteryAh: number;
  batteryVoltage: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackYears: number;
  recommendedBundle: {
    inverter: Product | null;
    panel: Product | null;
    panelCount: number;
    battery: Product | null;
    batteryCount: number;
    totalCost: number;
  };
  tenYearReturns: { year: number; netReturn: number }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WarrantyRecord {
  serialNumber: string;
  productName: string;
  model: string;
  purchaseDate: string;
  installedBy: string;
  warrantyPeriodMonths: number;
  warrantyExpires: string;
  status: 'valid' | 'expired' | 'under_review';
  ownerName: string;
  city: string;
}

export interface OrderTrackingInfo {
  orderNumber: string;
  customerName: string;
  city: string;
  orderDate: string;
  totalAmount: number;
  status: 'placed' | 'verified' | 'dispatched' | 'delivered';
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    done: boolean;
  }[];
  items: {
    productName: string;
    qty: number;
    price: number;
  }[];
}

export type MenuStyle = 'classic' | 'centered' | 'boxed' | 'underline';
