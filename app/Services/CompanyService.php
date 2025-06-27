<?php

namespace App\Services;

use App\Models\Company;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class CompanyService
{
    public function show(): Collection
    {
        return Company::all();
    }

    public function create(array $data): Company
    {
        $data['recruiter_id'] = Auth::user()->id;
        return Company::create($data);
    }

    public function findById(string $id): Company
    {
        return Company::findOrFail($id);
    }

    public function update(int $id, array $data): Company
    {
        $company = Company::findOrFail($id);
        $company->update($data);
        return $company;
    }

    public function delete(string $id): ?Company
    {
        $company = Company::find($id);

        if ($company) {
            $company->delete();
        }

        return $company;
    }
}
