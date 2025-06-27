"use client";
import { useEffect, useState } from "react";
import { filterJobs, getallJobs } from "@/lib/api";
import { Job } from "@/types/job";
import JobCard from "@/components/jobcard";
import Link from "next/link";
import { toast } from "sonner";
import JobFilter from "@/components/filter";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getallJobs()
      .then(setJobs)
      .catch((err) => {
        console.error("Error loading jobs:", err);
        toast.error("Failed to load jobs.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = async (query: any) => {
    try {
      const filteredJobs = await filterJobs(query);
      setJobs(filteredJobs);
      toast.success("Filter applied successfully!");
    } catch (error: any) {
      console.error("Error fetching filtered jobs:", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Jobs</h1>
      <Link href="/dashboard" className="bg-cyan-300 p-2">
        Dashboard
      </Link>

      <div className="max-w-4xl mx-auto p-4">
        <JobFilter onFilter={handleFilter} />

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            jobs.map((job: any) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
