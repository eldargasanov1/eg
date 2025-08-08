<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id'
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function subgroups(): HasMany
    {
        return $this->hasMany(Group::class, 'parent_id');
    }

    public function allSubgroups()
    {
        return $this->subgroups()->with('allSubgroups')->withCount('products');
    }
}
