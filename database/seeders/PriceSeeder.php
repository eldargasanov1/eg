<?php

namespace Database\Seeders;

use App\Models\Price;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productIds = Product::query()->pluck('id');

        foreach ($productIds as $productId) {
            Price::factory()->create([
                'product_id' => $productId,
            ]);
        }
    }
}
