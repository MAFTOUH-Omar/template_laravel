<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryTableDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                "id" => 1 ,
                "name" => "cat_migartion" ,
                "slug" => "CTM"
            ],
            [
                "id" => 2 ,
                "name" => "cat_electro" ,
                "slug" => "CEL"
            ],
            [
                "id" => 3 ,
                "name" => "cat_vetement" ,
                "slug" => "CVT"
            ],
            [
                "id" => 4 ,
                "name" => "cat_sport" ,
                "slug" => "CSP"
            ],
        ]);
    }
}
