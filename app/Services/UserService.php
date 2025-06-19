<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\Events\Registered;

class UserService
{

    public function create(array $data): User
    {
        $user= User::create($data);
        // event(new Registered($user));
        return $user;
    }


    public function update(int $id, array $data): User
    {
        $user = user::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function findbyId(string $id){
        $user = user::findOrFail($id);
        return $user;
    }
    public function delete(string $id): void
    {
        User::destroy($id);
    }
}
