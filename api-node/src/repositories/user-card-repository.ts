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

export class UserCardRepository {
  private prismaArgs: Prisma.UserCardFindManyArgs = {}

  private createSearchConditions(
    term: string,
    fields: string[],
  ): Prisma.UserCardWhereInput[] {
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
            } as Prisma.UserCardWhereInput
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
            } as Prisma.UserCardWhereInput
          }
          return null
        }

        if (
          isNumeric &&
          ['id', 'codigo', 'quantidade', 'valor'].some((prefix) =>
            m.toLowerCase().includes(prefix.toLowerCase()),
          )
        ) {
          return { [m]: { equals: numericValue } } as Prisma.UserCardWhereInput
        } else {
          try {
            return {
              [m]: {
                contains: term,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            } as Prisma.UserCardWhereInput
          } catch (_e) {
            return null
          }
        }
      })
      .filter((condition): condition is Prisma.UserCardWhereInput => Boolean(condition))
  }

  async all(
    query: IQuery,
  ): Promise<IQueryResponse<Prisma.UserCardGetPayload<typeof this.prismaArgs>>> {
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
      db.userCard.count(predicate),
      db.userCard.findMany({
        ...predicate,
        orderBy: order ? { [order]: 'asc' } : {},
        select: this.prismaArgs.select,
      }),
    ])

    return { data, rowCount }
  }

  async fetch(
    query: IQuery,
  ): Promise<IFetchResponse<Prisma.UserCardGetPayload<typeof this.prismaArgs>>> {
    const {
      fields = [],
      term = null,
      order = null,
      page = 1,
      pageSize = 20,
      itens = [],
    } = query

    let predicate: Prisma.UserCardFindManyArgs = { where: {} }

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
      db.userCard.count({
        where: predicate.where,
      }),
      db.userCard.findMany({
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

  async one(params: IReqParams): Promise<Prisma.UserCardGetPayload<typeof this.prismaArgs>> {
    const { id } = params
    const data = await db.userCard.findUnique({
      where: { id: Number(id) },
      select: this.prismaArgs.select,
    })
    if (!data) throw new Error('Registro não localizado.')
    return data
  }

  async post(body: Prisma.UserCardCreateInput): Promise<Prisma.UserCardGetPayload<typeof this.prismaArgs>> {
    if ('id' in body) delete body.id

    const data = await db.userCard.create({
      data: { ...body },
      select: this.prismaArgs.select,
    })

    return data
  }

  async put(params: IReqParams, body: Prisma.UserCardUpdateInput): Promise<Prisma.UserCardGetPayload<typeof this.prismaArgs>> {
    const { id } = params
    if ('id' in body) delete body.id
    const data = await db.userCard.update({
      data: { ...body },
      where: { id: Number(id) },
      select: this.prismaArgs.select,
    })
    return data
  }

  async del(params: IReqParams): Promise<void> {
    const { id } = params
    await db.userCard.delete({
      where: { id: Number(id) },
    })
  }

  async createMany(
    userId: number,
    cardData: { cardId: number }[],
  ): Promise<{ count: number }> {
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new Error('User não encontrado.')
    }

    const uniqueCardData = cardData.reduce((acc, current) => {
      const exists = acc.find(item => item.cardId === current.cardId)
      if (!exists) {
        acc.push(current)
      }
      return acc
    }, [] as { cardId: number }[])

    const data = uniqueCardData.map((card) => ({
      userId: userId,
      cardId: card.cardId,
    }))

    console.log('data', JSON.stringify(data, null, 2))

    const result = await db.userCard.createMany({
      data,
      skipDuplicates: true,
    })

    return { count: result.count }
  }

  async deleteManyByUserId(
    userId: number,
    cardIds?: number[],
  ): Promise<{ count: number }> {
    const where: Prisma.UserCardWhereInput = {
      userId: userId,
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new Error('User não encontrado.')
    }

    if (cardIds && cardIds.length > 0) {
      where.cardId = {
        in: cardIds,
      }
    }

    const result = await db.userCard.deleteMany({ where })

    return { count: result.count }
  }
}