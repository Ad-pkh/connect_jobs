<?php

namespace App\Policies;

use App\Models\Career;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CareerPolicy
{
    /**
     * Only employers and admins can create job listings.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['admin', 'recruiter']);
    }

    /**
     * Only the creator or an admin can update the job.
     */
    public function update(User $user, Career $career): bool
    {
        return $user->id === $career->created_by || $user->role === 'admin';
    }

    /**
     * Only the creator or an admin can delete the job.
     */
    public function delete(User $user, Career $career): bool
    {
        return $user->id === $career->created_by || $user->role === 'admin';
    }

    /**
     * Only job seekers can apply to jobs.
     */
    public function apply(User $user): bool
    {
        return $user->role === 'applicant';
    }

    /**
     * Anyone can view jobs .
     */
    public function view(User $user, Career $career): bool
    {
        return true;
    }

    /**
     * Only admin can filter across all jobs (optional).
     */
    public function filter(User $user): bool
    {
        return true;
    }
}
