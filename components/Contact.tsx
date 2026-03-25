import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <div className="py-32 w-full max-w-7xl mx-auto px-10 bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Info Side */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-16"
        >
          <div>
            <div className="flex items-center gap-6 mb-12">
              <span className="text-black font-mono text-[10px] font-bold tracking-[0.6em] uppercase">Uplink_Establishment</span>
              <div className="h-[1px] w-24 bg-black/20" />
            </div>
            
            <h2 className="text-6xl md:text-9xl font-bold text-fg mb-12 tracking-tighter leading-[0.8] uppercase">
              LET'S COLLABORATE.
            </h2>
            <p className="text-xl text-black/60 leading-relaxed max-w-md font-mono italic">
              {'>'} "Fusing data architecture with human-centric design to build the future."
            </p>
          </div>

          <div className="space-y-8">
            <div className="p-10 bg-black/5 border border-black/10 flex items-center gap-10 group hover:border-black/40 transition-all duration-1000 relative">
              <div className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 flex items-center justify-center text-black/30 group-hover:text-black transition-colors duration-700">
                <Mail size={24} />
              </div>
              <div>
                <span className="block text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-black/40 mb-3">DIRECT_TRANSMISSION</span>
                <a href="mailto:mounaouattara04@gmail.com" className="text-2xl font-mono font-bold text-fg/60 hover:text-black transition-all italic uppercase">
                  mounaouattara04@gmail.com
                </a>
              </div>
            </div>

            <div className="p-10 bg-black/5 border border-black/10 flex items-center gap-10 group hover:border-black/40 transition-all duration-1000 relative">
              <div className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 flex items-center justify-center text-black/30 group-hover:text-black transition-colors duration-700">
                <MapPin size={24} />
              </div>
              <div>
                <span className="block text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-black/40 mb-3">BASE_COORDINATES</span>
                <span className="text-2xl font-mono font-bold text-fg/60 italic uppercase">Paris, France // Remote</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {[
              { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
              { icon: <Github size={20} />, href: "#", label: "GitHub" },
              { icon: <Twitter size={20} />, href: "#", label: "Twitter" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href}
                className="w-16 h-16 flex items-center justify-center bg-black/5 border border-black/10 text-black/20 hover:text-black hover:border-black/40 transition-all duration-700 rounded-none relative group"
                aria-label={social.label}
              >
                <div className="hud-corner hud-corner-tl !w-2 !h-2 opacity-0 group-hover:opacity-100" />
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black/5 border border-black/10 p-16 md:p-24 relative group"
        >
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-br" />
          
          <form onSubmit={handleSubmit} className="space-y-20">
            <div className="grid grid-cols-1 gap-20">
              <div className="space-y-6">
                <label className="text-[11px] font-mono font-bold uppercase tracking-[0.5em] text-black/40 ml-1">SUBJECT_NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="IDENTIFY YOURSELF"
                  className="w-full bg-transparent border-b border-black/10 py-8 text-fg/60 placeholder:text-black/10 focus:outline-none focus:border-black transition-all font-mono uppercase text-2xl font-bold"
                />
              </div>
              <div className="space-y-6">
                <label className="text-[11px] font-mono font-bold uppercase tracking-[0.5em] text-black/40 ml-1">UPLINK_ADDRESS</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full bg-transparent border-b border-black/10 py-8 text-fg/60 placeholder:text-black/10 focus:outline-none focus:border-black transition-all font-mono uppercase text-2xl font-bold"
                />
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[11px] font-mono font-bold uppercase tracking-[0.5em] text-black/40 ml-1">DATA_PAYLOAD</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="TRANSMIT YOUR MESSAGE..."
                rows={4}
                className="w-full bg-transparent border-b border-black/10 py-8 text-fg/60 placeholder:text-black/10 focus:outline-none focus:border-black transition-all resize-none font-mono uppercase text-2xl font-bold"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-10 bg-black text-white hover:bg-black/80 transition-all duration-700 font-mono text-[11px] uppercase tracking-[0.8em] disabled:opacity-50 flex items-center justify-center gap-6 group relative overflow-hidden"
            >
              <span className="relative z-10 group-hover:translate-x-2 transition-transform font-bold">
                {status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? 'UPLINK_SUCCESS' : 'INITIATE_UPLINK'}
              </span>
              <Send size={16} className={`relative z-10 ${status === 'sending' ? 'animate-pulse' : ''} group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform`} />
              
              {/* Button Glitch Effect on Hover */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
            </button>

            <p className="text-[10px] font-mono font-bold text-center text-black/10 uppercase tracking-[0.5em]">
              EXPECT_RESPONSE_WITHIN_48_HOURS
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
