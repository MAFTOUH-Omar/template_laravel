<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleUserTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('role_users')->insert([
            [
                "role_id" => 1 ,
                "user_id" => 1
            ],
            [
                "role_id" => 2 ,
                "user_id" => 2
            ]
        ]);
    }
}
