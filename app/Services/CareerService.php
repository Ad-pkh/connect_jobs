<?php

namespace App\Services;

use App\Models\career;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class CareerService
{
    public function show(): Collection
    {
        return Career::all();
    }

    public function create(array $data): Career
    {
        return Career::create($data);
    }

    public function findById(string $id): Career
    {
        return Career::findOrFail($id);
    }

    public function update(int $id, array $data): Career
    {
        $career = Career::findOrFail($id);
        $career->update($data);

        return $career;
    }

    public function delete(string $id): Career
    {
        $career = Career::find($id);

        if ($career) {
            $career->delete();
        }

        return $career;
    }

    public function filter(array $filters): Collection
    {
        $query = Career::query();

        if (!empty($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        if (!empty($filters['salary']) && is_array($filters['salary']) && count($filters['salary']) === 2) {
            $query->whereBetween('salary', [$filters['salary'][0], $filters['salary'][1]]);
        }

        if (!empty($filters['worktype'])) {
            $query->where('worktype', $filters['worktype']);
        }

        if (!empty($filters['location'])) {
            $query->where('location', $filters['location']);
        }

        return $query->get();
    }
    public function mycareer()
    {
        $user = Auth::user();
        $career = $user->careers;
        // dd($career);
        return $career;
    }
    public function candidatesByCareer(string $careerId)
    {
        $career = Career::with('applications.user')->findOrFail($careerId);
        $candidates = $career->applications;

        return $candidates;
    }
}
