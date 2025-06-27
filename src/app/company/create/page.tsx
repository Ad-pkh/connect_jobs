"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";
import Link from "next/link";
import { createCompany } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contact: "",
    link: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      console.log("Creating company with data:", formData);
      await createCompany(formData);

      toast.success("Company created successfully!");
      router.push("/login");
    } catch (error: any) {
      console.error("Company creation failed:", error);
      toast.error(error?.message || "Failed to create company.");

      if (error?.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ general: [error.message || "Something went wrong."] });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4 bg-cyan-200">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Career Connect</span>
          </Link>
        </div>

        <Card className="bg-slate-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Register Your Company</CardTitle>
            <CardDescription>
              Join thousands of professionals creating others dream jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name[0]}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description[0]}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  required
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">{errors.contact[0]}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  required
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location[0]}</p>
                )}
              </div>

              {/* Link (optional) */}
              <div className="space-y-2">
                <Label htmlFor="link">Website Link</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => handleInputChange("link", e.target.value)}
                  placeholder="https://example.com"
                />
                {errors.link && (
                  <p className="text-red-500 text-sm">{errors.link[0]}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-600 hover:bg-green-400 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Registering Company..." : "Register Company"}
              </Button>

              {/* General Errors */}
              {errors.general &&
                errors.general.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-sm">
                    {msg}
                  </p>
                ))}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
