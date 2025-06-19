<?php

namespace App\Services;

use App\Models\career;
use Illuminate\Database\Eloquent\Collection;

// class CareerService
// {

//     public function show(): Collection
//     {
//         $careers = career::all();
//         return $careers;
//     }
//     public function create(array $data): career
//     {
//         $career = career::create($data);
//         return $career;
//     }

//     public function findbyId(string $id): career
//     {
//         $career = career::findOrFail($id);
//         return $career;
//     }

//     public function update(int $id, array $data): career
//     {
//         $career = career::findOrFail($id);
//         $career->update($data);
//         return $career;
//     }

//     public function delete(string $id): career|null
//     {
//         $career = career::find($id);
//         if ($career) {

//             $career->destroy($id);
//         }
//         return $career;
//     }
//     public function filter(?array $salary, ?string $worktype, ?string $role, ?string $location)
//     {
//         // instead of writing if does we have better option
//         $query = Career::query();

//         if ($role) {
//             $query->where('role', $role);
//         }
//         if ($salary) {
//             $query->whereBetween('salary', [$salary[0], $salary[1]]);
//         }
//         if ($worktype) {
//             $query->where('worktype', $worktype);
//         }
//         if ($location) {
//             $query->where('location', $location);
//         }

//         return $query->get();
//     }

// }

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

    public function delete(string $id): ?Career
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
}