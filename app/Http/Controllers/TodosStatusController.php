<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodosStatusRequest;
use App\Http\Requests\UpdateTodosStatusRequest;
use App\Models\TodosStatus;
use Illuminate\Http\Request;

class TodosStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        // foreach (TodosStatus::all() as $todoStatus) {
        //     echo $todoStatus->status_name;
        // }
        $todosStatusList = TodosStatus::all();
        return response()->json($todosStatusList);
        // return $todosStatusList;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTodosStatusRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodosStatusRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TodosStatus  $todosStatus
     * @return \Illuminate\Http\Response
     */
    public function show(TodosStatus $todosStatus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TodosStatus  $todosStatus
     * @return \Illuminate\Http\Response
     */
    public function edit(TodosStatus $todosStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTodosStatusRequest  $request
     * @param  \App\Models\TodosStatus  $todosStatus
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTodosStatusRequest $request, TodosStatus $todosStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TodosStatus  $todosStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(TodosStatus $todosStatus)
    {
        //
    }
}
