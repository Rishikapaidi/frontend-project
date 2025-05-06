import React, { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  id: string;
  title: string;
  status: "pending" | "accepted" | "cancelled";
  price?: number;
  provider?: {
    name: string;
    email: string;
    phone: string;
  };
}

const TransactionsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "accepted" | "cancelled">(
    "pending"
  );

  useEffect(() => {
    axios
      .get("/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error loading jobs", err))
      .finally(() => setLoading(false));
  }, []);

  const cancelJob = (id: string) => {
    axios.post(`/api/jobs/${id}/cancel`).then(() => {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, status: "cancelled" } : job
        )
      );
    });
  };

  const filteredJobs = jobs.filter((job) => job.status === tab);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Jobs</h2>
      <div className="flex space-x-4 mb-6">
        {["pending", "accepted", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setTab(status as any)}
            className={`px-4 py-2 rounded-md ${
              tab === status ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map((job) => (
            <li key={job.id} className="p-4 border bg-white rounded">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              {job.status === "accepted" && job.provider && (
                <div className="text-sm">
                  <p>
                    <strong>Price:</strong> ${job.price}
                  </p>
                  <p>
                    <strong>Provider:</strong> {job.provider.name}
                  </p>
                  <p>
                    {job.provider.email} | {job.provider.phone}
                  </p>
                </div>
              )}
              {job.status === "pending" && (
                <button
                  onClick={() => cancelJob(job.id)}
                  className="text-red-500 mt-2"
                >
                  Cancel Job
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionsPage;
