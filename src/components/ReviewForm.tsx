import React, { useState } from "react";
import axios from "axios";

interface ReviewFormProps {
  jobId: number;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ jobId, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await axios.post(`/api/jobs/${jobId}/reviews/`, { rating, comment });
      setComment("");
      setRating(5);
      onSubmit();
    } catch (err) {
      console.error("Review submission failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="text-md font-semibold mb-2">Leave a Review</h4>
      <select
        className="w-full border px-2 py-1 mb-2"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} ★
          </option>
        ))}
      </select>
      <textarea
        className="w-full border px-3 py-2 rounded mb-2"
        rows={3}
        value={comment}
        placeholder="Write your feedback..."
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewForm;
