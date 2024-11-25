<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Products extends Model
{
    protected $table = "products";
    protected $fillable = [
        "name",
        "description",
        "price",
        "cat_id"
    ];

    public function categories(): BelongsTo
    {
        return $this->belongsTo(Categories::class, 'cat_id');
    }
}
