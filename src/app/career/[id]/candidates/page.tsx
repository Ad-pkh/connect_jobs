"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCandidatesByCareer,
  getResume,
  updateApplicantStatus,
} from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusDropdown from "@/components/dopdownbtn";
import { toast } from "sonner";

export default function CandidateList() {
  const params = useParams();
  const careerId = params?.id as string;
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const applicant = await getCandidatesByCareer(careerId);
        console.log("applicant", applicant.data);

        setCandidates(applicant.data || []);
        toast.success(applicant.message || "success");
      } catch (err) {
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    }

    if (careerId) {
      fetchCandidates();
    }
  }, [careerId]);

  if (loading) {
    return <p className="text-center py-10">Loading candidates...</p>;
  }

  return (
    <div className="container mx-auto py-8 ">
      <Button onClick={() => window.history.back()}>←</Button>
      <Card>
        <CardHeader>
          <CardTitle>Candidates Applied</CardTitle>
        </CardHeader>
        <CardContent>
          {candidates.length === 0 ? (
            <p>No candidates have applied yet.</p>
          ) : (
            candidates.map((app) => (
              <Card
                key={app.id}
                className="  hover:shadow-md transition-shadow flex-shrink-0 "
              >
                <CardHeader>
                  <CardTitle>{app.user?.name || "No Name"}</CardTitle>
                  <CardDescription>
                    {app.user?.email || "No Email"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          app.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>

                    <StatusDropdown
                      currentStatus={app.status}
                      statuses={[
                        "pending",
                        "accepted",
                        "rejected",
                        "interview",
                      ]}
                      onUpdate={async (newStatus) => {
                        await updateApplicantStatus(
                          app.career_id,
                          app.user.id,
                          newStatus
                        );
                        setCandidates((prev) =>
                          prev.map((candidate) =>
                            candidate.user.id === app.user.id
                              ? { ...candidate, status: newStatus }
                              : candidate
                          )
                        );
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={async () => {
                        try {
                          const res = await getResume(app.user.id);
                          if (res.success && res.data) {
                            console.log("res",res.message);
                            
                            toast.success(res.message )
                            window.open(res.data, "_blank");
                            
                          } else {
                            toast.error(res.message|| "Resume not found");
                          }
                        } catch (err) {
                          toast.error("Failed to fetch resume");
                        }
                      }}
                    >
                      View Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
