<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CareerApplication extends Model
{
    protected $table = "career_application";
    protected $fillable = [
        'user_id',
        'career_id',
        'status',
        'resume',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }
}
