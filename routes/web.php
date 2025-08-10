<?php

use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;

Route::controller(StoreController::class)->group(function () {
    Route::get('/', 'index')->name('store.index');
    Route::get('/{group}', 'group')->name('store.group');
    Route::get('/{group}/{product}', 'product')->name('store.product');
});
