<?php

namespace App\Policies;

use App\Models\CareerApplication;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CareerApplicationPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
    public function updatestatus(User $user, CareerApplication $application): bool
    {
        // Only recruiters who created the career or admin can change status
        $isOwnerRecruiter = $user->role === 'recruiter' && $user->id === $application->career->created_by;
        $isAdmin = $user->role === 'admin';

        // dd($isOwnerRecruiter = $user->role === 'recruiter' && $user->id === $application->career->created_by);
        if (!($isOwnerRecruiter || $isAdmin)) {
            abort(403, 'Only recruiters or admins can change the status of this application.');
        }
        return $isOwnerRecruiter || $isAdmin;
    }
}
