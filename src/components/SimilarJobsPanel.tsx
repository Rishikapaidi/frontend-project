import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  price: number;
}

interface Props {
  currentJobId: number;
  category: string;
}

const SimilarJobsPanel: React.FC<Props> = ({ currentJobId, category }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios
      .get(`/api/services/?category=${encodeURIComponent(category)}`)
      .then((res) => {
        const filtered = res.data.filter((job: Job) => job.id !== currentJobId);
        setJobs(filtered.slice(0, 5));
      })
      .catch((err) => console.error("Failed to load similar jobs", err));
  }, [currentJobId, category]);

  if (!jobs.length) return null;

  return (
    <div className="bg-gray-50 p-4 rounded shadow mt-8">
      <h3 className="text-lg font-semibold mb-2">Similar Services</h3>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="text-blue-600 hover:underline">
            <Link to={`/services/${job.id}`}>
              {job.title} — ${job.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarJobsPanel;
