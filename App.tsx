
import React, { useState, useRef } from 'react';
import { DeviceType, TechNeed, Recommendation } from './types';
import { getAIRecommendations } from './geminiService';
import { Search, Monitor, Smartphone, Zap, Shield, HelpCircle, ArrowRight, Loader2, CheckCircle, RefreshCcw, Cpu, Lock, Star } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<TechNeed | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[]>([]);
  
  const wizardRef = useRef<HTMLDivElement>(null);

  const scrollToWizard = () => {
    wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDeviceSelect = (device: DeviceType) => {
    setSelectedDevice(device);
    setStep(2);
  };

  const handleNeedSelect = async (need: TechNeed) => {
    setSelectedNeed(need);
    setStep(3);
    setIsLoading(true);
    try {
      if (selectedDevice) {
        const recommendations = await getAIRecommendations(selectedDevice, need);
        setResults(recommendations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setSelectedDevice(null);
    setSelectedNeed(null);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl text-indigo-600 tracking-tighter">
            <Zap className="fill-indigo-600" size={28} />
            <span>TechAI</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToWizard}
              className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-95"
            >
              Get AI Recommendations
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
            </span>
            Real-time App Discovery Engine
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[1.05]">
            The Right Tech Tools. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Selected by AI.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            No technical skills? No problem. We analyze thousands of apps to find the exact fix for your phone or computer—so you don't have to.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              onClick={scrollToWizard}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 group hover:-translate-y-1"
            >
              Find My Tools Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </button>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm font-bold text-slate-500">Rated 4.9/5 by 12,000+ Students & Pros</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Wizard Section */}
      <section ref={wizardRef} className="py-24 px-6 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Personalized Discovery</h2>
            <p className="text-slate-500 font-medium">Start below to receive your AI-curated tech toolkit.</p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(79,70,229,0.12)] p-8 md:p-14 border border-slate-100 min-h-[550px] flex flex-col justify-center">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-12 text-center">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-4 inline-block">Step 1 of 2</span>
                  <h3 className="text-3xl font-black">Which device needs help?</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => handleDeviceSelect(DeviceType.PHONE)}
                    className="group p-10 border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/20 rounded-[2.5rem] transition-all flex flex-col items-center gap-6 text-center"
                  >
                    <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <Smartphone size={48} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="text-2xl font-black block mb-1 text-slate-800">Mobile Device</span>
                      <span className="text-slate-500 font-medium italic">Android or iPhone</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleDeviceSelect(DeviceType.PC)}
                    className="group p-10 border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/20 rounded-[2.5rem] transition-all flex flex-col items-center gap-6 text-center"
                  >
                    <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <Monitor size={48} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="text-2xl font-black block mb-1 text-slate-800">PC / Laptop</span>
                      <span className="text-slate-500 font-medium italic">Windows or macOS</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="mb-12 text-center">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-4 inline-block">Step 2 of 2</span>
                  <h3 className="text-3xl font-black">What are we solving today?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.values(TechNeed).map((need) => (
                    <button 
                      key={need}
                      onClick={() => handleNeedSelect(need)}
                      className="p-6 border-2 border-slate-100 hover:border-indigo-500 hover:bg-white hover:shadow-xl rounded-2xl transition-all flex items-center gap-5 text-left group"
                    >
                      <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {need === TechNeed.REPAIRS && <HelpCircle size={28} />}
                        {need === TechNeed.SPEED && <Zap size={28} />}
                        {need === TechNeed.LEARNING && <Cpu size={28} />}
                        {need === TechNeed.PRODUCTIVITY && <Search size={28} />}
                        {need === TechNeed.SECURITY && <Lock size={28} />}
                      </div>
                      <span className="font-bold text-lg text-slate-700 group-hover:text-indigo-600 transition-colors">{need}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-10 mx-auto block text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors uppercase tracking-widest">
                  ← Back to Step 1
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in zoom-in-95 duration-700 text-center">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative mb-10">
                      <Loader2 size={100} className="text-indigo-600 animate-spin" strokeWidth={1} />
                      <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 fill-indigo-600" size={40} />
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-2">Analyzing Marketplace...</p>
                    <p className="text-slate-500 font-medium">Matching the best {selectedNeed} solutions for your device.</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-1000">
                    <div className="mb-12">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} strokeWidth={3} />
                      </div>
                      <h3 className="text-4xl font-black mb-2">Toolkit Ready</h3>
                      <p className="text-slate-500 font-medium">Top {results.length} expert-vetted tools found for {selectedDevice}.</p>
                    </div>
                    
                    <div className="space-y-6 mb-12">
                      {results.map((tool, idx) => (
                        <div key={idx} className="p-8 border-2 border-slate-50 bg-slate-50/30 rounded-[2.5rem] text-left flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all group">
                          <div className="flex items-start gap-8">
                            <div className="text-6xl w-24 h-24 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                              {tool.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-2xl font-black text-slate-900">{tool.name}</h4>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                                  {tool.category}
                                </span>
                              </div>
                              <p className="text-slate-600 font-medium leading-relaxed text-lg">{tool.description}</p>
                            </div>
                          </div>
                          <a 
                            href={tool.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="whitespace-nowrap px-10 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                          >
                            Get the App
                            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={resetWizard}
                      className="px-10 py-5 border-2 border-slate-200 text-slate-600 rounded-2xl font-black hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center gap-3 mx-auto"
                    >
                      <RefreshCcw size={20} />
                      Start a New Request
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { 
                title: "Curated Content", 
                desc: "We scan the web daily to filter out fluff and focus on high-impact tools.",
                icon: <Search className="text-indigo-600" /> 
              },
              { 
                title: "Beginner Friendly", 
                desc: "No tech jargon. Just tools that are easy to download, install, and use instantly.",
                icon: <Zap className="text-amber-500 fill-amber-500" /> 
              },
              { 
                title: "Real-time AI", 
                desc: "Powered by Gemini to ensure recommendations match current tech standards.",
                icon: <RefreshCcw className="text-emerald-500" /> 
              },
              { 
                title: "Trusted Links", 
                desc: "Every redirect leads to official websites. Safety is our top priority.",
                icon: <Shield className="text-blue-500" /> 
              }
            ].map((benefit, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 group-hover:scale-110 transition-all">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-black mb-4">{benefit.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="py-24 px-6 bg-slate-900 text-white rounded-[5rem] mx-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Support for Every User.</h2>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">Whether you are a student finishing a project or a professional securing a workstation, TechAI has your back.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { cat: "Troubleshooting", title: "Phone Fixes", text: "Battery drain, screen lag, and storage cleaning without factory resetting." },
              { cat: "Optimization", title: "PC Performance", text: "Startup management and RAM allocation tools for smooth multitasking." },
              { cat: "Learning", title: "Tech Basics", text: "Interactive guides and simple apps to help you master your hardware." },
              { cat: "Security", title: "Privacy Suite", text: "Encrypted browsing and password hygiene tools for the non-technical." },
              { cat: "Productivity", title: "Daily AI Helpers", text: "The latest AI assistants that help you write, plan, and create faster." },
              { cat: "Utilities", title: "Rescue Kits", text: "Last-resort data recovery and system diagnostics made easy." }
            ].map((card, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-6 block">{card.cat}</span>
                  <h4 className="text-3xl font-black mb-4">{card.title}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{card.text}</p>
                </div>
                <div className="h-1 w-0 bg-indigo-600 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-tight">Stop Guessing. <br /> <span className="text-indigo-600">Start Optimizing.</span></h2>
          <p className="text-2xl text-slate-500 font-medium mb-12">Join the thousands using AI to navigate their tech world with confidence.</p>
          <button 
            onClick={scrollToWizard}
            className="px-14 py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl shadow-3xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
          >
            Get My AI Recommendations
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-slate-100 text-slate-400 font-medium bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 font-black text-2xl text-slate-900">
              <Zap className="fill-indigo-600 text-indigo-600" size={24} />
              <span>TechAI</span>
            </div>
            <p className="text-sm max-w-xs text-center md:text-left">The leading AI-driven marketplace for digital tools and system optimization.</p>
          </div>
          <div className="flex gap-12 text-sm font-bold">
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Support</a>
          </div>
          <div className="text-sm text-center md:text-right">
            <p className="text-slate-900 font-black mb-1 italic">Vetted by Gemini Pro</p>
            <p>© 2024 TechAI Global. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
