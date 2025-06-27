"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteJob, getCompany, getmyjob } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Building,
  Bell,
  Settings,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function RecruiterDashboard() {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.id as string;

  const [company, setCompany] = useState<any>(null);
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  const postjob = () => {
    router.push("/career/create");
  };
  const handleDelete = async (id: string) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    // if (!confirmDelete) return;

    try {
      setDeletingJobId(id);
      await deleteJob(id);

      // Refresh job list
      const updatedJobs = await getmyjob();
      setCareers(updatedJobs);
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const [companyData, jobData] = await Promise.all([
          getCompany(companyId),
          getmyjob(),
        ]);
        setCompany(companyData);
        // console.log("hello",jobData)
        setCareers(jobData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading company data...</p>
      </div>
    );
  }
  console.log(company);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">Company not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Career Connect</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {/* <Link href="" className="text-sm font-medium text-primary">Dashboard</Link>
              <Link href="" className="text-sm font-medium hover:text-primary">Manage Jobs</Link> */}
            {/* <Link href="/recruiter/candidates" className="text-sm font-medium hover:text-primary">Candidates</Link> */}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-sm font-medium hover:text-primary"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {company.name}!
            </h1>
            <p className="text-muted-foreground">
              Manage your job postings and find the best candidates
            </p>
          </div>
          <Button onClick={postjob}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 p-2 rounded">
              Your Job Postings
            </h2>

            {careers.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3 border-b">Title</th>
                      <th className="text-left p-3 border-b">Description</th>
                      <th className="text-left p-3 border-b">Location</th>
                      <th className="text-left p-3 border-b">Salary</th>
                      <th className="text-left p-3 border-b">Work Type</th>
                      <th className="text-left p-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careers.map((career) => (
                      <tr key={career.id} className="hover:bg-gray-300">
                        <td className="p-3 border-b">{career.title}</td>
                        <td className="p-3 border-b">{career.description}</td>
                        <td className="p-3 border-b">{career.location}</td>
                        <td className="p-3 border-b">{career.salary}</td>
                        <td className="p-3 border-b">{career.worktype}</td>
                        <td className="p-3 border-b">
                          <div className="flex space-x-2">
                            <Link
                              href={`/career/${career.id}/candidates`}
                              className="px-3 py-1 rounded bg-orange-500 text-white text-sm hover:bg-orange-400"
                            >
                              Candidates
                            </Link>
                            <Link
                              href={`/career/update/${career.id}`}
                              className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-400"
                            >
                              Edit
                            </Link>

                            <Button
                              disabled={deletingJobId === career.id}
                              className={`px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-400 
                              ${
                                deletingJobId === career.id
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              onClick={() => handleDelete(career.id)}
                            >
                              {deletingJobId === career.id
                                ? "Deleting..."
                                : "Delete"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
