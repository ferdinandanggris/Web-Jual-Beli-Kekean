<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            ArticleSeeder::class
        ]);
        // User::create([
        //     'first_name' => 'admin',
        //     'last_name'  => 'admin',
        //     'number_phone' => '082131955087',
        //     'email'      => 'admin@gmail.com',
        //     'address'    => 'Jalan Sekar gayam',
        //     'password'   => bcrypt('admin'),
        //     'role_as'    => 1,
        // ]);
    }
}
