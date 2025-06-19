<?php

namespace App\Services;

use App\Mail\Email;
use App\Models\Career;
use App\Models\CareerApplication;
use App\Models\JobApplication;

use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate ;
use Illuminate\Support\Facades\Mail;

class CareerApplicationService
{
    public function applyToCareer(int $careerId, array $data, $resumeFile): CareerApplication

    {
        $user = Auth::user();

        $career = Career::find($careerId);
        if (! $career) {
            throw new NotFoundHttpException('Career not found.');
        }

        $alreadyApplied = CareerApplication::where('user_id', $user->id)
            ->where('career_id', $careerId)
            ->exists();

        if ($alreadyApplied) {
            throw ValidationException::withMessages([
                'application' => ['You have already applied to this career.']
            ]);
        }

        $resumePath = $resumeFile->store('resumes', 'public');

        return CareerApplication::create([
            'user_id'      => $user->id,
            'career_id'    => $careerId,
            'status'       => 'pending',
            'cover_letter' => $data['cover_letter'] ?? null,
            'resume_path'  => $resumePath,
        ]);
    }
    public function updateApplicationStatus(int $careerId, string $userid, string $newStatus): CareerApplication
    {
        // todo use relation


        // Fetch the application by careerId and userId
        $application = CareerApplication::where('career_id', $careerId)
            ->where('user_id', $userid)->first();


        // dd($application);
        Gate::authorize('updatestatus', $application);
        $application->status = $newStatus;
        $application->save();

        // Send notification email to the applicant
        $user = $application->user;
        $subject = 'Your application status has been updated';
        $message = "Dear {$user->name}, your application status for career ID {$application->career_id} is now '{$newStatus}'.";
        Mail::to($user->email)->send(new Email($message, $subject));

        return $application;
    }

    
}
