import { Prisma } from '@prisma/client'
import { db } from '/app/src/libs/prisma'

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
	pagination?: {
		page: number
		rowCount: number
		pageCount: number
	}
}

export interface IReqParams {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	id: any
}

export class BaseRepository {
	private prismaArgs: Prisma.UserFindManyArgs = {}

	async all(query: IQuery) {
		const { fields = [], term = null, order = null } = query

		let predicate = { where: {} }

		if (term && fields && Array.isArray(fields)) {
			const isNumeric = !isNaN(Number(term)) && term !== ''
			const numericValue = isNumeric ? Number(term) : null

			const validConditions = fields
				.map((m) => {
					if (m.includes('.')) {
						const parts = m.split('.')

						if (parts.length === 2) {
							const [field1, field2] = parts
							return {
								[field1]: {
									[field2]: { contains: term, mode: 'insensitive' },
								},
							}
						} else if (parts.length === 3) {
							const [field1, field2, field3] = parts
							return {
								[field1]: {
									[field2]: {
										[field3]: { contains: term, mode: 'insensitive' },
									},
								},
							}
						}
						return null
					}

					if (isNumeric && ['id'].includes(m)) {
						return { [m]: { equals: numericValue } }
					} else {
						try {
							return { [m]: { contains: term, mode: 'insensitive' } }
						} catch (_e) {
							return null
						}
					}
				})
				.filter(Boolean)

			if (validConditions.length > 0) {
				predicate = {
					where: {
						OR: validConditions,
					},
				}
			}
		}

		const [rowCount, data] = await db.$transaction([
			db.user.count(predicate),
			db.user.findMany({
				...predicate,
				orderBy: order ? { [order]: 'asc' } : {},
				select: this.prismaArgs.select,

				include: this.prismaArgs.include,
			}),
		])

		return { data, rowCount }
	}

	async fetch(query: IQuery) {
		const {
			fields = [],
			term = null,
			order = null,
			page = 1,
			pageSize = 20,
			itens = [],
		} = query

		let predicate: Prisma.UserFindManyArgs = { where: {} }

		// Adiciona filtro de itens, se existir
		if (Array.isArray(itens) && itens.length > 0) {
			if (!predicate.where) predicate.where = {}
			predicate.where.id = { in: itens.map(Number) }
		}
		// Adiciona filtro de busca por termo
		if (term && fields && Array.isArray(fields)) {
			const isNumeric = !isNaN(Number(term)) && term !== ''
			const numericValue = isNumeric ? Number(term) : null

			const validConditions = fields
				.map((m) => {
					if (m.includes('.')) {
						const parts = m.split('.')

						if (parts.length === 2) {
							const [field1, field2] = parts
							return {
								[field1]: {
									[field2]: { contains: term, mode: 'insensitive' },
								},
							}
						} else if (parts.length === 3) {
							const [field1, field2, field3] = parts
							return {
								[field1]: {
									[field2]: {
										[field3]: { contains: term, mode: 'insensitive' },
									},
								},
							}
						}
						return null
					}

					if (
						isNumeric &&
						['codigo', 'quantidade', 'valor'].some((prefix) =>
							m.toLowerCase().includes(prefix.toLowerCase()),
						)
					) {
						return { [m]: { equals: numericValue } }
					} else {
						try {
							return { [m]: { contains: term, mode: 'insensitive' } }
						} catch (_e) {
							return null
						}
					}
				})
				.filter(Boolean)

			if (validConditions.length > 0) {
				predicate = {
					where: {
						OR: validConditions,
					},
				}
			}
		}

		const [rowCount, data] = await db.$transaction([
			db.user.count({
				take: Number(pageSize),
				skip: (Number(page) - 1) * Number(pageSize),
				orderBy: order ? { [order]: 'asc' } : { id: 'desc' },
				where: predicate.where,
			}),
			db.user.findMany({
				where: predicate.where,
				take: Number(pageSize),
				skip: (Number(page) - 1) * Number(pageSize),
				orderBy: order ? { [order]: 'asc' } : { id: 'desc' },
				select: this.prismaArgs.select,
				include: this.prismaArgs.include,
			}),
		])

		return {
			data,
			pagination: {
				page: Number(page),
				rowCount,
				pageCount: Math.ceil(rowCount / pageSize) || 1,
			},
		}
	}

	async one(params: IReqParams) {
		const { id } = params
		const data = await db.user.findUnique({
			where: { id: Number(id) },
			select: this.prismaArgs.select,
			include: this.prismaArgs.include,
		})
		if (!data) throw new Error('Registro não localizado.')
		return data
	}

	async post(body: Prisma.UserCreateInput) {
		if ('id' in body) delete body.id

		const data = await db.user.create({
			data: { ...body },
			select: this.prismaArgs.select,
			include: this.prismaArgs.include,
		})

		return data
	}

	async put(params: IReqParams, body: Prisma.UserUpdateInput) {
		const { id } = params
		if ('id' in body) delete body.id
		const data = await db.user.update({
			data: { ...body },
			where: { id: Number(id) },
			select: this.prismaArgs.select,
			include: this.prismaArgs.include,
		})
		return data
	}

	async del(params: IReqParams) {
		const { id } = params
		await db.user.delete({
			where: { id: Number(id) },
		})
	}
}
