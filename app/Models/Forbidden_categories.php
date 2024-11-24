<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Forbidden_categories extends Model
{
    protected $table = "forbidden_categories" ;
    protected $fillable = [
        "user_id",
        "category_id",
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Categories::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
