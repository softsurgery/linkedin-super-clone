import { PrismaClient } from "@prisma/client";

import { IQueryObject } from "../interfaces/query-params";
import {
  parseFilters,
  parseJoin,
  parseSelect,
  parseSort,
} from "../utilities/query-params-transpiler";
import { Paginated } from "../interfaces/pagination";

export class BaseRepository<T extends Record<string, any>> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(model: any, prisma: PrismaClient) {
    this.model = model;
    this.prisma = prisma;
  }

  async findPaginated(queryObject: IQueryObject): Promise<Paginated<T>> {
    const { filter, sort, size = "10", page = "1", fields, join } = queryObject;

    const where = parseFilters(filter);
    const orderBy = parseSort(sort);
    const take = parseInt(size, 10);
    const skip = (parseInt(page, 10) - 1) * take;
    const select = parseSelect(fields);
    const include = parseJoin(join);

    const [data, itemCount] = await Promise.all([
      this.model.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
        include,
      }),
      this.model.count({ where }),
    ]);

    const parsedPage = parseInt(page) || 0;

    return {
      data,
      meta: {
        itemCount,
        page: parsedPage,
        take,
        hasPreviousPage: parsedPage > 1,
        hasNextPage: itemCount > take * parsedPage,
        pageCount: Math.ceil(itemCount / take),
      },
    };
  }

  async findAll() {
    return this.model.findMany();
  }

  async findByCondition(queryObject: IQueryObject): Promise<T[]> {
    const { filter, sort, fields, join } = queryObject;

    const where = parseFilters(filter);
    const orderBy = parseSort(sort);
    const select = parseSelect(fields);
    const include = parseJoin(join);

    return this.model.findMany({
      where,
      orderBy,
      select,
      include,
    });
  }

  async findOneByCondition(
    queryObject: IQueryObject
  ): Promise<T | null> {
    const models = await this.findByCondition(queryObject);
    return models.length > 0 ? models[0] : null;
  }

  async findById(id: number | string) {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: Partial<T>) {
    try {

      const user = await this.model.create({ data });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create record");
    }
  }

  async createMany(data: Partial<T>[]): Promise<T[]> {
    return this.model.createMany({ data });
  }

  async update(id: number | string, data: Partial<T>) {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async updateAssociations<U extends { id?: number | string }>({
    existingItems,
    updatedItems,
    keys,
    onDelete,
    onCreate,
  }: {
    existingItems: U[];
    updatedItems: U[];
    keys: [keyof U, keyof U];
    onCreate: (item: U) => Promise<any>;
    onDelete: (id: number | string) => Promise<any>;
  }): Promise<{
    keptItems: U[];
    newItems: U[];
    eliminatedItems: any[];
  }> {
    const newItems: U[] = [];
    const keptItems: U[] = [];
    const eliminatedItems: any[] = [];

    const [key1, key2] = keys;

    const isSameCombination = (a: U, b: U) =>
      a[key1] === b[key1] && a[key2] === b[key2];

    for (const existingItem of existingItems) {
      const existsInUpdate = updatedItems.some((updatedItem) =>
        isSameCombination(updatedItem, existingItem)
      );
      if (!existsInUpdate) {
        eliminatedItems.push(await onDelete(existingItem.id!));
      } else {
        // Otherwise, keep the item
        keptItems.push(existingItem);
      }
    }

    for (const updatedItem of updatedItems) {
      const existsInExisting = existingItems.some((existingItem) =>
        isSameCombination(updatedItem, existingItem)
      );
      if (!existsInExisting) {
        newItems.push(await onCreate(updatedItem));
      }
    }

    return {
      keptItems,
      newItems,
      eliminatedItems,
    };
  }

  async delete(id: number | string) {
    return this.model.delete({
      where: { id },
    });
  }

  async count(where: any = {}) {
    return this.model.count({ where });
  }
}
