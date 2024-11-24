<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionTableDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('permissions')->insert([
            # Product section
            [
                "id" => 1,
                "name" => "page_produit" ,
                "description" => "page of products"
            ],
            [
                "id" => 2,
                "name" => "list_produit" ,
                "description" => "List of all products"
            ],
            [
                "id" => 3,
                "name" => "create_produit" ,
                "description" => "create a product"
            ],
            [
                "id" => 4,
                "name" => "delete_produit" ,
                "description" => "delete a product"
            ],
        ]);
    }
}
