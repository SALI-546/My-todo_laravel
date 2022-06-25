<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Events\NewTodoEvent;
use App\Http\Controllers\TodosController;
use App\Http\Controllers\TodosStatusController;
// use App\Http\Controllers\TodosController;
use Illuminate\Support\Facades\Auth;
use App\Events\Hello;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/hello', function (Request $request) {
//     // 2
//     event(new Hello());

//     return 'ok';

// })->name('new.todo');


// ::middleware('auth:api')->
// Route::middleware('auth:api')->group( function () {

//     Route::get('/', function (Request $request) {
//         $request->user();
//         return 'API Documentation';
//     })->name('index');
//     // Route::get('/users/{id}', [UsersController::class, 'index'])->name('index');
//     Route::get('/todos', [TodosController::class, 'index'])->name('index');

//     Route::post('/todos', [TodosController::class, 'store'])->name('store');
//     // Route::get('/todos/{id}', [TodosController::class, 'index'])->name('index');
//     Route::get('/todos_status', [TodosStatusController::class, 'index'])->name('todos_status_index');
//     // Route::get('/todos_status/{id}', [TodosController::class, 'index'])->name('index');
//     Route::post('new-todo', function (Request $request) {
//         // 2
//         event(new NewTodoEvent($request->user, $request->message));
//         return 'ok';

//     })->name('new.todo');

//     // return view('dashboard_app');
// });

    // 1
