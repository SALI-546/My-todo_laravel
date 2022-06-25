<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodosRequest;
use App\Http\Requests\UpdateTodosRequest;
use Illuminate\Http\Request;
use App\Models\Todos;
use Illuminate\Support\Facades\Auth;
// use App\Http\Controllers\TodosStatusController;
use App\Events\NewTodoEvent;

class TodosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $todos;

    public function index(Request $request)
    {
        //
        // Get the currently authenticated user...
        $user = Auth::user();
        
        // Get the currently authenticated user's ID...
        $id = Auth::id();

        $todosStatusId = $request->input('status');

        $todos = null;

        // LISTA AS TAREFAS PELO STATUS ESCOLHIDO
        if ( isset($todosStatusId) ) {

            $todos = Todos::where([
                ['users_id', $id], 
                ['todos_status_id', $todosStatusId]
                ])->orderBy('updated_at', 'DESC')->get();

        } else {
            
            $todos = Todos::where('users_id', $id)->get();
        }
                   
        // want to broadcast NewMessageNotification event
        // event(new NewTodoEvent($id, $todos));

        $_COOKIE['users_id'] = $id;
        $todos = $todos->reject(function ($todo) {
            return $todo->cancelled;
        });

        $minutes = 120;
        return response()->json($todos)->withCookie(cookie('users_id', $id, $minutes));

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
     * @param  \App\Http\Requests\StoreTodosRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function store(StoreTodosRequest $request)
    {

        $jsonData = json_decode($request->getContent(), true);

        // Get the currently authenticated user's ID...
        $id = Auth::id();
        $jsonData['users_id']=$id;
        Todos::create($jsonData);

         // message is being sent
         $todo = new Todos;
        //  $todo->setAttribute('users_id', $id);
        //  $todo->setAttribute('to', $id);
        //  $todo->setAttribute('message', 'Demo message from user 1 to user 1');
        //  $todo->save();
        $todo = $todo->fresh();
         // want to broadcast NewMessageNotification event
        //  NewTodoEvent::dispatch($id, $todo);
        // event(new NewTodoEvent($id, $todo));

        return response()->json($jsonData);
        // return "Success";
        // return redirect()->route('clube.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todos  $todos
     * @return \Illuminate\Http\Response
     */
    public function show(Todos $todos)
    {
        //
        // $todos = $this->index();
        return view('dashboard.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todos  $todos
     * @return \Illuminate\Http\Response
     */
    public function edit(Todos $todos)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTodosRequest  $request
     * @param  \App\Models\Todos  $todos
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTodosRequest $request)
    {
        //
        $jsonData = json_decode($request->getContent(), true);

        $userId = Auth::id();
        $todoId = $request->input('id');

        $todosStatusId = $request->input('todos_status_id');
        // $todosStatusId = $todosStatusId==? 1 : 0;
        // if($todosStatusId==true){
        //     $todosStatusId=1;
            
        // }else{
        //     $todosStatusId = 0;
        // }

        $todo = Todos::find($todoId);
        $todo->title = $request->input('title');
        $todo->description = $request->input('description');
        
        $todo->todos_status_id = $todosStatusId;
        $todo->update();
        // $todo->fresh();

        return $todo;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todos  $todos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $todoId = $request->input('id');
        $todo = Todos::findOrFail($todoId);
        $res = $todo->delete();

        $data = ["success"=>false, "message"=> "Error: Cannot find provided ID"];

        if ($res){
           $data["success"]=true;
           $data["message"]="Successfully deleted todo id ".$todoId;
        }

        return $data;
    }
}
