import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export function Panel8() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // 1. Send Email via FormSubmit AJAX API
      const emailResponse = await fetch('https://formsubmit.co/ajax/cerezvincetn24@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: 'New Contact Form Message from CV Creation Portfolio',
        })
      });

      if (!emailResponse.ok) {
         throw new Error("Failed to send email. You may need to activate FormSubmit for this email address by clicking the link they emailed you on your first test.");
      }

      // 2. Save to Firebase Firestore
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp()
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'An error occurred while sending the message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-[100vw] h-full flex flex-col items-center justify-center relative shrink-0">
      <div className="w-full max-w-7xl px-8 lg:px-24 flex flex-col md:flex-row gap-16 items-center z-10">
        
        {/* Left Side: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-6"
        >
          <span className="text-[var(--color-neon-green)] font-mono text-sm tracking-widest uppercase block">Ready to start?</span>
          <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-none">
            Let's Build<br/>
            <span className="italic text-gray-400 font-light">Something Great</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md">
            Whether you need a cutting-edge web application, an AI receptionist, or full-scale automation, reach out directly. Let's discuss your next massive leap.
          </p>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full max-w-lg bg-zinc-900/80 backdrop-blur border border-zinc-800 p-8 rounded-3xl shadow-2xl relative"
        >
          
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-in fade-in zoom-in duration-500">
               <div className="w-16 h-16 bg-[#39FF14]/20 rounded-full flex items-center justify-center mb-2">
                 <CheckCircle2 className="w-8 h-8 text-[#39FF14]" />
               </div>
               <h3 className="text-white text-2xl font-bold">Message Sent!</h3>
               <p className="text-gray-400">Your message has been delivered to Cerezvincetn24@gmail.com and saved to our database. I'll get back to you shortly.</p>
               <button 
                 onClick={() => setStatus('idle')}
                 className="mt-6 text-[#39FF14] hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
               >
                 Send another
               </button>
            </div>
          ) : (
             <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-2">
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-400 font-bold">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]/50 transition-colors pointer-events-auto"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-400 font-bold">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  maxLength={150}
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]/50 transition-colors pointer-events-auto"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-400 font-bold">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  maxLength={2000}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]/50 transition-colors resize-none pointer-events-auto custom-scrollbar"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-white text-black hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all font-bold tracking-widest uppercase text-sm py-4 rounded-lg flex items-center justify-center gap-2 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                ) : (
                  <>Send Message <Send className="w-4 h-4 ml-1" /></>
                )}
              </button>

              <span className="text-center text-zinc-600 text-[10px] uppercase font-mono mt-2">
                Secured by Firebase
              </span>
            </form>
          )}

        </motion.div>
      </div>
    </div>
  );
}
