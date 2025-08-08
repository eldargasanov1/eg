<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groupIds = [
            'level_1' => [],
            'level_2' => [],
            'level_3' => [],
            'level_4' => [],
            'level_5' => [],
        ];

        for ($i = 0; $i < 5; $i++) {
            $id = Group::factory()->create(
                ['parent_id' => 0]
            )->id;
            $groupIds['level_1'][] = $id;
        }

        for ($i = 0; $i < 10; $i++) {
            $id = Group::factory()->create(
                ['parent_id' => Arr::random($groupIds['level_1'])]
            )->id;
            $groupIds['level_2'][] = $id;
        }

        for ($i = 0; $i < 10; $i++) {
            $id = Group::factory()->create(
                ['parent_id' => Arr::random($groupIds['level_2'])]
            )->id;
            $groupIds['level_3'][] = $id;
        }

        for ($i = 0; $i < 15; $i++) {
            $id = Group::factory()->create(
                ['parent_id' => Arr::random($groupIds['level_3'])]
            )->id;
            $groupIds['level_4'][] = $id;
        }

        for ($i = 0; $i < 20; $i++) {
            $id = Group::factory()->create(
                ['parent_id' => Arr::random($groupIds['level_4'])]
            )->id;
            $groupIds['level_5'][] = $id;
        }
    }
}
