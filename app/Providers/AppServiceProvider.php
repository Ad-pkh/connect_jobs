<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate ;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //permissionn = create when role is recruiter
        // Gate ::define('create', function (User $user, Post $post) {
        // return $user->id === $post->user_id;
    // });
    }
}
