<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleTableDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("roles")->insert([
            [
                "id" => 1 ,
                "name" => "Admin" ,
                "description" => "Admin of panel",
            ],
            [
                "id" => 2 ,
                "name" => "Moderator" ,
                "description" => "Moderator of panel",
            ],
        ]);
    }
}
