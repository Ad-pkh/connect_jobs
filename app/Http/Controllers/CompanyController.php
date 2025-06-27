<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Services\CompanyService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;

class CompanyController extends Controller
{
    use ApiResponseTrait;

    public function __construct(private CompanyService $companyService) {}

    public function index(): JsonResponse
    {
        $companies = $this->companyService->show();
        return $this->success($companies, "Companies fetched successfully");
    }

    public function store(CompanyRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $company = $this->companyService->create($validated);
        return $this->success($company, "Company created successfully");
    }

    public function show(string $id): JsonResponse
    {
        $company = $this->companyService->findById($id);
        return $this->success($company, "Company fetched successfully");
    }

    public function update(CompanyRequest $request, string $id): JsonResponse
    {
        $validated = $request->validated();
        $company = $this->companyService->update($id, $validated);
        return $this->success($company, "Company updated successfully");
    }

    public function destroy(string $id): JsonResponse
    {
        $company = $this->companyService->delete($id);
        if ($company) {
            return $this->success($company, "Company deleted successfully");
        }
        return $this->error("Company not found", 404);
    }
}
