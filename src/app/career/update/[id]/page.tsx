"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getJobbyId, updateJob } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdateJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    worktype: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      const job = await getJobbyId(id as string);
      setForm({
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        worktype: job.worktype,
        status: job.status,
      });
      setLoading(false);
    }
    fetchJob();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updateJob(id as string, form);
    router.back();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 ">
      <h1 className="text-2xl font-bold">Edit Job</h1>
      <Input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <Input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <Input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <Input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
      />
      <Input
        name="worktype"
        value={form.worktype}
        onChange={handleChange}
        placeholder="Work Type"
      />
      <Input
        name="status"
        value={form.status}
        onChange={handleChange}
        placeholder="status"
      />
      <Button onClick={handleSubmit}>Update Job</Button>
    </div>
  );
}
