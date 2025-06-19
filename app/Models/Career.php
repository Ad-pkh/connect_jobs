<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Career extends Model
{
  protected $table = 'careers';
  protected $fillable = [
    'title',
    'description',
    'location',
    'salary',
    'role',
    'worktype',
    'status',
    'created_by'
  ];


  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }

  public function company(): BelongsTo
  {
    return $this->belongsTo(Company::class);
  }
  public function applications(): HasMany
{
    return $this->hasMany(CareerApplication::class);
}

}
