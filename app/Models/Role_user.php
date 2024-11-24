<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Role_user extends Model
{
    protected $table = "role_user";
    protected $fillable = [
        "role_id" , 
        "user_id"
    ];

    public function user() :BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}
