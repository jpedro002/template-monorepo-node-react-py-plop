import { db } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

export interface IQuery {
  term?: string
  fields?: string[]
  order?: string
  page?: number
  pageSize?: number
  itens?: number[]
}

export interface IQueryResponse<T> {
  data: T[]
  rowCount: number
}

export interface IFetchResponse<T> {
  data: T[]
  pagination: {
    page: number
    rowCount: number
    pageCount: number
    pageSize: number
  }
}

export interface IReqParams {
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
  id: any
}

export class CardRepository {
  private prismaArgs: Prisma.CardFindManyArgs = {}

  private createSearchConditions(
    term: string,
    fields: string[],
  ): Prisma.CardWhereInput[] {
    const isNumeric = !isNaN(Number(term)) && term !== ''
    const numericValue = isNumeric ? Number(term) : null

    return fields
      .map((m) => {
        if (m.includes('.')) {
          const parts = m.split('.')

          if (parts.length === 2) {
            const [field1, field2] = parts
            return {
              [field1]: {
                [field2]: { 
                  contains: term, 
                  mode: 'insensitive' as Prisma.QueryMode 
                },
              },
            } as Prisma.CardWhereInput
          } else if (parts.length === 3) {
            const [field1, field2, field3] = parts
            return {
              [field1]: {
                [field2]: {
                  [field3]: { 
                    contains: term, 
                    mode: 'insensitive' as Prisma.QueryMode 
                  },
                },
              },
            } as Prisma.CardWhereInput
          }
          return null
        }

        if (
          isNumeric &&
          ['id', 'codigo', 'quantidade', 'valor'].some((prefix) =>
            m.toLowerCase().includes(prefix.toLowerCase()),
          )
        ) {
          return { [m]: { equals: numericValue } } as Prisma.CardWhereInput
        } else {
          try {
            return {
              [m]: {
                contains: term,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            } as Prisma.CardWhereInput
          } catch (_e) {
            return null
          }
        }
      })
      .filter((condition): condition is Prisma.CardWhereInput => Boolean(condition))
  }

  async all(
    query: IQuery,
  ): Promise<IQueryResponse<Prisma.CardGetPayload<typeof this.prismaArgs>>> {
    const { fields = [], term = null, order = null } = query

    let predicate = { where: {} }

    if (term && fields && Array.isArray(fields)) {
      const validConditions = this.createSearchConditions(term, fields)

      if (validConditions.length > 0) {
        predicate = {
          where: {
            OR: validConditions,
          },
        }
      }
    }

    const [rowCount, data] = await db.$transaction([
      db.card.count(predicate),
      db.card.findMany({
        ...predicate,
        orderBy: order ? { [order]: 'asc' } : {},
        select: this.prismaArgs.select,
      }),
    ])

    return { data, rowCount }
  }

  async fetch(
    query: IQuery,
  ): Promise<IFetchResponse<Prisma.CardGetPayload<typeof this.prismaArgs>>> {
    const {
      fields = [],
      term = null,
      order = null,
      page = 1,
      pageSize = 20,
      itens = [],
    } = query

    let predicate: Prisma.CardFindManyArgs = { where: {} }

    if (Array.isArray(itens) && itens.length > 0) {
      if (!predicate.where) predicate.where = {}
      predicate.where.id = { in: itens.map(Number) }
    }
    
    if (term && fields && Array.isArray(fields)) {
      const validConditions = this.createSearchConditions(term, fields)

      if (validConditions.length > 0) {
        predicate = {
          where: {
            OR: validConditions,
          },
        }
      }
    }

    const [rowCount, data] = await db.$transaction([
      db.card.count({
        where: predicate.where,
      }),
      db.card.findMany({
        where: predicate.where,
        take: Number(pageSize),
        skip: (Number(page) - 1) * Number(pageSize),
        orderBy: order ? { [order]: 'asc' } : { id: 'desc' },
        select: this.prismaArgs.select,
      }),
    ])

    return {
      data,
      pagination: {
        page: Number(page),
        rowCount,
        pageCount: Math.ceil(rowCount / pageSize) || 1,
        pageSize: Number(pageSize),
      },
    }
  }

  async one(params: IReqParams): Promise<Prisma.CardGetPayload<typeof this.prismaArgs>> {
    const { id } = params
    const data = await db.card.findUnique({
      where: { id: Number(id) },
      select: this.prismaArgs.select,
    })
    if (!data) throw new Error('Registro não localizado.')
    return data
  }

  async post(body: Prisma.CardCreateInput): Promise<Prisma.CardGetPayload<typeof this.prismaArgs>> {
    if ('id' in body) delete body.id

    const data = await db.card.create({
      data: { ...body },
      select: this.prismaArgs.select,
    })

    return data
  }

  async put(params: IReqParams, body: Prisma.CardUpdateInput): Promise<Prisma.CardGetPayload<typeof this.prismaArgs>> {
    const { id } = params
    if ('id' in body) delete body.id
    const data = await db.card.update({
      data: { ...body },
      where: { id: Number(id) },
      select: this.prismaArgs.select,
    })
    return data
  }

  async del(params: IReqParams): Promise<void> {
    const { id } = params
    await db.card.delete({
      where: { id: Number(id) },
    })
  }

}