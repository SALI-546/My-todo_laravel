<?php

namespace App\Events;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use App\Models\Todos;

class NewTodoEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private Todos $todo;
    private $userId;
    // 2
    public function __construct($userId, Todos $todo)
    {
    // $this->user = $user;
    $this->todo = $todo;
    $this->userId = $userId;
    }
    // 3
    // public function broadcastWith()
    // {
    // return [
    // 'id' => Str::orderedUuid(),
    // 'user' => $this->user,
    // 'message' => $this->message,
    // 'createdAt' => now()->toDateTimeString(),
    // ];
    // }
    // 4
    // public function broadcastAs()
    // {
    // return 'new.todo';
    // }
    // 5
    /**
 * Get the data to broadcast.
 *
 * @return array
 */
    public function broadcastWith()
    {
        return ['id' => $this->userId];
    }

    public function broadcastAs()
{
    return 'private.todo';
}
    public function broadcastOn()
    {
    return new Channel('private.todo.'.$this->userId);
    }
}
