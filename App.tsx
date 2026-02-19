
import React, { useState } from 'react';
import { PACKAGES, SERVICE_AREAS, ADD_ONS } from './constants';
import PackageCard from './components/PackageCard';
import ChatBot from './components/ChatBot';
import ServiceMap from './components/ServiceMap';
import CalendarPicker from './components/CalendarPicker';
import { DetailingPackage } from './types';

const App: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<DetailingPackage | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [addToReminder, setAddToReminder] = useState(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 4) as File[]; 
      const promises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(results => {
        setSelectedImages(results);
      });
    }
  };

  const handlePackageSelect = (pkg: DetailingPackage) => {
    setCurrentPackage(pkg);
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const closeBooking = () => {
    setShowBookingModal(false);
    setBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen pb-32 bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 py-5 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="orchid-bg p-2.5 rounded-2xl shadow-lg orchid-shadow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">EliteExpress</h1>
              <p className="text-[10px] font-black orchid-text tracking-[0.4em] uppercase">Premium Detailing</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-slate-400 bg-slate-950 px-5 py-2.5 rounded-2xl border border-slate-800">
              <svg className="w-5 h-5 mr-3 orchid-text" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-black text-sm uppercase tracking-widest text-slate-300">DFW METROPLEX</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-16">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight">
            THE LUXURY OF <br/>
            <span className="orchid-text italic">PURE CLEAN</span>
          </h2>
          <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Five-star mobile detailing delivered to your door in <span className="text-white font-bold">Dallas, Plano, Richardson, and Frisco.</span>
          </p>
        </div>

        {/* Section 1: Map & Multi-Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div className="bg-slate-900/50 p-2 rounded-[2rem] border border-slate-800 shadow-2xl">
            <ServiceMap />
          </div>
          
          <section className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col">
            <div className="mb-8">
              <h3 className="text-3xl font-black text-white mb-4 flex items-center uppercase">
                <div className="w-2 h-10 orchid-bg mr-4 rounded-full"></div>
                Step 1: Vehicle Scan
              </h3>
              <p className="text-xl text-slate-400 font-medium">
                Upload up to 4 photos. Our AI analyzes condition and paint for an accurate recommendation.
              </p>
            </div>
            
            <div className="relative group flex-grow">
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="car-upload" />
              <label
                htmlFor="car-upload"
                className={`flex flex-col items-center justify-center w-full min-h-[350px] border-4 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300 ${
                  selectedImages.length > 0 ? 'border-fuchsia-600 bg-fuchsia-950/10' : 'border-slate-800 bg-slate-950/50 hover:bg-slate-950 hover:border-slate-700'
                }`}
              >
                {selectedImages.length > 0 ? (
                  <div className="p-4 grid grid-cols-2 gap-4 w-full">
                    {selectedImages.map((img, i) => (
                      <div key={i} className="relative h-32 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-lg">
                        <img src={img} alt="Vehicle view" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {selectedImages.length < 4 && (
                      <div className="h-32 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600 font-black text-xs uppercase tracking-widest">
                        + Add Photo
                      </div>
                    )}
                    <div className="col-span-2 text-center pt-2">
                      <span className="bg-fuchsia-600 text-white px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-xl">REPLACE PHOTOS</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-12">
                    <div className="orchid-bg p-8 rounded-[2rem] shadow-2xl mb-8 text-white orchid-shadow">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-3xl font-black text-white tracking-wide">SCAN VEHICLE</span>
                    <p className="text-slate-500 mt-4 text-xl font-bold uppercase tracking-widest italic">TAP TO CAPTURE VIEWS</p>
                  </div>
                )}
              </label>
            </div>
          </section>
        </div>

        {/* Section 2: Chat Advisor */}
        <div className="mb-20">
          <div className="mb-10">
            <h3 className="text-4xl font-black text-white flex items-center uppercase tracking-tighter">
              <div className="w-3 h-12 orchid-bg mr-5 rounded-full"></div>
              Step 2: AI Advisor & Booking
            </h3>
            <p className="text-2xl text-slate-500 mt-3 font-semibold italic">"I'll help you pick the right service and get scheduled."</p>
          </div>
          <ChatBot initialImages={selectedImages} />
        </div>

        {/* Section 3: Live Calendar */}
        <div className="mb-32">
          <div className="mb-10">
            <h3 className="text-4xl font-black text-white flex items-center uppercase tracking-tighter">
              <div className="w-3 h-12 orchid-bg mr-5 rounded-full"></div>
              Step 3: Select Arrival Time
            </h3>
            <p className="text-2xl text-slate-500 mt-3 font-semibold italic">"See our real-time availability in your area."</p>
          </div>
          <CalendarPicker 
            selectedDate={selectedDate} 
            selectedTime={selectedTime} 
            onSelect={(d, t) => { setSelectedDate(d); setSelectedTime(t); }} 
          />
        </div>

        {/* Section 4: Package Tiers */}
        <div className="mb-40">
          <div className="text-center mb-16">
            <h3 className="text-6xl font-black text-white mb-6 uppercase tracking-tight">ELITE SERVICE TIERS</h3>
            <p className="text-2xl text-slate-500 font-bold tracking-widest uppercase italic">The Diamond Standard of Detail</p>
          </div>
          <div className="grid grid-cols-1 gap-16">
            {PACKAGES.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                onSelect={handlePackageSelect}
                isRecommended={selectedImages.length > 0 && pkg.id === 'premium'} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && currentPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
          <div className="bg-slate-900 w-full max-w-2xl rounded-[3rem] p-12 shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-slate-800 overflow-y-auto max-h-[95vh] orchid-shadow relative">
            
            {!bookingConfirmed ? (
              <>
                <div className="flex justify-between items-start mb-10">
                  <h2 className="text-5xl font-black text-white tracking-tighter">FINAL DETAILS</h2>
                  <button onClick={closeBooking} className="text-slate-500 hover:text-white p-2 transition-colors">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-slate-950 p-8 rounded-[2rem] border border-slate-800 mb-10">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="orchid-text font-black uppercase tracking-[0.3em] text-[10px] mb-2">Service</p>
                      <div className="text-4xl font-black text-white leading-none uppercase">{currentPackage.name}</div>
                    </div>
                    <div className="text-right">
                      <p className="orchid-text font-black uppercase tracking-[0.3em] text-[10px] mb-2">Investment</p>
                      <div className="text-4xl font-black text-white leading-none">{currentPackage.price}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800/50">
                    <div>
                      <p className="text-slate-600 font-black text-[10px] uppercase tracking-widest mb-2">Scheduled For</p>
                      <p className="text-2xl font-black text-slate-300">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {month:'short', day:'numeric'}) : 'TBD'} @ {selectedTime || 'TBD'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-black text-[10px] uppercase tracking-widest mb-2">Service Area</p>
                      <p className="text-2xl font-black text-slate-300">DFW Metro</p>
                    </div>
                  </div>
                </div>

                <form className="space-y-8" onSubmit={handleConfirmBooking}>
                  <div>
                    <label className="block text-xl font-black text-slate-500 mb-3 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" required value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full p-6 bg-slate-950 border-2 border-slate-800 rounded-2xl text-2xl font-bold text-white focus:orchid-border outline-none transition-all placeholder:text-slate-800" 
                    />
                  </div>
                  <div>
                    <label className="block text-xl font-black text-slate-500 mb-3 uppercase tracking-widest">Phone Number (For Arrival Alerts)</label>
                    <input 
                      type="tel" required value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full p-6 bg-slate-950 border-2 border-slate-800 rounded-2xl text-2xl font-bold text-white focus:orchid-border outline-none transition-all placeholder:text-slate-800" 
                    />
                  </div>
                  <button 
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-7 orchid-bg text-white font-black text-3xl rounded-[2rem] shadow-2xl transition-all active:scale-95 uppercase tracking-widest disabled:opacity-20"
                  >
                    Confirm Elite Booking
                  </button>
                  {!selectedDate && <p className="text-center text-red-500 font-bold animate-pulse uppercase tracking-widest text-sm">Please select a time slot on the main page first</p>}
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-32 h-32 orchid-bg text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl orchid-shadow animate-bounce">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-6xl font-black text-white mb-4 tracking-tighter uppercase leading-none">ELITE BOOKED</h2>
                <p className="text-2xl text-slate-400 mb-8 font-bold italic">See you on {new Date(selectedDate).toLocaleDateString('en-US', {month:'long', day:'numeric'})}!</p>
                
                <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-10 text-left mb-10">
                  <div className="flex justify-between items-center mb-8 border-b border-slate-900 pb-6">
                    <span className="text-slate-600 font-black uppercase tracking-[0.4em] text-xs">ORDER TRACKING</span>
                    <span className="orchid-text font-black text-3xl">#EE-{Math.floor(1000 + Math.random() * 8999)}</span>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-black text-xl uppercase tracking-widest">Tier</span>
                      <span className="text-white font-black text-xl uppercase tracking-widest">{currentPackage.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-black text-xl uppercase tracking-widest">Phone</span>
                      <span className="text-white font-black text-xl">{customerPhone}</span>
                    </div>
                    <div className="flex justify-between pt-6 border-t border-slate-900">
                      <span className="text-slate-500 font-black text-xl uppercase tracking-widest">Total Est.</span>
                      <span className="orchid-text font-black text-3xl">{currentPackage.price}</span>
                    </div>
                  </div>
                </div>

                {/* New Feature: Add to App Reminder */}
                <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl mb-12 text-left">
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <h4 className="text-xl font-black text-white mb-1 uppercase">Add Appointment Reminder?</h4>
                      <p className="text-slate-400 text-lg font-medium">Keep track of your detailing session directly in your EliteExpress App.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-2">
                      <input type="checkbox" checked={addToReminder} onChange={(e) => setAddToReminder(e.target.checked)} className="sr-only peer" />
                      <div className="w-14 h-8 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:orchid-bg"></div>
                    </label>
                  </div>
                  {addToReminder && (
                    <div className="mt-4 p-4 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl flex items-center text-fuchsia-300 font-bold">
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Reminder enabled for {selectedTime}.
                    </div>
                  )}
                </div>

                <div className="bg-slate-800/20 p-6 rounded-2xl mb-12">
                  <p className="text-slate-400 font-bold text-lg leading-relaxed italic">
                    Our Elite Technician will text your phone ({customerPhone}) when they are 15 minutes away from your location.
                  </p>
                </div>

                <button onClick={closeBooking} className="w-full py-6 bg-white text-black font-black text-2xl rounded-[2rem] shadow-2xl transition-all active:scale-95 uppercase tracking-widest">
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Persistent Contact Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
          <div className="mb-6 sm:mb-0 text-center sm:text-left">
            <p className="text-slate-500 font-black text-xs uppercase tracking-[0.5em] mb-1">Elite Concierge Service</p>
            <p className="text-white font-black text-3xl tracking-tighter uppercase italic leading-none">EliteExpress: (555) 012-3456</p>
          </div>
          <a href="tel:5550123" className="flex items-center orchid-bg text-white font-black text-2xl hover:scale-105 transition-all px-12 py-5 rounded-3xl shadow-2xl orchid-shadow uppercase tracking-widest">
            Call To Schedule
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
