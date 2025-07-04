import { roleGuard } from '@/http/middleware/roleGuard'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { CreateUserCardController } from './create-user-card-controller'
import { createUserCardManyController } from './create-user-card-many-controller'
import { DeleteUserCardController } from './delete-user-card-controller'
import { deleteUserCardManyController } from './delete-user-card-many-controller'
import { FetchUserCardsController } from './fetch-user-cards-controller'
import { GetUserCardController } from './get-user-card-controller'
import { ListUserCardsController } from './list-user-cards-controller'
import { UpdateUserCardController } from './update-user-card-controller'

// Importação dos schemas gerados pela lib zod-prisma
import {
  UserCardCreateManyInputSchema,
  UserCardSchema,
  UserCardUpdateManyMutationInputSchema
} from '@/schemas/zod'

export async function userCardRoutes(fastify: FastifyInstance) {
  // Rota para criar um novo userCard
  fastify.post('/', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: CreateUserCardController,
    schema: {
      tags: ['UserCards'],
      description: 'Create a new userCard',
      body: UserCardCreateManyInputSchema,
      response: {
        201: UserCardSchema,
        400: z.object({
          message: z.string(),
          errors: z.any().optional(),
        }),
      },
    },
  })

  // Rota para criar múltiplos userCards (Many-to-Many)
  fastify.post('/many', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: createUserCardManyController,
    schema: {
      tags: ['UserCards'],
      description: 'Create multiple userCards for a user',
      body: z.object({
        userId: z.number(),
        cardData: z.array(z.object({
          cardId: z.number(),
        })),
      }),
      response: {
        201: z.object({
          count: z.number(),
        }),
        409: z.object({
          message: z.string(),
        }),
      },
    },
  })

  // Rota para deletar múltiplos userCards por userId (Many-to-Many)
  fastify.delete('/many', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: deleteUserCardManyController,
    schema: {
      tags: ['UserCards'],
      description: 'Delete multiple userCards by userId',
      body: z.object({
        userId: z.number(),
        cardIds: z.array(z.number()).optional(),
      }),
      response: {
        200: z.object({
          count: z.number(),
        }),
        400: z.object({
          message: z.string(),
        }),
      },
    },
  })

  // Rota para atualizar um userCard existente
  fastify.put('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: UpdateUserCardController,
    schema: {
      tags: ['UserCards'],
      description: 'Update an existing userCard',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      body: UserCardUpdateManyMutationInputSchema,
      response: {
        200: UserCardSchema,
        400: z.object({
          message: z.string(),
          errors: z.any().optional(),
        }),
      },
    },
  })

  // Rota para listar todos os userCards
  fastify.get('/', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: ListUserCardsController,
    schema: {
      tags: ['UserCards'],
      description: 'List all userCards',
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
        200: z.array(UserCardSchema),
      },
    },
  })

  // Rota para busca paginada de userCards
  fastify.get('/fetch', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: FetchUserCardsController,
    schema: {
      tags: ['UserCards'],
      description: 'Fetch userCards with pagination',
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
          data: z.array(UserCardSchema),
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

  // Rota para obter um único userCard por ID
  fastify.get('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: GetUserCardController,
    schema: {
      tags: ['UserCards'],
      description: 'Get a userCard by ID',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      response: {
        200: UserCardSchema,
        404: z.object({
          message: z.string(),
        }),
      },
    },
  })

  // Rota para excluir um userCard por ID
  fastify.delete('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: DeleteUserCardController,
    schema: {
      tags: ['UserCards'],
      description: 'Delete a userCard by ID',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      response: {
        204: z.null(),
      },

    },
  })
}
