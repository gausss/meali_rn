export class Meal {
  id: string;
  name: string;
  complexity?: Complexity;
  ingredients?: Ingredient[];

  constructor(name: string, complexity: Complexity) {
    this.id = IdGenerator.generate();
    this.name = name;
    this.complexity = complexity;
  }

  static copy(meal: Partial<Meal>): Partial<Meal> {
    return {
      ...meal,
      ingredients: meal?.ingredients?.map(ingredient => ({...ingredient}))
    };
  }
}

export interface Ingredient {
  count: number;
  unit: 'GRM' | 'ML' | 'UNIT';
  name: string;
}

export type Complexity = 'EASY' | 'HARD';

class IdGenerator {
  private static readonly base =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

  static generate(): string {
    return Array.from(Array(16).keys()).reduce(
      acc => acc + this.getCharacter(this.getRandomInt()),
      ''
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
