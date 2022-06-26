<?php

use Illuminate\Support\Facades\Broadcast;
use App\Events\Hello;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Broadcast::channel('channel', function ($todo) {
//     event(new Hello());
//     return 'ok';
// });

// Broadcast::channel('user.{toUserId}', function ($user, $toUserId) {
//     return $user->id == $toUserId;
// });