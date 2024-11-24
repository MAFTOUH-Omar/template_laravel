<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission_role extends Model
{
    protected $table = "permission_role";
    protected $fillable = [
        "role_id",
        "permission_id",
    ];

    public function role(): BelongsTo 
    {
        return $this->belongsTo(Role::class);
    }

    public function permission(): BelongsTo 
    {
        return $this->belongsTo(Permissions::class);
    }
}
