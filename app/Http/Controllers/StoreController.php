<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest;
use App\Models\Group;
use App\Models\Product;
use App\Services\GroupService;
use Inertia\Response;

class StoreController extends Controller
{
    public function __construct(
        protected GroupService $groupService
    ) {}

    public function index(StoreRequest $request): Response {
        //
    }

    public function group(StoreRequest $request, Group $group): Response {
        //
    }

    public function product(Group $group, Product $product) {
        //
    }
}
