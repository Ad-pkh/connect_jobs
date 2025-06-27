"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllRecruiters, updateRecruiterStatus } from "@/lib/api"; // you need to create this API
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building, Bell, Settings } from "lucide-react";
import Link from "next/link";
import StatusDropdown from "@/components/dopdownbtn";

export default function AdminDashboard() {
  const router = useRouter();

  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const data = await getAllRecruiters();
        setRecruiters(data);
      } catch (error) {
        console.error("Error fetching recruiters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Career Connect</span>
          </Link>
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

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Admin!</h1>
          <p className="text-muted-foreground">
            Manage recruiters and monitor platform activity.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Recruiters</CardTitle>
            <CardDescription>
              List of all recruiter applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recruiters.length === 0 ? (
              <p>No recruiters found.</p>
            ) : (
              recruiters.map((recruits) => (
                <Card
                  key={recruits.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>{recruits.name}</CardTitle>
                    <CardDescription>{recruits.email}</CardDescription>
                    <CardDescription>
                      {recruits.company?.name || "No Company"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            recruits.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : recruits.status === "active"
                              ? "bg-green-100 text-green-800"
                              : recruits.status === "banned"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {recruits.status}
                        </span>
                      </p>

                      <StatusDropdown
                        currentStatus={recruits.status}
                        statuses={["pending", "active"]}
                        onUpdate={async (newStatus) => {
                          await updateRecruiterStatus(recruits.id, newStatus);
                          setRecruiters((prev) =>
                            prev.map((recruiter) =>
                              recruiter.id === recruits.id
                                ? { ...recruiter, status: newStatus }
                                : recruiter
                            )
                          );
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
