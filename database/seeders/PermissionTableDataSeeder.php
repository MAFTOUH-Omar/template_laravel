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
            [
                'id' => 1,
                'title' => 'product_create',
            ],
            [
                'id' => 2,
                'title' => 'product_edit',
            ],
            [
                'id' => 3,
                'title' => 'product_destroy',
            ],
        ]);
    }
}
