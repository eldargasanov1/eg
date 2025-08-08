<?php

namespace App\Models;

use App\Enums\Store\SortByParam;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'group_id',
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function price(): HasOne
    {
        return $this->hasOne(Price::class);
    }

    #[Scope]
    public function orderByParam(Builder $query, ?SortByParam $param): Builder {
        if (is_null($param)) {
            return $query;
        }

        $sortByValue = $param->getParamValue();

        if ($param->getParamName() == 'price') {
            $query
                ->join('prices', 'prices.product_id', '=', 'products.id')
                ->orderBy('prices.price', $sortByValue);
        }
        if ($param->getParamName() == 'name') {
            $query->orderBy('name', $sortByValue);
        }

        return $query;
    }
}
