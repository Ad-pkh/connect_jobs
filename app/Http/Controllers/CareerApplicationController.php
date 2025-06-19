<?php

namespace App\Http\Controllers;

use App\Http\Requests\CareerApplicationRequest;
use App\Http\Requests\CareerApplicationUpdateRequest;
use App\Models\Career;
use App\Services\CareerApplicationService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Traits\ApiResponseTrait;

class CareerApplicationController extends Controller
{
    use AuthorizesRequests, ApiResponseTrait;
    public function __construct(private CareerApplicationService $careerApplicationService) {}

    public function apply(CareerApplicationRequest $request, $careerId)
    {
        $this->authorize('apply', Career::class);

        $application = $this->careerApplicationService->applyToCareer(
            $careerId,
            $request->validated(),
            $request->file('resume')
        );

        return $this->success($application, "Career applied successfully");
    }
    public function updateStatus(CareerApplicationUpdateRequest $request, $careerId)
    {

       $validated= $request->validated();


        // dd($careerId);
        $application = $this->careerApplicationService->updateApplicationStatus(
            $careerId,$validated['userId'] ,$validated['status']  );

        return $this->success($application, "Career status updated successfully");
    }
}
