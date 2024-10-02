import { Entity, PrimaryKey, Property, Opt } from '@mikro-orm/core';

@Entity()
export class Pair {

  @PrimaryKey()
  name!: string;

  @Property()
  createdAt?: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();

  @Property()
  base!: string;

  @Property()
  quote!: string;

  @Property()
  price?: number;

  constructor(pair: Pair) {
    Object.assign(this, pair);
  }

}