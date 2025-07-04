import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { roleGuard } from '@/http/middleware/roleGuard'

import { CreateCardController } from './create-card-controller'
import { UpdateCardController } from './update-card-controller'
import { ListCardsController } from './list-cards-controller'
import { FetchCardsController } from './fetch-cards-controller'
import { GetCardController } from './get-card-controller'
import { DeleteCardController } from './delete-card-controller'

// Importação dos schemas gerados pela lib zod-prisma
import { 
  CardCreateManyInputSchema,
  CardUpdateManyMutationInputSchema,
  CardSchema
} from '@/schemas/zod'

export async function cardRoutes(fastify: FastifyInstance) {
  // Rota para criar um novo card
  fastify.post('/', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: CreateCardController,
    schema: {
      tags: ['Cards'],
      description: 'Create a new card',
      body: CardCreateManyInputSchema,
      response: {
        201: CardSchema,
        400: z.object({
          message: z.string(),
          errors: z.any().optional(),
        }),
      },
    },
  })

  // Rota para atualizar um card existente
  fastify.put('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: UpdateCardController,
    schema: {
      tags: ['Cards'],
      description: 'Update an existing card',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      body: CardUpdateManyMutationInputSchema,
      response: {
        200: CardSchema,
        400: z.object({
          message: z.string(),
          errors: z.any().optional(),
        }),
      },
    },
  })

  // Rota para listar todos os cards
  fastify.get('/', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: ListCardsController,
    schema: {
      tags: ['Cards'],
      description: 'List all cards',
      querystring: z.object({
        term: z.string().optional(),
        fields: z
          .union([z.array(z.string()), z.string(), z.undefined()])
          .optional()
          .transform((val) => {
            console.log('val ' + Math.random(), val)

            if (Array.isArray(val)) return val
            if (typeof val === 'string') return [val]
            return []
          }),
        order: z.string().optional(),
      }),
      response: {
        200: z.array(CardSchema),
      },
    },
  })

  // Rota para busca paginada de cards
  fastify.get('/fetch', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: FetchCardsController,
    schema: {
      tags: ['Cards'],
      description: 'Fetch cards with pagination',
      querystring: z.object({
        term: z.string().optional(),
        fields: z
          .union([z.array(z.string()), z.string(), z.undefined()])
          .optional()
          .transform((val) => {
            console.log('val ' + Math.random(), val)

            if (Array.isArray(val)) return val
            if (typeof val === 'string') return [val]
            return []
          }),
        order: z.string().optional(),
        page: z.coerce.number().positive().optional().default(1),
        pageSize: z.coerce.number().positive().optional().default(20),
        itens: z.string().optional(),
      }),
      response: {
        200: z.object({
          data: z.array(CardSchema),
          pagination: z.object({
            page: z.number(),
            rowCount: z.number(),
            pageCount: z.number(),
            pageSize: z.number(),
          }),
        }),
      },
    },
  })

  // Rota para obter um único card por ID
  fastify.get('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: GetCardController,
    schema: {
      tags: ['Cards'],
      description: 'Get a card by ID',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      response: {
        200: CardSchema,
        404: z.object({
          message: z.string(),
        }),
      },
    },
  })

  // Rota para excluir um card por ID
  fastify.delete('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: DeleteCardController,
    schema: {
      tags: ['Cards'],
      description: 'Delete a card by ID',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      response: {
        204: z.null(),
      },
    },
  })
}