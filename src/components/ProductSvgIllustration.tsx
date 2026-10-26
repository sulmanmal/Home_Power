import React from 'react';

interface ProductSvgProps {
  type: 'hybrid-inverter' | 'offgrid-inverter' | 'commercial-inverter' | 'lithium-battery' | 'tubular-battery' | 'solar-panel' | 'accessory';
  className?: string;
}

export const ProductSvgIllustration: React.FC<ProductSvgProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'hybrid-inverter':
      return (
        <svg viewBox="0 0 320 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle grid backdrop */}
          <rect width="320" height="280" rx="16" fill="#f8fafc" />
          <path d="M40 70H280M40 140H280M40 210H280" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Wall mount backplate shadow */}
          <rect x="76" y="36" width="168" height="208" rx="14" fill="#0f172a" fillOpacity="0.06" />
          
          {/* Main Inverter Chassis */}
          <rect x="80" y="32" width="160" height="200" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Top chamfer / heat sink */}
          <rect x="90" y="24" width="140" height="12" rx="4" fill="#334155" />
          <line x1="102" y1="28" x2="218" y2="28" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="106" y1="32" x2="214" y2="32" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
          
          {/* Lateral cooling ribs */}
          <rect x="74" y="60" width="6" height="140" rx="2" fill="#94a3b8" />
          <rect x="240" y="60" width="6" height="140" rx="2" fill="#94a3b8" />
          
          {/* Glass display panel */}
          <rect x="105" y="55" width="110" height="90" rx="8" fill="#0f172a" />
          <rect x="110" y="60" width="100" height="80" rx="6" fill="#09121a" stroke="#1e293b" strokeWidth="1" />
          
          {/* Display glowing elements */}
          <circle cx="160" cy="100" r="26" stroke="#059669" strokeWidth="3" strokeDasharray="140 30" fill="none" />
          <text x="160" y="96" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">6.0 kW</text>
          <text x="160" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">MPPT ACTIVE</text>
          
          {/* Status indicators */}
          <circle cx="120" cy="72" r="3" fill="#10b981" />
          <circle cx="130" cy="72" r="3" fill="#f59e0b" />
          <circle cx="140" cy="72" r="3" fill="#38bdf8" />
          
          {/* Power waveform graphic on screen */}
          <path d="M115 128 Q125 120 135 128 T155 128 T175 128 T195 128" stroke="#10b981" strokeWidth="1.5" fill="none" />
          
          {/* Brand badge on lower chassis */}
          <rect x="120" y="165" width="80" height="18" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="160" y="177" textAnchor="middle" fill="#0f766e" fontSize="8" fontWeight="bold" letterSpacing="0.05em">HOMEPOWER</text>
          
          {/* Bottom terminal cover & cable glands */}
          <rect x="95" y="215" width="130" height="18" rx="4" fill="#334155" />
          <circle cx="115" cy="238" r="6" fill="#64748b" stroke="#334155" strokeWidth="2" />
          <circle cx="135" cy="238" r="6" fill="#dc2626" stroke="#334155" strokeWidth="2" />
          <circle cx="155" cy="238" r="6" fill="#0284c7" stroke="#334155" strokeWidth="2" />
          <circle cx="175" cy="238" r="6" fill="#10b981" stroke="#334155" strokeWidth="2" />
          <circle cx="195" cy="238" r="6" fill="#64748b" stroke="#334155" strokeWidth="2" />
          
          {/* Pure Sine Wave insignia */}
          <path d="M125 198 C135 192 140 204 150 198 C160 192 165 204 175 198 C185 192 190 204 195 198" stroke="#047857" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'commercial-inverter':
      return (
        <svg viewBox="0 0 320 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="280" rx="16" fill="#f8fafc" />
          {/* Industrial IP65 cast housing */}
          <rect x="65" y="35" width="190" height="210" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          {/* Heat sink fins on top and sides */}
          <path d="M70 20L70 35M90 18L90 35M110 18L110 35M130 18L130 35M150 18L150 35M170 18L170 35M190 18L190 35M210 18L210 35M230 18L230 35M250 20L250 35" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          
          {/* Industrial display & keypad */}
          <rect x="90" y="60" width="140" height="85" rx="6" fill="#09121a" stroke="#334155" strokeWidth="1" />
          <text x="160" y="90" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">10.0 kW</text>
          <text x="160" y="106" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">THREE-PHASE 400V</text>
          <path d="M105 125 H215" stroke="#334155" strokeWidth="1" />
          <text x="120" y="137" fill="#10b981" fontSize="8" fontFamily="monospace">EFF 98.6%</text>
          <text x="180" y="137" fill="#f59e0b" fontSize="8" fontFamily="monospace">2x MPPT</text>
          
          {/* Rotary DC Isolator Switch */}
          <circle cx="120" cy="185" r="18" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <rect x="117" y="170" width="6" height="30" rx="2" fill="#ffffff" />
          <text x="120" y="215" textAnchor="middle" fill="#94a3b8" fontSize="7">DC ISOLATOR</text>
          
          {/* Status LEDs & WiFi Dongle */}
          <rect x="175" y="165" width="55" height="40" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <circle cx="190" cy="180" r="3" fill="#10b981" />
          <text x="200" y="183" fill="#cbd5e1" fontSize="7">SYS</text>
          <circle cx="190" cy="195" r="3" fill="#38bdf8" />
          <text x="200" y="198" fill="#cbd5e1" fontSize="7">GRID</text>
          
          {/* Heavy glands at bottom */}
          <rect x="85" y="245" width="150" height="15" rx="3" fill="#0f172a" />
          <circle cx="110" cy="260" r="6" fill="#334155" />
          <circle cx="135" cy="260" r="6" fill="#334155" />
          <circle cx="160" cy="260" r="6" fill="#334155" />
          <circle cx="185" cy="260" r="6" fill="#334155" />
          <circle cx="210" cy="260" r="6" fill="#334155" />
        </svg>
      );

    case 'offgrid-inverter':
      return (
        <svg viewBox="0 0 320 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="280" rx="16" fill="#f8fafc" />
          {/* Off-grid classic tower design */}
          <rect x="85" y="30" width="150" height="220" rx="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          {/* Blue accent top */}
          <path d="M85 40 Q85 30 95 30 H225 Q235 30 235 40 V65 H85 Z" fill="#0284c7" />
          <text x="160" y="52" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">OFF-GRID SOLAR</text>
          
          {/* LCD screen */}
          <rect x="105" y="80" width="110" height="70" rx="6" fill="#0f172a" />
          <rect x="110" y="85" width="100" height="60" rx="4" fill="#042f2e" stroke="#115e59" strokeWidth="1" />
          <text x="160" y="110" textAnchor="middle" fill="#2dd4bf" fontSize="12" fontWeight="bold" fontFamily="monospace">5000 W</text>
          <text x="160" y="126" textAnchor="middle" fill="#99f6e4" fontSize="8" fontFamily="sans-serif">100A MPPT · 48V</text>
          
          {/* Air intake grilles */}
          <line x1="105" y1="170" x2="215" y2="170" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="180" x2="215" y2="180" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="190" x2="215" y2="190" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="200" x2="215" y2="200" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="120" y="215" width="80" height="22" rx="4" fill="#0284c7" />
          <text x="160" y="229" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">PURE SINE</text>
        </svg>
      );

    case 'lithium-battery':
      return (
        <svg viewBox="0 0 320 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="280" rx="16" fill="#f8fafc" />
          {/* 19-inch rack / slim wall mount chassis */}
          <rect x="55" y="60" width="210" height="160" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          {/* Brushed faceplate */}
          <rect x="62" y="67" width="196" height="146" rx="6" fill="#0f172a" />
          
          {/* Rack ears */}
          <rect x="45" y="80" width="10" height="120" rx="2" fill="#334155" />
          <circle cx="50" cy="95" r="2.5" fill="#94a3b8" />
          <circle cx="50" cy="185" r="2.5" fill="#94a3b8" />
          
          <rect x="265" y="80" width="10" height="120" rx="2" fill="#334155" />
          <circle cx="270" cy="95" r="2.5" fill="#94a3b8" />
          <circle cx="270" cy="185" r="2.5" fill="#94a3b8" />
          
          {/* Battery State of Charge (SoC) Bar */}
          <rect x="80" y="95" width="85" height="18" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="83" y="98" width="14" height="12" rx="2" fill="#10b981" />
          <rect x="99" y="98" width="14" height="12" rx="2" fill="#10b981" />
          <rect x="115" y="98" width="14" height="12" rx="2" fill="#10b981" />
          <rect x="131" y="98" width="14" height="12" rx="2" fill="#10b981" />
          <rect x="147" y="98" width="14" height="12" rx="2" fill="#10b981" />
          
          <text x="80" y="88" fill="#94a3b8" fontSize="8" fontWeight="600">STATE OF CHARGE: 100%</text>
          
          {/* Heavy Terminals: Red positive, Black negative */}
          <circle cx="195" cy="105" r="10" fill="#dc2626" stroke="#ef4444" strokeWidth="2" />
          <text x="195" y="108" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">+</text>
          
          <circle cx="230" cy="105" r="10" fill="#334155" stroke="#475569" strokeWidth="2" />
          <text x="230" y="108" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">-</text>
          
          {/* CAN / RS485 Communication RJ45 Ports */}
          <rect x="80" y="140" width="28" height="18" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
          <rect x="115" y="140" width="28" height="18" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
          <text x="94" y="168" textAnchor="middle" fill="#64748b" fontSize="6">CAN/BMS</text>
          <text x="129" y="168" textAnchor="middle" fill="#64748b" fontSize="6">RS-485</text>
          
          {/* Circuit Breaker Switch */}
          <rect x="190" y="140" width="45" height="22" rx="3" fill="#334155" />
          <rect x="195" y="144" width="15" height="14" rx="2" fill="#10b981" />
          <text x="212" y="154" fill="#ffffff" fontSize="7" fontWeight="bold">ON</text>
          
          {/* Specification text */}
          <text x="80" y="195" fill="#34d399" fontSize="9" fontWeight="bold">5.12 kWh LiFePO4</text>
          <text x="240" y="195" textAnchor="end" fill="#94a3b8" fontSize="8">6,000+ CYCLES · 90% DoD</text>
        </svg>
      );

    case 'tubular-battery':
      return (
        <svg viewBox="0 0 320 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="280" rx="16" fill="#f8fafc" />
          {/* Battery body */}
          <rect x="75" y="60" width="170" height="160" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          {/* Top cover */}
          <rect x="70" y="50" width="180" height="20" rx="4" fill="#334155" />
          
          {/* 6 Float level indicators (vent plugs) */}
          <circle cx="95" cy="55" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <line x1="95" y1="42" x2="95" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <circle cx="121" cy="55" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <line x1="121" y1="42" x2="121" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <circle cx="147" cy="55" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <line x1="147" y1="42" x2="147" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <circle cx="173" cy="55" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <line x1="173" y1="42" x2="173" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <circle cx="199" cy="55" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <line x1="199" y1="42" x2="199" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <circle cx="225" cy="55" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <line x1="225" y1="42" x2="225" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          
          {/* Heavy terminals */}
          <rect x="75" y="44" width="12" height="12" rx="2" fill="#dc2626" />
          <rect x="233" y="44" width="12" height="12" rx="2" fill="#475569" />
          
          {/* Body branding label */}
          <rect x="95" y="90" width="130" height="70" rx="6" fill="#0f766e" />
          <text x="160" y="118" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">PHOENIX</text>
          <text x="160" y="134" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">TALL TUBULAR 200Ah</text>
          <text x="160" y="148" textAnchor="middle" fill="#e0e7ff" fontSize="8">DEEP CYCLE C20 · 12V</text>
          
          {/* Ribbed reinforced bottom */}
          <line x1="90" y1="185" x2="230" y2="185" stroke="#334155" strokeWidth="3" />
          <line x1="90" y1="195" x2="230" y2="195" stroke="#334155" strokeWidth="3" />
          <line x1="90" y1="205" x2="230" y2="205" stroke="#334155" strokeWidth="3" />
        </svg>
      );

    case 'solar-panel':
      return (
        <svg viewBox="0 0 320 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="280" rx="16" fill="#f8fafc" />
          {/* 3D angled PV module */}
          <g transform="translate(10, 10)">
            {/* Outer aluminum frame */}
            <rect x="50" y="25" width="200" height="210" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="5" />
            
            {/* Silicon wafer cells grid (Mono PERC half-cut cells) */}
            <rect x="54" y="29" width="192" height="202" fill="#0b1a30" />
            
            {/* Grid lines */}
            {/* Horizontal divisions */}
            <line x1="54" y1="58" x2="246" y2="58" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="54" y1="87" x2="246" y2="87" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="54" y1="116" x2="246" y2="116" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="54" y1="145" x2="246" y2="145" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="54" y1="174" x2="246" y2="174" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="54" y1="203" x2="246" y2="203" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            
            {/* Vertical busbars */}
            <line x1="86" y1="29" x2="86" y2="231" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="118" y1="29" x2="118" y2="231" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="150" y1="29" x2="150" y2="231" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="182" y1="29" x2="182" y2="231" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="214" y1="29" x2="214" y2="231" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            
            {/* Multi-busbar silver strings */}
            <line x1="68" y1="29" x2="68" y2="231" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.7" />
            <line x1="102" y1="29" x2="102" y2="231" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.7" />
            <line x1="134" y1="29" x2="134" y2="231" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.7" />
            <line x1="166" y1="29" x2="166" y2="231" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.7" />
            <line x1="198" y1="29" x2="198" y2="231" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.7" />
            <line x1="230" y1="29" x2="230" y2="231" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.7" />
            
            {/* Photovoltaic light reflection gradient */}
            <path d="M54 29 L160 29 L70 231 L54 231 Z" fill="#ffffff" fillOpacity="0.08" />
          </g>
          {/* Wattage Badge */}
          <rect x="180" y="215" width="95" height="24" rx="4" fill="#0f766e" />
          <text x="227" y="231" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">585W TIER-1</text>
        </svg>
      );

    case 'accessory':
    default:
      return (
        <svg viewBox="0 0 320 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="280" rx="16" fill="#f8fafc" />
          {/* IP65 Protection Breaker Box */}
          <rect x="75" y="45" width="170" height="190" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
          <rect x="85" y="55" width="150" height="85" rx="6" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.5" />
          
          {/* DIN rail with breakers inside */}
          <rect x="100" y="70" width="30" height="55" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="106" y="80" width="18" height="12" rx="2" fill="#ef4444" />
          
          <rect x="135" y="70" width="30" height="55" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="141" y="80" width="18" height="12" rx="2" fill="#ef4444" />
          
          {/* Surge protection device (SPD) */}
          <rect x="175" y="70" width="40" height="55" rx="3" fill="#0f766e" />
          <text x="195" y="95" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">SPD</text>
          <text x="195" y="108" textAnchor="middle" fill="#a7f3d0" fontSize="6">1000V DC</text>
          
          {/* Latch */}
          <rect x="235" y="130" width="12" height="24" rx="2" fill="#64748b" />
          
          {/* Weatherproof glands */}
          <circle cx="105" cy="245" r="7" fill="#475569" />
          <circle cx="135" cy="245" r="7" fill="#475569" />
          <circle cx="185" cy="245" r="7" fill="#475569" />
          <circle cx="215" cy="245" r="7" fill="#475569" />
        </svg>
      );
  }
};
