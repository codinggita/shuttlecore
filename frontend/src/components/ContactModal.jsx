import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration with your service ID
      const serviceID = 'service_5kpwy4w';
      const templateID = 'template_g6i1rfu'; // Your EmailJS template ID
      const publicKey = '8xS7Is-LTWqtE-yWy'; // Your EmailJS public key
      
      const templateParams = {
        type: 'Contact Form',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'dharmi.patel.cg@gmail.com'
      };
      
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setIsSubmitting(false);
      setIsSent(true);
      
      // Reset after 2 seconds and close
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Email send failed:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again.');
    }
  };

  const contactDetails = [
    {
      icon: 'mail',
      label: 'Email',
      value: 'dharmi.patel.cg@gmail.com'
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+91 9104187840'
    },
    {
      icon: 'location_on',
      label: 'Location',
      value: 'Ahmedabad, Gujarat India'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--surface-muted)] transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Contact Details */}
              <div className="p-8 lg:p-12 bg-[var(--surface-light)]/30">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                  <h3 className="text-xl font-bold text-[var(--text-main)]">Contact Details</h3>
                </div>

                <div className="space-y-6">
                  {contactDetails.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[var(--primary)]">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                          {item.label}
                        </p>
                        <p className="text-sm text-[var(--text-main)] font-medium">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>

              {/* Right Side - Contact Form */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                  <h3 className="text-xl font-bold text-[var(--text-main)]">Send Me a Message</h3>
                </div>

                {isSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-64"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-3xl text-emerald-500">check</span>
                    </div>
                    <p className="text-lg font-bold text-[var(--text-main)]">Message Sent!</p>
                    <p className="text-sm text-[var(--text-muted)]">We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full h-12 px-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full h-12 px-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Hey, I'd love to collaborate on..."
                        className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)]/50 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span className="material-symbols-outlined text-sm">send</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
