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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;

class CareerApplicationService
{
    public function applyToCareer(int $careerId): CareerApplication
                                // array $data
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

        // $resumePath = $resumeFile->store('resumes', 'public');

        return CareerApplication::create([
            'user_id'      => $user->id,
            'career_id'    => $careerId,
            'status'       => 'pending',
            'cover_letter' => $data['cover_letter'] ?? null,
            // 'resume_path'  => $resumePath,
        ]);
    }
    public function updateApplicationStatus(int $careerId, string $userid, string $newStatus): CareerApplication
    {

        return DB::transaction(function () use ($careerId, $userid, $newStatus): CareerApplication {
            // dd($careerId,$userid,$newStatus);
            $application = CareerApplication::with('user')
            ->where('career_id', $careerId)
            ->where('user_id', $userid)
            ->firstOrFail();
            
            Gate::authorize('updatestatus', $application);

            $application->update(['status' => $newStatus]);
            // Send notification email to the applicant
            $user = $application->user;
            $subject = 'Your application status has been updated';
            $message = "Dear {$user->name},Your application for the position has been updated to:  {$newStatus}.
        Thank you for your interest in joining our team. We appreciate your application and will keep you informed about the next steps in the hiring process.
        Best regards,The Career Connect Team";
            Mail::to($user->email)->send(new Email($message, $subject));

            return $application;
        });
    }
    public function appliedCarrer()
    {
        $user = Auth::user();
        $application = $user->careerApplications()->with('career')->get();
        // dd($application);
        return $application;
    }
}
