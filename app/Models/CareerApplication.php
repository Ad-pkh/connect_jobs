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

    /**
     * The applicant (job seeker).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The job/career being applied to.
     */
    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }
}
