import { Migration } from '@mikro-orm/migrations';

export class Migration20240911225944 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "pair" ("name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "base" varchar(255) not null, "quote" varchar(255) not null, "price" int not null, constraint "pair_pkey" primary key ("name"));');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "pair" cascade;');
  }

}
