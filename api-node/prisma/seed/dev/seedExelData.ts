import { faker } from '@faker-js/faker'
import { PrismaClient, QuestionType } from '@prisma/client'
import { exit } from 'process'

const prisma = new PrismaClient()

const NURSEIDS = [
	2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
]

export const formAnswers = [
	// CASIMIRO VIEIRA DOS SANTOS - Prontuário: 601628
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 2, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// ALBERTINA DE FREITAS PINTO
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// NELSON TEIXEIRA NETO
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 3, createdAt: new Date('2025-03-21T00:00:00Z') },
	],

	// FRANCISCO ALEXANDRE DA SILVA
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// ANA MARIA CARDOSO BARRETO - Prontuário: 601114
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-17T00:00:00Z') },
	],

	// MARIA DO SOCORRO SOUSA
	[
		{ numericAnswer: 8, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// MARIA MARTINS FERRER DA SILVA - Prontuário: 602053
	[
		{ numericAnswer: 8, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-08T00:00:00Z') },
	],

	// FCO JULIO PEREIRA
	[
		{ numericAnswer: 8, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 6, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 6, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// FRANCISCO VALDIR DE SOUSA - Prontuário: 600666
	[
		{ numericAnswer: 9, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 10, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 10, createdAt: new Date('2025-03-21T00:00:00Z') },
	],

	// JOSE MARIA CARNEIRO
	[
		{ numericAnswer: 7, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// FRANCISCO GERONILSON ALMEIDA
	[
		{ numericAnswer: 8, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-08T00:00:00Z') },
	],

	// MARIA DO CARMO ARAUJO L.BARROSO
	[
		{ numericAnswer: 7, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-13T00:00:00Z') },
	],

	// MARIA BERNARDO GOMES
	[{ numericAnswer: 9, createdAt: new Date('2025-03-13T00:00:00Z') }],

	// FRANCISCA LUCIA DE BRITO
	[
		{ numericAnswer: 5, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// SEBASTIÃO DE SOUSA LIMA - Prontuário: 357627
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-11T00:00:00Z') },
	],

	// RAIMUNDO NONATO DA SILVA
	[
		{ numericAnswer: 9, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 10, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 10, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 10, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 10, createdAt: new Date('2025-03-16T00:00:00Z') },
	],

	// JOÃO RODRIGUES BARROS
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// JOSE MARIA CANDIDO
	[
		{ numericAnswer: 7, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-05T00:00:00Z') },
	],

	// ISAC RODRIGUES DA SILVA
	[
		{ numericAnswer: 8, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-10T00:00:00Z') },
	],

	// TARCISIO MOURA DA SILVA
	[
		{ numericAnswer: 5, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-14T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-19T00:00:00Z') },
	],

	// MARIA DO SOCORRO LIMA ANDRADE
	[
		{ numericAnswer: 6, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 6, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 7, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 8, createdAt: new Date('2025-03-24T00:00:00Z') },
	],

	// EDILENE COSTA DE OLIVEIRA
	[
		{ numericAnswer: 9, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 9, createdAt: new Date('2025-03-26T00:00:00Z') },
	],

	// MARIA SEFISA MOREIRA DIAS
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
	],

	// MARIA DO SOCORRO DOS SANTOS - Prontuário: 600560
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-01T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-02T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-03T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-04T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-05T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-06T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-07T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-08T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-09T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-10T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-11T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-12T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-13T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-14T00:00:00Z') },
	],

	// NILO EDSON DO NASCIMENTO
	[
		{ numericAnswer: 7, createdAt: new Date('2025-03-15T00:00:00Z') },
		{ numericAnswer: 6, createdAt: new Date('2025-03-16T00:00:00Z') },
		{ numericAnswer: 6, createdAt: new Date('2025-03-17T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-18T00:00:00Z') },
		{ numericAnswer: 5, createdAt: new Date('2025-03-19T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-20T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-21T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-22T00:00:00Z') },
	],

	// RAIMUNDO REBOUÇAS DA SILVA
	[
		{ numericAnswer: 4, createdAt: new Date('2025-03-22T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-23T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-24T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-25T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-26T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-27T00:00:00Z') },
		{ numericAnswer: 4, createdAt: new Date('2025-03-28T00:00:00Z') },
	],

	// JOSE DE SOUSA BENTO FILHO
	[{ numericAnswer: 8, createdAt: new Date('2025-03-28T00:00:00Z') }],
]

const findFormQuestion = async () => {
	const q = await prisma.formQuestion.findUnique({
		where: {
			id: 1,
		},
		select: {
			id: true,
		},
	})

	if (!q) {
		throw new Error(
			'Nenhuma questão encontrada. Execute o seed de formulários primeiro.',
		)
	}

	return q.id
}

async function createPatientsWithResponses(
	nurseIds: number[],
	formAnswers: { numericAnswer: number; createdAt: Date }[][],
) {
	try {
		const questionId = await findFormQuestion()

		for (const answers of formAnswers) {
			// Cria um paciente para cada conjunto de respostas
			const patient = await prisma.patientProfile.create({
				data: {
					name: faker.person.fullName(),
					medical_record_code: faker.string.alphanumeric(10),
					dateOfBirth: faker.date.birthdate(),
				},
			})

			console.log(`Paciente criado: ${patient.name} (ID: ${patient.id})`)

			// Cria as respostas do formulário para o paciente
			await Promise.all(
				answers.map((answer) =>
					prisma.formAnswer.create({
						data: {
							createdAt: answer.createdAt,
							numericAnswer: answer.numericAnswer,
							type: QuestionType.RANGE,
							questionId: questionId,
							patientProfileId: patient.id,
							userId: faker.helpers.arrayElement(nurseIds),
						},
					}),
				),
			)

			console.log(`Respostas criadas para o paciente ${patient.id}`)
		}
	} catch (error) {
		console.error('Erro ao criar pacientes e respostas:', error)
	}
}

// Executa o seeding
createPatientsWithResponses(NURSEIDS, formAnswers)
	.then(() => {
		console.log('Seeding concluído com sucesso!')
	})
	.catch((error) => {
		console.error('Erro durante o seeding:', error)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
