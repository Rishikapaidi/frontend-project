import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";

interface Review {
  id: number;
  author_name: string;
  comment: string;
  rating: number;
}

interface Props {
  jobId: number;
}

const ReviewSection: React.FC<Props> = ({ jobId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState<number | null>(null);

  const loadReviews = async () => {
    try {
      const res = await axios.get(`/api/jobs/${jobId}/reviews/`);
      setReviews(res.data);
      if (res.data.length) {
        const avg =
          res.data.reduce((a: any, r: { rating: any }) => a + r.rating, 0) /
          res.data.length;
        setAverage(avg);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [jobId]);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-3">Reviews</h3>
      {average && (
        <p className="text-sm text-gray-700 mb-2">
          ⭐ Average Rating: {average.toFixed(1)} / 5
        </p>
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="border-b pb-2">
              <p className="text-sm font-semibold">
                {r.author_name} – {r.rating}★
              </p>
              <p className="text-sm text-gray-700">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <ReviewForm jobId={jobId} onSubmit={loadReviews} />
    </div>
  );
};

export default ReviewSection;
