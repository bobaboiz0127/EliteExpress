
import React from 'react';

interface CalendarPickerProps {
  selectedDate: string;
  selectedTime: string;
  onSelect: (date: string, time: string) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, selectedTime, onSelect }) => {
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const times = ["8:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 orchid-shadow">
      <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight flex items-center">
        <svg className="w-8 h-8 mr-3 orchid-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Live Availability
      </h3>
      
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {next7Days.map((d) => (
          <button
            key={d.full}
            onClick={() => onSelect(d.full, selectedTime)}
            className={`flex-shrink-0 w-20 py-4 rounded-2xl border-2 transition-all ${
              selectedDate === d.full 
                ? 'orchid-border orchid-bg text-white shadow-lg' 
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-black uppercase tracking-widest mb-1">{d.day}</div>
            <div className="text-2xl font-black">{d.date}</div>
            <div className="text-[10px] font-bold uppercase">{d.month}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(selectedDate, t)}
            className={`py-4 rounded-2xl border-2 text-xl font-black transition-all ${
              selectedTime === t 
                ? 'orchid-border orchid-bg text-white shadow-lg' 
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      
      {!selectedDate || !selectedTime ? (
        <p className="mt-6 text-center text-slate-500 font-bold uppercase tracking-widest text-sm animate-pulse">
          Please select a preferred slot
        </p>
      ) : (
        <div className="mt-6 p-4 bg-fuchsia-950/20 border border-fuchsia-800/30 rounded-2xl text-center">
          <p className="orchid-text font-black text-lg">
            Slot Locked: {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} @ {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
