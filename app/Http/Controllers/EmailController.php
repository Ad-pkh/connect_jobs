<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponseTrait;
use App\Mail\Email;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    use ApiResponseTrait;
    public function sendEmail(Request $request): JsonResponse
    {
        $request->validate([
            'subject' => 'required|string',
            'to' => 'required|email',
            'message' => 'required|string',
        ]);

        $to = $request->input('to');
        $message = $request->input('message');
        $subject = $request->input('subject');
        // dd($message);

        Mail::to($to)->send(new Email($message, $subject));

        return $this->success([], "Mail sent successfully");
    }
}
