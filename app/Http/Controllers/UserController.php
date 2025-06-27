<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecruiterStatusUpdate;
use App\Traits\ApiResponseTrait;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    use ApiResponseTrait;
    public function __construct(private UserService $userService) {}

    public function store(UserRequest $request): JsonResponse
    {
        // Log::info('Signup API Hit');
        $validated = $request->validated();
        $validated['status'] = $request->role === 'recruiter' ? 'pending' : 'active';
        // dd($validated);

        $data = $this->userService->create($validated);
        return $this->success($data, "user created successfully ");
    }
    public function recruiter(): JsonResponse
    {
        $recruiter = $this->userService->findRecruiter();
        return $this->success($recruiter, "recruiter fetched successfully ");
    }
    public function updateRecruiterStatus(RecruiterStatusUpdate $request,string $id): JsonResponse
    {
        $validated = $request->validated();
        // dd($validated);

        $recruiter = $this->userService->updateRecruiterStatus($id, $validated['status']);

        return $this->success($recruiter, "Recruiter status updated successfully.");
    }
}
