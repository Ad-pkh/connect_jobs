<?php
namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponseTrait {
    protected function success($data = [], $message = 'Success', $code = 200): JsonResponse {
        return response()->json(['success' => true, 'message' => $message, 'data' => $data], $code);
    }

    protected function error($message = 'Error', $code = 500): JsonResponse {
        return response()->json(['success' => false, 'message' => $message], $code);
    }
}