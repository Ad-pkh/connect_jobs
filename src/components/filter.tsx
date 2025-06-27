"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function JobFilter({
  onFilter,
}: {
  onFilter: (filters: any) => void;
}) {
  const [minSalary, setMinSalary] = useState("100");
  const [maxSalary, setMaxSalary] = useState("100000 ");
  const [role, setRole] = useState("");
  const [worktype, setWorktype] = useState("");

  const handleSubmit = () => {
    const query = {
      salary: [minSalary, maxSalary],
      role,
      worktype,
    };
    onFilter(query);
  };

  return (
    <div className="p-4 bg-white rounded-md space-y-4 shadow-md">
      <div>
        <Label>Minimum Salary</Label>
        <Input
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
        />
      </div>
      <div>
        <Label>Maximum Salary</Label>
        <Input
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
        />
      </div>
      <div>
        <Label>Role</Label>
        <Input value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <div>
        <Label>Work Type</Label>
        <Select onValueChange={setWorktype}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="onsite">Onsite</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Apply Filters
      </Button>
    </div>
  );
}
