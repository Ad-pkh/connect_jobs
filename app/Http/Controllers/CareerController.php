<?php

namespace App\Http\Controllers;

use App\Http\Requests\CareerRequest;
use App\Models\Career;
use App\Services\CareerApplicationService;
use App\Services\CareerService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CareerController extends Controller
{
    use ApiResponseTrait, \Illuminate\Foundation\Auth\Access\AuthorizesRequests;

    public function __construct(private CareerService $careerService, private CareerApplicationService $careerApplicationService) {}

    public function index(): JsonResponse
    {
        $careers = $this->careerService->show();
        return $this->success($careers, "Careers fetched successfully");
    }

    public function store(CareerRequest $request): JsonResponse
    {
        $this->authorize('create', Career::class);
        $validated = $request->validated();
        $validated['created_by'] = Auth::id();
        $career = $this->careerService->create($validated);
        return $this->success($career, "Career added successfully");
    }

    public function show(string $id): JsonResponse
    {
        $career = $this->careerService->findById($id);
        return $this->success($career, "Career fetched successfully");
    }

    public function update(CareerRequest $request, string $id): JsonResponse
    {

        $validated = $request->validated();
        $career = $this->careerService->update($id, $validated);
        $this->authorize('update', $career);
        return $this->success($career, "Career updated successfully");
    }

    public function destroy(string $id): JsonResponse
    {
        $career = $this->careerService->delete($id);
        $this->authorize('delete', $career);

        if ($career) {
            return $this->success($career, "Career deleted successfully");
        }

        return $this->error("No such career found", 404);
    }

    public function filter(Request $request): JsonResponse
    {
        $filters = $request->only(['salary', 'worktype', 'role', 'location']);
        $careers = $this->careerService->filter($filters);

        return $this->success($careers, "Careers filtered successfully");
    }

    public function mycareer(): JsonResponse
    {
        $career = $this->careerService->mycareer();
        return $this->success($career, "Careers fetched successfully");
    }
    public function candidates(string $id): JsonResponse
    {
        $applicants = $this->careerService->candidatesByCareer($id);

        return $this->success($applicants, "Applicants fetched successfully");
    }
}
