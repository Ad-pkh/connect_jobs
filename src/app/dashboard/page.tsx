"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Building, FileText, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAppliedJobs, getResume, getuser, uploadResume } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getuser();
        const jobs = await getAppliedJobs();
        setUser(userData);
        setAppliedJobs(jobs);

        const resume = await getResume(userData.id);
        console.log(resume);
        if (resume.success) {
          setResumeUrl(resume.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("docs", file);

    setUploading(true);
    try {
      const res = await uploadResume(formData);

      toast.success(res.message || "Resume uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Career Connect</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/jobs"
              className="text-sm font-medium hover:text-primary"
            >
              Find Jobs
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-primary"
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your job search
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applied Jobs
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>

          {resumeUrl ? (
            <div className="mt-4">
              <Label>Uploaded Resume:</Label>
              <div className="flex items-center space-x-4 mt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="docs">Upload Resume</Label>
                <Input
                  id="docs"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                No resume uploaded yet.
              </p>
            </>
          )}

          <Card className="md:col-span-2 lg:col-span-4 ">
            <Tabs defaultValue="applications">
              <TabsContent value="applications" className="space-y-6 ">
                <Card>
                  <CardHeader>
                    <CardTitle>All Applications</CardTitle>
                    <CardDescription>
                      Track the status of all your job applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 ">
                      {appliedJobs.length === 0 ? (
                        <p>No applications found.</p>
                      ) : (
                        appliedJobs.map((job) => (
                          <div
                            key={job.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Building className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-xl">{job.career.title}</h4>
                                <p className="text-medium text-black">
                                  {job.career.location}
                                </p>
                                <p className="text-medium text-black">
                                  role: {job.career.role}
                                </p>
                                <p className="text-medium text-black">
                                  Salary: {job.career.salary}
                                </p>
                                <p className="text-medium text-black">
                                  worktype: {job.career.worktype}
                                </p>
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                    job.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : job.status === "accepted"
                                      ? "bg-green-100 text-green-800"
                                      : job.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {job.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
