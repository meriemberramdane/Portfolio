import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Github, 
  Linkedin, 
  Instagram, 
  Dribbble, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate Email regex helper
  const isValidEmail = (email: string) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
  };

  // Perform validation checks
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formValues.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(formValues.email)) {
      newErrors.email = 'Please enter a valid email format.';
    }
    if (!formValues.subject.trim()) {
      newErrors.subject = 'Subject category is required.';
    }
    if (!formValues.message.trim() || formValues.message.trim().length < 8) {
      newErrors.message = 'Message must consist of at least 8 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (key: keyof FormValues, val: string) => {
    setFormValues(prev => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined })); // Clear error instantly
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const web3FormsKey = (import.meta as any).env.VITE_WEB3FORMS_KEY;

    if (web3FormsKey && web3FormsKey.trim() !== '') {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: web3FormsKey.trim(),
            name: formValues.name,
            email: formValues.email,
            subject: formValues.subject,
            message: formValues.message,
            from_name: "Meriem Berramdane Portfolio"
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormValues({ name: '', email: '', subject: '', message: '' });
          
          setTimeout(() => {
            setIsSubmitted(false);
          }, 6000);
          return;
        } else {
          console.error("Web3Forms Submission Error:", result);
        }
      } catch (err) {
        console.error("Network error during Web3Forms Submission:", err);
      }
    }

    // Fallback: Mailto client dispatch
    const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${formValues.subject}`);
    const mailtoBody = encodeURIComponent(`Name: ${formValues.name}\nEmail: ${formValues.email}\n\nMessage:\n${formValues.message}`);
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Dispatch letter via standard system handler
    window.location.href = mailtoUrl;

    setFormValues({ name: '', email: '', subject: '', message: '' });
    
    // Reset success slide layout after a few seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section 
      id="contact"
      className="relative min-h-screen py-24 px-6 lg:px-16 bg-[#050505]"
    >
      {/* Decorative Blur graphics */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[125px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* Headings */}
        <div className="flex flex-col mb-16">
          <p className="font-mono text-xs tracking-[0.25em] text-violet-400 font-semibold uppercase mb-2">
            06 • INTERCONNECTIVE
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Contact Me
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-violet-500 to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Info logs & social channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            
            <div className="space-y-6">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
                Let’s create something breathtaking together.
              </h3>
              <p className="text-zinc-400 font-sans text-sm font-light leading-relaxed">
                Whether you want to build a high-performance wellness application, an intelligent content curation dashboard, an enterprise resources pipeline, or simply talk visual design dynamics—drop me a line.
              </p>
            </div>

            {/* Direct Coordinates card */}
            <div className="glass-panel rounded-3xl border border-white/5 p-6 space-y-6 relative">
              <div className="absolute inset-0 bg-noise opacity-[0.03] rounded-3xl pointer-events-none" />

              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                    EMAIL CHANNEL
                  </p>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="font-sans text-sm font-semibold text-white hover:text-violet-400 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-[#A855F7] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                    DIRECT VOICE
                  </p>
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="font-sans text-sm font-semibold text-white hover:text-violet-500 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                    COORDINATION RESIDENCY
                  </p>
                  <span className="font-sans text-sm font-semibold text-white">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

            </div>

            {/* Social handles block */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                NETWORK CONNECTIONS
              </h4>
              
              <div className="flex space-x-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-[#111111] border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                  title="GitHub Profile"
                >
                  <Github className="h-4.5 w-4.5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-[#111111] border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                  title="LinkedIn Link"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-[#111111] border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                  title="Instagram Profile"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: Modern glass validator form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl border border-white/5 p-8 lg:p-10 relative flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.03] rounded-3xl pointer-events-none" />

            {/* Glowing spot inside form background */}
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />

            {/* Premium transition layout for successfully submitted message */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="flex items-center space-x-2.5 mb-2">
                    <MessageSquare className="h-4.5 w-4.5 text-violet-400" />
                    <span className="font-display font-bold text-sm tracking-widest text-[#A1A1AA] uppercase">
                      MESSAGE ENVELOPE
                    </span>
                  </div>

                  {/* Name field with floating label pattern */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase font-semibold block">
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. Navel Meriem"
                      value={formValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full bg-zinc-950/80 border ${
                        errors.name ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/5 focus:border-violet-500/40'
                      } px-5 py-3.5 rounded-2xl text-sm text-white placeholder-zinc-600 font-sans tracking-wide focus:outline-none transition-all duration-300`}
                    />
                    {errors.name && (
                      <div className="flex items-center space-x-1 text-red-400 font-sans text-xs pt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email input */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase font-semibold block">
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="e.g. brand@partner.com"
                      value={formValues.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-zinc-950/80 border ${
                        errors.email ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/5 focus:border-violet-500/40'
                      } px-5 py-3.5 rounded-2xl text-sm text-white placeholder-zinc-600 font-sans tracking-wide focus:outline-none transition-all duration-300`}
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-1 text-red-400 font-sans text-xs pt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-subject" className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase font-semibold block">
                      Message Subject
                    </label>
                    <input
                      id="form-subject"
                      type="text"
                      placeholder="e.g. Design & Full-stack Architecture request"
                      value={formValues.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full bg-zinc-950/80 border ${
                        errors.subject ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/5 focus:border-violet-500/40'
                      } px-5 py-3.5 rounded-2xl text-sm text-white placeholder-zinc-600 font-sans tracking-wide focus:outline-none transition-all duration-300`}
                    />
                    {errors.subject && (
                      <div className="flex items-center space-x-1 text-red-400 font-sans text-xs pt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.subject}</span>
                      </div>
                    )}
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-message" className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase font-semibold block">
                      Your Message
                    </label>
                    <textarea
                      id="form-message"
                      rows={5}
                      placeholder="Detail here your projects ideas, timeline, and goals..."
                      value={formValues.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full bg-zinc-950/80 border ${
                        errors.message ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/5 focus:border-violet-500/40'
                      } px-5 py-4 rounded-2xl text-sm text-white placeholder-zinc-600 font-sans tracking-wide focus:outline-none transition-all duration-300 resize-none`}
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 text-red-400 font-sans text-xs pt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-display text-xs tracking-wider uppercase font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-[0_4px_25px_rgba(139,92,246,0.3)] select-none mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Dispatching Letter...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-6 select-none"
                >
                  <div className="h-16 w-16 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <CheckCircle className="h-8 w-8 text-violet-400 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-black text-white tracking-tight">
                      Message Sent Safe & Sound!
                    </h3>
                    <p className="font-mono text-zinc-500 text-[10px] tracking-widest uppercase">
                      Acknowledge 200 OK • Transmission Complete
                    </p>
                  </div>

                  <p className="text-zinc-400 font-sans text-sm font-light max-w-sm leading-relaxed">
                    Thank you so much! Meriem will review your subject detail and reach back to you at your email coordinates within 24 hours.
                  </p>

                  <div className="h-[1px] w-24 bg-white/10 pt-4" />

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-full border border-white/5 hover:border-violet-500/30 bg-zinc-950 text-zinc-400 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer"
                  >
                    Send another envelope
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
