import { Job } from '@/types/job';

const API_BASE = 'http://localhost:8000/api';

export async function signup(formData: any) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json.data || {};
}
export async function login(formData: any) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}
export async function forgetPassword(email: string) {
  const res = await fetch(`${API_BASE}/reset-password-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },

    body: JSON.stringify({ email }),
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

export async function createCompany(companyData: {
  // name: string;
  // address: string;
  // link: string;
  // recruiter_id: string;
  name: string;
  description: string;
  location: string;
  contact: string;
  link: string;
}) {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/company/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,

    },
    body: JSON.stringify(companyData),
  });

  const json = await res.json();
  return json.data || {};
}
export async function getCompany(id: string): Promise<any> {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/company/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,

    }
  });
  const json = await res.json();
  return json.data || null;
}

export async function createJob(formData: any) {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/career/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json.data || {};
}

export async function getmyjob() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/career/my`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json.data || {};
}

export async function getallJobs(): Promise<Job[]> {
  const res = await fetch(`${API_BASE}/career`);
  const json = await res.json();
  return json.data || [];
}

export async function getJobbyId(id: string): Promise<Job> {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/career/${id}`, {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json.data || null;
}
export async function getuser() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/me`, {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json.data || null;
}



export async function applyToJob(id: string) {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/career/${id}/apply`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    // body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json.data || {};
}

export async function uploadResume(formData: FormData) {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json;
}

export async function getResume(userId: string) {
  const accessToken = localStorage.getItem('access_token');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch resume");
  }

  const data = await res.json();
  return data;
}



export async function updateJob(id: string, formData: any) {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/career/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json.data || {};
}
export async function deleteJob(id: string) {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/career/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json.data || {};
}
export async function getAppliedJobs() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error('No access token found. Please log in.');
  }
  const res = await fetch(`${API_BASE}/applied`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch applied jobs");

  const data = await res.json();
  return data.data;
}
export async function getCandidatesByCareer(careerId: string) {
  // const accessToken = localStorage.getItem('access_token');

  const res = await fetch(`${API_BASE}/career/candidates/${careerId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch candidates");
  }

  return res.json();
}
export async function updateApplicantStatus(applicationId: string, userId: string, newStatus: string) {

  const res = await fetch(`${API_BASE}/career/application/${applicationId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ status: newStatus, userId: String(userId) }),
  });

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
}

export async function resetpassword(email: string) {
  const res = await fetch("http://localhost:8000/api/reset-password-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
}

export async function filterJobs(filters: any) {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }

  const params = new URLSearchParams();

  if (filters.salary[0]) params.append("salary[]", filters.salary[0])
  if (filters.salary[1]) params.append("salary[]", filters.salary[1])
  if (filters.role) params.append("role", filters.role);
  if (filters.worktype) params.append("worktype", filters.worktype);

  const res = await fetch(`${API_BASE}/career/filter/?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();
  return json.data || [];
}

export async function getAllRecruiters() {
  const token = localStorage.getItem("access_token")

  const res = await fetch(`${API_BASE}/recruiter`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch recruiters")
  }

  const recruiter = await res.json()
  console.log("data", recruiter.data);
  return recruiter.data || []
}
export async function updateRecruiterStatus(userId: string, status: string) {
  const res = await fetch(`${API_BASE}/recruiter/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ status: status, userId: String(userId) }),
  });

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
}