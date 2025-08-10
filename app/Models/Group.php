<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

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

    public function allSubgroups(): Builder|HasMany
    {
        return $this->subgroups()->with('allSubgroups')->withCount('products');
    }

    public function parent(): HasOne
    {
        return $this->hasOne(Group::class, 'id', 'parent_id');
    }

    public static function getFirstParentId(Group $group)
    {
        $parentGroup = DB::select('
            with recursive tree as (
                select * from `groups` where id = :id
                union all
                select g.* from `groups` g
                join tree t on g.id = t.parent_id
            )
            select * from `tree`
            order by id asc
            limit 1
        ', ['id' => $group->id])[0];
        $parentGroup = (array) $parentGroup;
        return $parentGroup['id'];
    }
}
