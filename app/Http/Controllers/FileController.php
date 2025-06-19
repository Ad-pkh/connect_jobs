<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Storage;

// class FileController extends Controller
// {
//     public function store(Request $request)
//     {
//         $user=Auth::user()->name;
//         // dd($user);
//         $file = $request->file('docs');
//         // dd($file);
//         $location=Storage::disk('local')->putFile($user, $file);
//         return $this->success($location, "file Uploaded successfully");
//     }
// }


namespace App\Http\Controllers;

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

        // Optional: sanitize filename or generate UUID for privacy
        $path = Storage::disk('local')->putFile("uploads/{$user->name}", $file);

        //for public

        // $path = $file->store("uploads/{$user->name}", 'public');
        // $url = Storage::url($path);


        return $this->success([
            'path' => $path,
            'filename' => $file->getClientOriginalName()
        ], "File uploaded successfully");
    }
}
