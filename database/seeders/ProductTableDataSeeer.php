<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTableDataSeeer extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                "name" => "IOS 11 PRO MAX" ,
                "description" => "IPHONE LATEST VERSION USA" ,
                "price" => 1000.2 ,
                "cat_id" => 2 ,
            ] ,
            [
                "name" => "SAMSUNG NOTE 10" ,
                "description" => "SAMSUNG LATEST VERSION USA" ,
                "price" => 800 ,
                "cat_id" => 2 ,
            ] ,
            [
                "name" => "KIPSTA 500" ,
                "description" => "BALON PRO" ,
                "price" => 15.8 ,
                "cat_id" => 4 ,
            ] ,
            [
                "name" => "SKINY FEET" ,
                "description" => "JEAN" ,
                "price" => 10 ,
                "cat_id" => 3 ,
            ]
        ]);
    }
}
