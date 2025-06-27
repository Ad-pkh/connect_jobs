<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
  protected $table = 'company';
  protected $fillable = [
    'name',
    'description',
    'location',
    'contact',
    'link',
    'recruiter_id'

  ];

  public function recruiter(): BelongsTo
  {
    return $this->belongsTo(User::class, 'recruiter_id');
  }


  public function careers(): HasMany
  {
    return $this->hasMany(Career::class);
  }
}
