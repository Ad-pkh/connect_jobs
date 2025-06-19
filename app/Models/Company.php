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
    'link'

  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function careers(): HasMany
  {
    return $this->hasMany(Career::class);
  }
}
