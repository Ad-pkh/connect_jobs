<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\CareerRequest;
// use App\Services\CareerService;
// use Illuminate\Http\JsonResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class CareerController extends Controller
// {
//     public function __construct(private CareerService $careersvc) {}
//     /**
//      * Display a listing of the resource.
//      */
//     public function index()
//     {
//         $career = $this->careersvc->show();
//         return $this->success($career, "Careers fetched Succeessfully");
//     }

//     /**
//      * Show the form for creating a new resource.
//      */
//     public function create()
//     {
//         //
//     }

//     /**
//      * Store a newly created resource in storage.
//      */
//     public function store(CareerRequest $request)
//     {
//         $validated = $request->validated();
//         $validated['created_by'] = Auth::user()->id;
//         $career = $this->careersvc->create($validated);
//         return $this->success($career, "Careers Added Succeessfully");
//     }

//     /**
//      * Display the specified resource.
//      */
//     public function show(string $id): JsonResponse
//     {
//         // need to get careers by user id 
//         $career = $this->careersvc->findbyId($id);
//         return $this->success($career, "Careers fetched Succeessfully");
//     }

//     /**
//      * Show the form for editing the specified resource.
//      */
//     public function edit(string $id)
//     {
//         //
//     }

//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(CareerRequest $request, string $id): JsonResponse
//     {
//         $validated = $request->validated();
//         $career = $this->careersvc->update($id, $validated);
//         return $this->success($career, "Career updated Succeessfully");
//     }

//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy(string $id): JsonResponse
//     {
//         //i sthis aood approach
//         $career = $this->careersvc->delete($id);
//         if ($career) {

//             return $this->success($career, "Career deleted Succeessfully");
//         }
//         return $this->error("No such Career found", 404);
//     }

//     public function filter(Request $request): JsonResponse
//     {
//         // dd("filter");
//         $salary = $request->input('salary');
//         $worktype = $request->input('worktype');
//         $role = $request->input('role');
//         $location = $request->input('location');
//         $career = $this->careersvc->filter($salary, $worktype, $role,$location);
//         // dd($career.);
//         return $this->success($career);
//     }

//     public function apply(){
//         //should fetch all information from user profile
//         return $this->success([],"test");
//     }
// }



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

    public function __construct(private CareerService $careerService ,private CareerApplicationService $careerApplicationService) {}

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

    

}
