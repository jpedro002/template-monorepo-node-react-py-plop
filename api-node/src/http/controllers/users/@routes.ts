import { FastifyInstance } from 'fastify'

import { roleGuard } from '@/http/middleware/roleGuard'
import { Role } from '@prisma/client'
import { z } from 'zod'
import { CreateUserController } from './create-user-controller'
import { deleteUserController } from './delete-user-controller'
import { ListUsersController } from './list-users-controller'
import { resetPasswordController } from './reset-password-controller'
import { seftUpdateEmailAndNameController } from './seft-update-email-and-name-controller'
import { updatePasswordController } from './update-password-controller'
import { updateUserController } from './update-user-controller'

export async function userRoutes(fastify: FastifyInstance) {
	fastify.post('', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: CreateUserController,
		schema: {
			tags: ['Users'],
			description: 'Create a new user',
			body: z.object({
				name: z.string().min(1),
				email: z.string().email(),
				password: z.string().min(6),
				role: z.nativeEnum(Role),
			}),
			// response: {
			// 	201: z.object({
			// 		name: z.string(),
			// 		email: z.string().email().nullable(),
			// 		password: z.string().nullable(),
			// 		role: z.nativeEnum(Role),
			// 		picture: z.string().nullable(),
			// 		id: z.number(),
			// 		createdAt: z.date(),
			// 	}),
			// 	409: z.object({
			// 		message: z.string(),
			// 	}),
			// },
		},
	})

	fastify.get('/', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: ListUsersController,
		schema: {
			tags: ['Users'],
			description: 'Get users',
			params: z.object({
				status: z.nativeEnum(Role).optional(),
				customerName: z.string().optional(),
			}),
			response: {
				200: z.array(
					z.object({
						name: z.string(),
						email: z.string().email().nullable(),
						role: z.nativeEnum(Role),
						id: z.number(),
					}),
				),
			},
		},
	})

	fastify.delete('/:id', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: deleteUserController,
		schema: {
			tags: ['Users'],
			description: 'Delete a user by ID',
			params: z.object({
				id: z.string().transform((val) => parseInt(val)),
			}),
			response: {
				204: z.null(),
				404: z.object({
					message: z.string(),
				}),
			},
		},
	})

	fastify.put('/:id', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: updateUserController,
		schema: {
			tags: ['Users'],
			description: 'Update user information by ID',
			params: z.object({
				id: z.string().transform((val) => parseInt(val)),
			}),
			body: z.object({
				name: z.string().min(1).optional(),
				email: z.string().email().optional(),
				role: z.nativeEnum(Role).optional(),
			}),
			response: {
				200: z.object({
					id: z.number(),
					name: z.string(),
					email: z.string().email(),
					role: z.nativeEnum(Role),
				}),
				404: z.object({
					message: z.string(),
				}),
				400: z.object({
					message: z.string(),
					errors: z.any().optional(),
				}),
			},
		},
	})

	fastify.patch('/resetPassword/:id', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: resetPasswordController,
		schema: {
			tags: ['Users'],
			description: 'Reset user password by ID',
			params: z.object({
				id: z.string().transform((val) => parseInt(val)),
			}),
			response: {
				200: z.object({
					message: z.string(),
				}),
				404: z.object({
					message: z.string(),
				}),
			},
		},
	})

	fastify.put('/me/email-and-name', {
		preValidation: [fastify.authenticate],
		handler: seftUpdateEmailAndNameController,
		schema: {
			tags: ['Users'],
			description: 'Update current user email and name',
			body: z.object({
				name: z.string().min(1).optional(),
				email: z.string().email().optional(),
			}),
			response: {
				200: z.object({
					name: z.string(),
					email: z.string().email(),
					id: z.number(),
				}),
				400: z.object({
					message: z.string(),
					errors: z.any().optional(),
				}),
			},
		},
	})

	fastify.put('/me/password', {
		preValidation: [fastify.authenticate],
		handler: updatePasswordController,
		schema: {
			tags: ['Users'],
			description: 'Update current user password',
			body: z.object({
				currentPassword: z.string().min(6),
				newPassword: z.string().min(6),
			}),
			response: {
				200: z.object({
					message: z.string(),
				}),
				400: z.object({
					message: z.string(),
					errors: z.any().optional(),
				}),
				401: z.object({
					message: z.string(),
				}),
			},
		},
	})
}
