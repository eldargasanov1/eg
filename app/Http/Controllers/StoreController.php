<?php

namespace App\Http\Controllers;

use App\Enums\Store\SortByParam;
use App\Http\Requests\StoreRequest;
use App\Models\Group;
use App\Models\Product;
use App\Services\GroupService;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    public function __construct(
        protected GroupService $groupService
    )
    {
    }

    public function index(StoreRequest $request): Response
    {
        $groupTree = $this->groupService->getGroupsTree();
        $products = Product::query()
            ->orderByParam(SortByParam::tryFrom(request('sortBy')))
            ->with('price')
            ->paginate(request('perPage'));

        return Inertia::render('store/index', [
            'groups' => $groupTree,
            'products' => $products,
        ]);
    }

    public function group(StoreRequest $request, Group $group): Response
    {
        $groupTree = $this->groupService->getGroupsTree($group);
        $groupsIds = $this->groupService->flattenGroupTree($group)->pluck('id')->toArray();
        $products = Product::query()
            ->whereIn('group_id', $groupsIds)
            ->orderByParam(SortByParam::tryFrom(request('sortBy')))
            ->with('price')
            ->paginate(request('perPage'));

        return Inertia::render('store/index', [
            'groups' => $groupTree,
            'products' => $products,
        ]);
    }

    public function product(Group $group, Product $product)
    {
        $groups = $this->groupService->getGroupsTree($group);
        $product->load('price');
        return Inertia::render('store/detail', [
            'groups' => $groups,
            'product' => $product
        ]);
    }
}
