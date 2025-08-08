<?php

namespace App\Http\Requests;

use App\Enums\Store\PerPageParam;
use App\Enums\Store\SortByParam;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
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
        return [
            'page' => ['integer', 'min:1'],
            'perPage' => ['integer', Rule::in(PerPageParam::values())],
            'sortBy' => [Rule::in(SortByParam::values())],
        ];
    }
}
