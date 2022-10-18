<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $arr = ["Batik Indonesia", "Sejarah Batik di Indonesia", "Hari Batik Nasional"];


        Article::create([
            "title" => "Hari Kartini",
            "isi" => "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, id. Cum quod vero mollitia magni, iure id hic quisquam commodi quaerat vel non iusto similique, repellendus inventore. Odit ex rerum facilis impedit excepturi eos quibusdam sunt. Fuga fugit consectetur nobis consequuntur facere odit! Pariatur temporibus, autem sint harum sunt a. Explicabo facilis asperiores minus velit neque cumque rem libero unde sed, repellat temporibus laudantium est eveniet recusandae omnis earum quam reiciendis, fugit porro ullam ut quidem expedita. Unde recusandae vero consequuntur facilis beatae libero accusamus quidem numquam? Id adipisci hic quisquam excepturi placeat voluptatem quidem voluptate autem repellat. Dolorem, iste!

            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, id. Cum quod vero mollitia magni, iure id hic quisquam commodi quaerat vel non iusto similique, repellendus inventore. Odit ex rerum facilis impedit excepturi eos quibusdam sunt. Fuga fugit consectetur nobis consequuntur facere odit! Pariatur temporibus, autem sint harum sunt a. Explicabo facilis asperiores minus velit neque cumque rem libero unde sed, repellat temporibus laudantium est eveniet recusandae omnis earum quam reiciendis, fugit porro ullam ut quidem expedita. Unde recusandae vero consequuntur facilis beatae libero accusamus quidem numquam? Id adipisci hic quisquam excepturi placeat voluptatem quidem voluptate autem repellat. Dolorem, iste!

            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, id. Cum quod vero mollitia magni, iure id hic quisquam commodi quaerat vel non iusto similique, repellendus inventore. Odit ex rerum facilis impedit excepturi eos quibusdam sunt. Fuga fugit consectetur nobis consequuntur facere odit! Pariatur temporibus, autem sint harum sunt a. Explicabo facilis asperiores minus velit neque cumque rem libero unde sed, repellat temporibus laudantium est eveniet recusandae omnis earum quam reiciendis, fugit porro ullam ut quidem expedita. Unde recusandae vero consequuntur facilis beatae libero accusamus quidem numquam? Id adipisci hic quisquam excepturi placeat voluptatem quidem voluptate autem repellat. Dolorem, iste!",
            "featured" => true
        ]);
        foreach ($arr as $value) {

            Article::create([
                "title" => $value,
                "isi" => "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, id. Cum quod vero mollitia magni, iure id hic quisquam commodi quaerat vel non iusto similique, repellendus inventore. Odit ex rerum facilis impedit excepturi eos quibusdam sunt. Fuga fugit consectetur nobis consequuntur facere odit! Pariatur temporibus, autem sint harum sunt a. Explicabo facilis asperiores minus velit neque cumque rem libero unde sed, repellat temporibus laudantium est eveniet recusandae omnis earum quam reiciendis, fugit porro ullam ut quidem expedita. Unde recusandae vero consequuntur facilis beatae libero accusamus quidem numquam? Id adipisci hic quisquam excepturi placeat voluptatem quidem voluptate autem repellat. Dolorem, iste!

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, id. Cum quod vero mollitia magni, iure id hic quisquam commodi quaerat vel non iusto similique, repellendus inventore. Odit ex rerum facilis impedit excepturi eos quibusdam sunt. Fuga fugit consectetur nobis consequuntur facere odit! Pariatur temporibus, autem sint harum sunt a. Explicabo facilis asperiores minus velit neque cumque rem libero unde sed, repellat temporibus laudantium est eveniet recusandae omnis earum quam reiciendis, fugit porro ullam ut quidem expedita. Unde recusandae vero consequuntur facilis beatae libero accusamus quidem numquam? Id adipisci hic quisquam excepturi placeat voluptatem quidem voluptate autem repellat. Dolorem, iste!

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, id. Cum quod vero mollitia magni, iure id hic quisquam commodi quaerat vel non iusto similique, repellendus inventore. Odit ex rerum facilis impedit excepturi eos quibusdam sunt. Fuga fugit consectetur nobis consequuntur facere odit! Pariatur temporibus, autem sint harum sunt a. Explicabo facilis asperiores minus velit neque cumque rem libero unde sed, repellat temporibus laudantium est eveniet recusandae omnis earum quam reiciendis, fugit porro ullam ut quidem expedita. Unde recusandae vero consequuntur facilis beatae libero accusamus quidem numquam? Id adipisci hic quisquam excepturi placeat voluptatem quidem voluptate autem repellat. Dolorem, iste!",
                "featured" => false
            ]);
        }
    }
}
