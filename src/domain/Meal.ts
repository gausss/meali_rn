export class Meal {
  id: string;
  name: string;
  ingredients: Ingredient[];
  complexity?: Complexity;

  constructor(
    name: string,
    ingredients: Ingredient[],
    complexity?: Complexity,
  ) {
    this.id = IdGenerator.generate();
    this.name = name;
    this.ingredients = ingredients;
    this.complexity = complexity;
  }
}

export type Complexity = 'EASY' | 'HARD';

export interface Ingredient {
  name: string;
  count: number;
  unit: Unit;
}

export type Unit = 'GRM' | 'ML' | 'UNIT';

class IdGenerator {
  private static readonly base =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

  static generate(): string {
    return Array.from(Array(16).keys()).reduce(
      acc => acc + this.getCharacter(this.getRandomInt()),
      '',
    );
  }

  private static getCharacter(index: number): string | undefined {
    return this.base[index];
  }

  private static getRandomInt(min = 0, max = 64): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
