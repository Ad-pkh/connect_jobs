"use client";
import { useEffect, useState } from "react";
import { applyToJob, getJobbyId } from "@/lib/api";
import { Job } from "@/types/job";
import { useParams } from "next/navigation";

export default function JobDetailPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getJobbyId(id)
      .then((data) => {
        if (data) {
          setJob(data);
        } else {
          setJob(null);
        }
      })
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("You must be logged in.");
      setApplying(false);
      return;
    }
    const res = await applyToJob(id);
    setMsg(res.message || "Application submitted!");
    setApplying(false);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-500 mb-1">
        {job.role} | {job.worktype}
      </p>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-indigo-600 mb-4 font-medium">Rs. {job.salary}</p>
      <p className="mb-8">{job.description}</p>

      <button
        onClick={handleApply}
        disabled={applying}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
      >
        {applying ? "Applying..." : "Apply Now"}
      </button>

      {msg && <p className="mt-4 text-sm text-green-600">{msg}</p>}
    </div>
  );
}
