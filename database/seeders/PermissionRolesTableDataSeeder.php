<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionRolesTableDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("permission_role")->insert([
            // Admin
            [
                "role_id" => 1 ,
                "permission_id" => 1,
            ],
            [
                "role_id" => 1 ,
                "permission_id" => 2,
            ],
            [
                "role_id" => 1 ,
                "permission_id" => 3,
            ],
            # User
            [
                "role_id" => 2 ,
                "permission_id" => 1,
            ],
            [
                "role_id" => 2 ,
                "permission_id" => 2,
            ],
        ]);
    }
}
