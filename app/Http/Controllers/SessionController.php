<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Password;

// class SessionController extends Controller
// {
//     /**
//      * Display a listing of the resource.
//      */
//     public function index()
//     {
//         //
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
//     public function store(Request $request)
//     {
//         $credentials = $request->only('email', 'password');
//         if (Auth::attempt($credentials)) {
//             $user = Auth::user();
//             Auth::login($user);

//             return response()->json([
//                 'success' => true,
//                 'message' => 'user logged in successfully',
//                 'access_token' => $user->createToken("login")->accessToken, //ignore redline
//                 'refresh_token' => $user->createToken("login")->accessToken,

//             ], 200);
//         } else {
//             // dd("invalid login");
//             return response()->json([
//                 'success' => false,
//                 'message' => "invalid credentials",
//             ], 403);
//         }
//     }
//     public function destroy(Request $request)
//     {
//         Auth::logout();

//         $request->session()->invalidate();

//         $request->session()->regenerateToken();
//     }
//     public function passwordreset(Request $request)
//     {
//         $request->validate(['email' => 'required|email']);

//         $status = Password::sendResetLink(
//             $request->only('email')
//         );
//     }
// }



namespace App\Http\Controllers;

use App\Http\Requests\ForgetPassword;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller
{
    /**
     * Handle login request.
     */
    public function store(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $credentials['status'] = 'active';
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials ',
            ], 403);
        }

        $user = Auth::user();

        $token = $user->createToken('login');

        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully',
            'access_token' => $token->accessToken,
            'role' => $user->role,
            'id' => $user->id,
            'company' => $user->company ? $user->company->id : null,

        ]);
    }

    /**
     * Handle logout request.
     */
    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    /**
     * Handle password reset link request.
     */
    public function passwordreset(ForgetPassword $request)
    {
        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'success' => true,
                'message' => 'Reset link sent successfully.',
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => __($status),
        ], 422);
    }


    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        // dd($status);
        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password reset successful.']);
        }
        if ($status === Password::INVALID_TOKEN) {
            return response()->json(['message' => 'The reset token is invalid or has expired.'], 422);
        }
        return response()->json(['message' => __($status)], 422);

        // throw ValidationException::withMessages([
        //     'email' => [__($status),422],
        // ]);
    }
    public function findUser()
    {
        $user = Auth::user();
        return response()->json([
            "message" => "User fetched successfully",
            "data" => $user
        ]);
    }
}
