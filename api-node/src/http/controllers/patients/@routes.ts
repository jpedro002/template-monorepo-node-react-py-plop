import { roleGuard } from '@/http/middleware/roleGuard'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { CreatePatientController } from './create-patient-controller'
import { DeletePatientController } from './delete-patient-controller'
import { FetchPatientsController } from './fetch-patients-controller'
import { GetPatientController } from './get-patient-controller'
import { ListPatientsController } from './list-patients-controller'
import { UpdatePatientController } from './update-patient-controller'

// Importação dos schemas gerados pela lib zod-prisma
import {
  PatientCreateManyInputSchema,
  PatientSchema,
  PatientUpdateManyMutationInputSchema
} from '@/schemas/zod'

export async function patientRoutes(fastify: FastifyInstance) {
  // Rota para criar um novo patient
  fastify.post('/', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: CreatePatientController,
    schema: {
      tags: ['Patients'],
      description: 'Create a new patient',
      body: PatientCreateManyInputSchema,
      response: {
        201: PatientSchema,
        400: z.object({
          message: z.string(),
          errors: z.any().optional(),
        }),
      },
    },
  })

  // Rota para atualizar um patient existente
  fastify.put('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: UpdatePatientController,
    schema: {
      tags: ['Patients'],
      description: 'Update an existing patient',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      body: PatientUpdateManyMutationInputSchema,
      response: {
        200: PatientSchema,
        400: z.object({
          message: z.string(),
          errors: z.any().optional(),
        }),
      },
    },
  })

  // Rota para listar todos os patients
  fastify.get('/', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: ListPatientsController,
    schema: {
      tags: ['Patients'],
      description: 'List all patients',
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
        200: z.array(PatientSchema),
      },
    },
  })

  // Rota para busca paginada de patients
  fastify.get('/fetch', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: FetchPatientsController,
    schema: {
      tags: ['Patients'],
      description: 'Fetch patients with pagination',
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
          data: z.array(PatientSchema),
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

  // Rota para obter um único patient por ID
  fastify.get('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: GetPatientController,
    schema: {
      tags: ['Patients'],
      description: 'Get a patient by ID',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      response: {
        200: PatientSchema,
        404: z.object({
          message: z.string(),
        }),
      },
    },
  })

  // Rota para excluir um patient por ID
  fastify.delete('/:id', {
    preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
    handler: DeletePatientController,
    schema: {
      tags: ['Patients'],
      description: 'Delete a patient by ID',
      params: z.object({
        id: z.string().transform(val => parseInt(val)),
      }),
      response: {
        204: z.null(),
      },
    },
  })
}