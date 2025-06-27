"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function StatusDropdown({
  currentStatus,
  statuses,
  onUpdate,
  label = "Change Status",
}: {
  currentStatus: string;
  statuses: string[];
  onUpdate: (newStatus: string) => Promise<void>;
  label?: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: string) => {
    if (newStatus === status) return;

    setStatus(newStatus);
    setLoading(true);
    try {
      await onUpdate(newStatus);
      toast.success("Status updated successfully!");
    } catch (err) {
      toast.error("Failed to update status");
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={loading}>
          {loading
            ? "Updating..."
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={handleChange}>
          {statuses.map((option) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
