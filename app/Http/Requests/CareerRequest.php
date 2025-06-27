<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CareerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        //  todo is this approach optimized and scalable
        $rules = [
            'title' => 'string|min:2|max:25',
            'description' => 'string|min:2',
            'location' => 'string|min:2|max:150',
            'salary' => 'numeric|min:100',
            'role' => 'string|min:2',
            'worktype' => 'string|in:onsite,hybrid,remote',
            'status' => 'string|in:publish,unpublish'
        ];

        if ($this->isMethod('post')) {
            foreach ($rules as $field => $rule) {
                $rules[$field] = 'required|' . $rule;
            }
        } else {
            foreach ($rules as $field => $rule) {
                $rules[$field] = 'sometimes|required|' . $rule;
            }
        }

        return $rules;
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'errors' => $validator->errors(),
        ], 422));
    }
}
