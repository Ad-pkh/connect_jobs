<?php

namespace App\Http\Controllers;
use App\Traits\ApiResponseTrait;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    use ApiResponseTrait;

    public function store(UserRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $data = User::create($validated);
        return $this->success($data,"user created successfully ");
    }
}