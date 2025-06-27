<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    use ApiResponseTrait;
    public function store(Request $request)
    {
        // Validate the request input
        $validator = Validator::make($request->all(), [
            'docs' => 'required|file|max:2048|mimes:pdf,doc,jpg,png',
        ]);

        if ($validator->fails()) {
            return $this->error("Invalid file upload", 422);
        }

        $user = Auth::user();
        $file = $request->file('docs');

        //  filename or generate UUID for privacy
        $path = Storage::disk('public')->putFile("resume/{$user->name}", $file);
        //also need to check if user storedd previously or not

        return $this->success([
            'path' => $path,
            'filename' => $file->getClientOriginalName()
        ], "File uploaded successfully");
    }
    // public function getFile($id)
    // {
    //     $user = User::find($id)->name;
    //     // dd($user);
    //     $path = storage_path("app/user/file/{$user}");
        
    //     if (!$path) {
    //         return $this->error("file not found",404);
    //     }
    //     // dd($path);

    //     return $this->success($path,"file fetched successfully"); 
    // }
    public function getFile($id)
{
    $user = User::findOrFail($id)->name;
    $path ="resume/{$user}";
    // file exists in storage
    $files = Storage::disk('public')->files($path);
    // dd($files);

    if (empty($files)) {
        return response()->json([
            'success' => false,
            'message' => 'No resume file found for this user.'
        ], 404);
    }

    $resumePath = $files[0];

    return response()->json([
        'success' => true,
        'message' => 'Resume found',
        'data' => asset("storage/{$resumePath}") 
    ]);
}

}
