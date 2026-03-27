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
    <div className="py-12 md:py-24 w-full max-w-7xl mx-auto px-6 md:px-10 bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        
        {/* Info Side */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12 md:space-y-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-8 md:mb-12">
              <span className="text-black font-mono text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase">Uplink_Establishment</span>
              <div className="h-[1px] w-12 md:w-24 bg-black/20" />
            </div>
            
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold text-fg mb-8 md:mb-12 tracking-tighter leading-[0.9] md:leading-[0.8] uppercase">
              LET'S <br/> <span className="text-black italic font-light">CONNECT</span>.
            </h2>
            <p className="text-base md:text-lg text-black/60 leading-relaxed max-w-md font-mono italic">
              {'>'} "Fusing data architecture with human-centric design to build the future."
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            <div className="group">
              <span className="block text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-black/40 mb-3 md:mb-4">DIRECT_TRANSMISSION</span>
              <a href="mailto:mounaouattara04@gmail.com" className="text-xl md:text-3xl font-mono font-bold text-fg hover:text-black transition-all uppercase break-all">
                mounaouattara04@gmail.com
              </a>
            </div>

            <div className="group">
              <span className="block text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-black/40 mb-3 md:mb-4">BASE_COORDINATES</span>
              <span className="text-xl md:text-3xl font-mono font-bold text-fg uppercase">Paris, France // Remote</span>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 pt-8 border-t border-black/10">
            {[
              { icon: <Linkedin className="w-5 h-5 md:w-6 md:h-6" />, href: "#", label: "LinkedIn" },
              { icon: <Github className="w-5 h-5 md:w-6 md:h-6" />, href: "#", label: "GitHub" },
              { icon: <Twitter className="w-5 h-5 md:w-6 md:h-6" />, href: "#", label: "Twitter" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.href}
                whileHover={{ y: -5 }}
                className="text-black/30 hover:text-black transition-colors duration-500"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-4">
                <label className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-black/40">SUBJECT_NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="IDENTIFY YOURSELF"
                  className="w-full bg-transparent border-b border-black/10 py-4 text-fg focus:outline-none focus:border-black transition-all font-mono uppercase text-lg md:text-xl font-bold placeholder:opacity-10"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-black/40">UPLINK_ADDRESS</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full bg-transparent border-b border-black/10 py-4 text-fg focus:outline-none focus:border-black transition-all font-mono uppercase text-lg md:text-xl font-bold placeholder:opacity-10"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-black/40">DATA_PAYLOAD</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="TRANSMIT YOUR MESSAGE..."
                  rows={4}
                  className="w-full bg-transparent border-b border-black/10 py-4 text-fg focus:outline-none focus:border-black transition-all resize-none font-mono uppercase text-lg md:text-xl font-bold placeholder:opacity-10"
                ></textarea>
              </div>
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className="group relative w-full py-6 md:py-8 bg-black text-white hover:bg-black/90 transition-all duration-500 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] disabled:opacity-50 flex items-center justify-center gap-4 overflow-hidden"
            >
              <span className="relative z-10">
                {status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? 'UPLINK_SUCCESS' : 'INITIATE_UPLINK'}
              </span>
              <Send className={`w-3.5 h-3.5 md:w-4 md:h-4 relative z-10 ${status === 'sending' ? 'animate-pulse' : ''}`} />
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            </button>

            <p className="text-[9px] md:text-[10px] font-mono font-bold text-center text-black/20 uppercase tracking-[0.3em] md:tracking-[0.5em]">
              EXPECT_RESPONSE_WITHIN_48_HOURS
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
