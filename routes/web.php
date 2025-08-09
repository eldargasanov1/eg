<?php

use App\Http\Controllers\StoreController;
use App\Models\Product;
use App\Services\GroupService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('test', function (GroupService $groupService) {
//    $groupsTree = $groupService->getGroupsTree();

//    dd(\Illuminate\Support\Arr::flatten($groupsTree->toArray()));
//    dd();
    $groupTreeIds = $groupService->flattenGroupTree(\App\Models\Group::query()->find(12))->pluck('id')->toArray();
    $products = Product::query()->whereIn('id', $groupTreeIds)->get()->toArray();
    return '<pre>' . print_r($products, true) . '</pre>';
});

Route::controller(StoreController::class)->group(function () {
    Route::get('/', 'index')->name('store.index');
    Route::get('/{group}', 'group')->name('store.group');
    Route::get('/{group}/{product}', 'product')->name('store.product');
});
