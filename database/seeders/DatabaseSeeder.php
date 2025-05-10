<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Diksy M. Firmansyah',
            'email' => 'diksy@bikinin.id',
            'password' => Hash::make('xsecretx'),
        ]);
        User::factory(99)->create();
    }
}
