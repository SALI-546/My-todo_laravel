<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodosController;
use App\Http\Controllers\TodosStatusController;
// use App\Http\Controllers\TodosController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Events\Hello;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth'])->name('dashboard');

Route::prefix('/dashboard')->middleware(['auth'])->name('dashboard.')->group( function () {
    Route::get('/', [TodosController::class, 'show'])->name('index');
    // return view('dashboard_app');
});

Route::prefix('/api')->middleware(['auth'])->name('dashboard.')->group( function () {
    Route::get('/', function () {
        return 'API Documentation';
    })->name('index');
    // Route::get('/users/{id}', [UsersController::class, 'index'])->name('index');
    Route::get('/todos', [TodosController::class, 'index'])->name('index');

    Route::post('/todos', [TodosController::class, 'store'])->name('store');
    Route::put('/todos', [TodosController::class, 'update'])->name('update');
    Route::delete('/todos', [TodosController::class, 'destroy'])->name('delete');
    // Route::get('/todos/{id}', [TodosController::class, 'index'])->name('index');
    Route::get('/todos_status', [TodosStatusController::class, 'index'])->name('todos_status_index');
    // Route::get('/todos_status/{id}', [TodosController::class, 'index'])->name('index');

    // return view('dashboard_app');
});

Route::get('/hello', function (Request $request) {
    // 2
    event(new Hello());

    return 'ok';

})->name('new.todo');

// Route::get('broadcast', function () {
//     return(new Hello());
// });

require __DIR__.'/auth.php';

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

