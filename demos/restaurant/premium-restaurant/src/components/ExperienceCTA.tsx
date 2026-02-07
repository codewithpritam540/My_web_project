import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ExperienceCTAProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FloatingBookButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5, type: 'spring' }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Pulsing Ring */}
        <span className="absolute inset-0 rounded-full bg-lime-400 animate-ping opacity-30" />
        
        {/* Main Button */}
        <div className="relative w-20 h-20 rounded-full bg-green-700 shadow-2xl shadow-green-700/30 flex flex-col items-center justify-center text-white hover:bg-green-800 transition-colors">
          <Calendar className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] font-semibold">Book</span>
        </div>
      </div>
    </motion.button>
  );
};

export const ExperienceCTA = ({ isOpen, onClose }: ExperienceCTAProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        date: '',
        time: '',
        guests: '2',
        name: '',
        email: '',
        phone: '',
        specialRequests: '',
      });
      onClose();
    }, 3000);
  };

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30'
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-700 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-display">Reserve Your Table</h3>
                  <p className="text-white/80 text-sm mt-1">Experience the art of clean dining</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-4 mt-6">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                      step >= s ? 'bg-white text-green-700' : 'bg-white/20 text-white/60'
                    )}>
                      {s}
                    </div>
                    <span className={cn(
                      'text-sm transition-colors',
                      step >= s ? 'text-white' : 'text-white/60'
                    )}>
                      {s === 1 ? 'Details' : 'Confirm'}
                    </span>
                    {s === 1 && <ChevronRight className="w-4 h-4 text-white/40" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-700" />
                  </div>
                  <h4 className="text-2xl font-display text-gray-900 mb-2">Reservation Confirmed!</h4>
                  <p className="text-gray-600">We look forward to welcoming you.</p>
                </motion.div>
              ) : step === 1 ? (
                <form className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <Calendar className="w-4 h-4 text-green-600" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <Clock className="w-4 h-4 text-green-600" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => updateField('time', time)}
                          className={cn(
                            'px-2 py-2 rounded-lg text-sm font-medium transition-all',
                            formData.time === time
                              ? 'bg-green-700 text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guests Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <Users className="w-4 h-4 text-green-600" />
                      Number of Guests
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => updateField('guests', num.toString())}
                          className={cn(
                            'flex-1 py-3 rounded-xl text-sm font-medium transition-all',
                            formData.guests === num.toString()
                              ? 'bg-green-700 text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          )}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.date || !formData.time}
                    className="w-full py-4 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="john@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+1 555-0123"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => updateField('specialRequests', e.target.value)}
                      placeholder="Allergies, dietary restrictions, special occasions..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <h4 className="font-medium text-gray-900">Reservation Summary</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Date: <span className="font-medium text-gray-900">{formData.date}</span></p>
                      <p>Time: <span className="font-medium text-gray-900">{formData.time}</span></p>
                      <p>Guests: <span className="font-medium text-gray-900">{formData.guests}</span></p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      className="flex-1 py-4 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirm Booking
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};