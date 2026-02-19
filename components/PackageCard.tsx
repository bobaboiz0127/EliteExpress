
import React from 'react';
import { DetailingPackage } from '../types';

interface PackageCardProps {
  pkg: DetailingPackage;
  onSelect: (pkg: DetailingPackage) => void;
  isRecommended?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, isRecommended }) => {
  return (
    <div className={`relative flex flex-col p-8 rounded-3xl shadow-2xl transition-all hover:scale-[1.01] border-2 ${
      isRecommended ? 'orchid-border bg-slate-800/80' : 'border-slate-800 bg-slate-900/50'
    }`}>
      {isRecommended && (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 orchid-bg text-white px-8 py-2 rounded-full text-lg font-black uppercase tracking-widest shadow-2xl">
          AI RECOMMENDATION
        </span>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
        <div>
          <h3 className="text-4xl font-black text-white mb-2">{pkg.name}</h3>
          <div className="text-5xl font-black orchid-text">{pkg.price}</div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center text-slate-300 font-black bg-slate-800 px-5 py-2 rounded-2xl text-xl border border-slate-700">
            <svg className="w-6 h-6 mr-2 orchid-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {pkg.duration}
          </div>
          <div className="text-fuchsia-300 font-black text-sm uppercase tracking-widest bg-fuchsia-900/30 px-5 py-2 rounded-2xl border border-fuchsia-800/50">
            {pkg.typicalWait}
          </div>
        </div>
      </div>

      <div className="bg-slate-950/50 rounded-2xl p-6 mb-8 border border-slate-800 shadow-inner">
        <span className="orchid-text font-black text-xs uppercase tracking-[0.2em] block mb-2">Exclusive Benefit:</span>
        <p className="text-2xl font-bold text-white leading-tight">
          {pkg.benefits}
        </p>
      </div>

      <div className="flex-grow mb-10">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Service Checklist:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-xl text-slate-300 font-semibold group">
              <svg className="w-7 h-7 orchid-text mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onSelect(pkg)}
        className="w-full py-6 px-10 orchid-bg hover:brightness-110 text-white font-black rounded-3xl text-3xl shadow-2xl transition-all active:scale-95 uppercase tracking-widest"
      >
        SELECT PACKAGE
      </button>
    </div>
  );
};

export default PackageCard;
