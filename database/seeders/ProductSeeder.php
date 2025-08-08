<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groupIds = Group::query()->pluck('id');

        for ($i = 0; $i < 100; $i++) {
            Product::factory()->create([
                'group_id' => $groupIds->random(),
            ]);
        }
    }
}
