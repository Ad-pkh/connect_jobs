<?php

namespace App\Providers;

use App\Models\Career;
use App\Models\CareerApplication;
use App\Models\User;
use App\Policies\CareerApplicationPolicy;
use App\Policies\CareerPolicy;
use App\Policies\RecruiterStatus;
use App\Policies\RecruiterStatusPolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Career::class => CareerPolicy::class,
        CareerApplication::class => CareerApplicationPolicy::class,
        User::class=>UserPolicy::class

    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

        Passport::tokensExpireIn(now()->addDays(2));
        ResetPassword::createUrlUsing(function ($notifiable, string $token) {
            return config('app.frontend_url') . '/reset-password?token=' . $token . '&email=' . urlencode($notifiable->email);
        });
    }
}
