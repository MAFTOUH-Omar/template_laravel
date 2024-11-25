<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/product', [ProductController::class , 'index'])->name('product.index');
    Route::post('/product' , [ProductController::class , 'store'])->name('product.store');
    Route::delete('/product/{id}' , [ProductController::class , 'destroy'])->name('product.destroy');
    Route::put('/product/{id}' , [ProductController::class , 'update'])->name('product.update');
});

require __DIR__.'/auth.php';
