import React, { useState } from "react";
import axios from "axios";

interface BookingFormProps {
  jobId: number;
  providerId: number;
  availableSlots: string[];
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({
  jobId,
  providerId,
  availableSlots,
  price,
}) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    if (!selectedSlot) {
      setError("Please select a time slot");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await axios.post("/api/bookings/", {
        job_id: jobId,
        provider_id: providerId,
        time_slot: selectedSlot,
      });
      setSuccess(true);
    } catch (err) {
      setError("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border rounded p-4 bg-white shadow-sm space-y-4">
      <h3 className="text-lg font-bold">Book This Service</h3>
      <p className="text-gray-700">Price: ${price}</p>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Available Time Slots
      </label>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">-- Select a Time --</option>
        {availableSlots.map((slot, i) => (
          <option key={i} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success ? (
        <p className="text-green-600 font-semibold">Booking confirmed!</p>
      ) : (
        <button
          disabled={submitting}
          onClick={handleBooking}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      )}
    </div>
  );
};

export default BookingForm;
