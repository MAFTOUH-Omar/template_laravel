<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserTableDataSeeder::class,
            CategoryTableDataSeeder::class,
            ProductTableDataSeeer::class,
            PermissionTableDataSeeder::class,
            RoleTableDataSeeder::class,
            PermissionRolesTableDataSeeder::class,
            RoleUserTableDataSeeder::class,
        ]);
    }
}
