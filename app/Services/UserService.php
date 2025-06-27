<?php

namespace App\Services;

use App\Mail\Email;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;

class UserService
{

    public function create(array $data): User
    {
        $user = User::create($data);
        // event(new Registered($user));
        return $user;
    }


    public function update(int $id, array $data): User
    {
        $user = user::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function findbyId(string $id)
    {
        $user = user::findOrFail($id);
        return $user;
    }
    public function delete(string $id): void
    {
        User::destroy($id);
    }
    public function findRecruiter()
    {
        $data = User::with('company')->where('role', 'recruiter')->get();
        return $data;
    }
    public function updateRecruiterStatus(string $userid, string $newStatus)
    {

        return DB::transaction(function () use ($userid, $newStatus): User {
            $targetUser = User::findOrFail($userid);
            // $response = Gate::inspect('update', $targetUser);         

             Gate::authorize('updateStatus', $targetUser);

            $targetUser->update(['status' => $newStatus]);

            // Send notification email 
            // dd($targetUser);
            $subject = 'Your account status has been updated';
            $message = "Dear {$targetUser->name},Your  Account has been {$newStatus}.
            Thank you for your interest in joining our team.Best regards,The Career Connect Team";
            Mail::to($targetUser->email)->send(new Email($message, $subject));

            return $targetUser;
        });
    }
}
