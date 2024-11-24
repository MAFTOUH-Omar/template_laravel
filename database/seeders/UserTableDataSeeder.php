<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserTableDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                "id" => 1 ,
                "fullname" => "MAFTOUH OMAR" ,
                "email" => "omar.maftouh@gmail.com" ,
                "password" => Hash::make("Mft2610$$")
            ],
            [
                "id" => 2 ,
                "fullname" => "OLIVER MARTIN" ,
                "email" => "olivermartin@gmail.com" ,
                "password" => Hash::make("Mft2610$$")
            ]
        ]);
    }
}
