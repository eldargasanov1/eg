<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(StoreController::class)->group(function () {
    Route::get('/', 'index')->name('store.index');
    Route::get('/{group}', 'group')->name('store.group');
    Route::get('/{group}/{product}', 'product')->name('store.product');
});
