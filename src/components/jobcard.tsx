import { applyToJob } from "@/lib/api";
import { Button } from "./ui/button";
import { useState } from "react";
import { Job } from "@/types/job";
import { toast } from "sonner";

export default function JobCard({ job }: { job: Job }) {
  const [isApplying, setIsApplying] = useState(false);
  const [resume, setResume] = useState<File | null>(null);

  const handleApply = async (id: string) => {
    setIsApplying(true);
    try {
      const response = await applyToJob(id);

      toast.success("Application submitted successfully!");
    } catch (err) {
      console.error("Apply error:", err);
      toast.error("Failed to apply.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{job.description}</p>
      <div className="mt-2 text-sm text-gray-700">
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>Role:</strong> {job.role}
        </p>
        <p>
          <strong>Work Type:</strong> {job.worktype}
        </p>
        <p>
          <strong>Posted:</strong>{" "}
          {new Date(job.created_at).toLocaleDateString()}
        </p>
      </div>

      <Button
        onClick={() => handleApply(job.id)}
        disabled={isApplying}
        className={`mt-4 px-4 py-2 rounded text-white text-sm ${
          isApplying
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-500"
        }`}
      >
        {isApplying ? "Applying..." : "Apply"}
      </Button>
    </div>
  );
}
