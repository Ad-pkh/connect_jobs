<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct() {}
    public function updateStatus(User $authUser, User $targetUser): bool
    {
        $isAdmin = $authUser->role === 'admin';
        $isTargetRecruiter = $targetUser->role === 'recruiter';
        return $isAdmin && $isTargetRecruiter;
    }
}