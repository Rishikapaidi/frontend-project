import React, { useState } from "react";
import { apiService } from "../services/api";
import { useTheme } from "../context/ThemeContext";

interface BookingModalProps {
  serviceId: string;
  serviceName: string;
  serviceCost: number;
  serviceImage?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  serviceId,
  serviceName,
  serviceCost,
  serviceImage,
  onClose,
  onSuccess,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{date?: string; time?: string}>({});
  const { darkMode } = useTheme();

  const validate = () => {
    const newErrors: {date?: string; time?: string} = {};
    let isValid = true;
    
    if (!date) {
      newErrors.date = "Please select a date";
      isValid = false;
    }
    
    if (!time) {
      newErrors.time = "Please select a time";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await apiService.createBooking({
        id: Date.now().toString(),
        serviceId,
        serviceName,
        date,
        time,
        comments,
        cost: serviceCost,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md overflow-hidden`}>
        <div className="bg-blue-600 text-white px-6 py-3">
          <h2 className="text-lg font-semibold">Book Service</h2>
          <p className="text-blue-100 text-sm">You're booking: {serviceName}</p>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-4 w-14 h-14 overflow-hidden rounded-md flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                {serviceImage ? (
                  <img 
                    src={serviceImage}
                    alt={serviceName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/100x100?text=Service";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{serviceName}</h3>
                <p className="text-green-600 font-bold">${serviceCost}.00</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Service Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className={`w-full p-2.5 pl-3.5 border rounded-md ${errors.date ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Service Time
              </label>
              <div className="relative">
                <select
                  className={`w-full p-2.5 pl-3.5 border rounded-md appearance-none pr-10 ${errors.time ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Select a time slot</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Additional Notes (Optional)
              </label>
              <textarea
                className={`w-full p-2.5 border rounded-md h-20 resize-none ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                placeholder="Any specific requirements or instructions..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={onClose} 
                className={`px-4 py-2 border rounded-md ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Book Now'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
