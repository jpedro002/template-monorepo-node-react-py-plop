import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','role','name','createdAt']);

export const UserCardScalarFieldEnumSchema = z.enum(['id','userId','cardId','createdAt']);

export const CardScalarFieldEnumSchema = z.enum(['id','cardNumber','cardType','createdAt']);

export const PatientScalarFieldEnumSchema = z.enum(['id','name','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const RoleSchema = z.enum(['ADMIN','NURSE']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.number().int(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// USER CARD SCHEMA
/////////////////////////////////////////

export const UserCardSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  cardId: z.number().int(),
  createdAt: z.coerce.date(),
})

export type UserCard = z.infer<typeof UserCardSchema>

/////////////////////////////////////////
// USER CARD PARTIAL SCHEMA
/////////////////////////////////////////

export const UserCardPartialSchema = UserCardSchema.partial()

export type UserCardPartial = z.infer<typeof UserCardPartialSchema>

/////////////////////////////////////////
// CARD SCHEMA
/////////////////////////////////////////

export const CardSchema = z.object({
  id: z.number().int(),
  cardNumber: z.string(),
  cardType: z.string(),
  createdAt: z.coerce.date(),
})

export type Card = z.infer<typeof CardSchema>

/////////////////////////////////////////
// CARD PARTIAL SCHEMA
/////////////////////////////////////////

export const CardPartialSchema = CardSchema.partial()

export type CardPartial = z.infer<typeof CardPartialSchema>

/////////////////////////////////////////
// PATIENT SCHEMA
/////////////////////////////////////////

export const PatientSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
})

export type Patient = z.infer<typeof PatientSchema>

/////////////////////////////////////////
// PATIENT PARTIAL SCHEMA
/////////////////////////////////////////

export const PatientPartialSchema = PatientSchema.partial()

export type PatientPartial = z.infer<typeof PatientPartialSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  user_cards: z.union([z.boolean(),z.lazy(() => UserCardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  user_cards: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user_cards: z.union([z.boolean(),z.lazy(() => UserCardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER CARD
//------------------------------------------------------

export const UserCardIncludeSchema: z.ZodType<Prisma.UserCardInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  card: z.union([z.boolean(),z.lazy(() => CardArgsSchema)]).optional(),
}).strict()

export const UserCardArgsSchema: z.ZodType<Prisma.UserCardDefaultArgs> = z.object({
  select: z.lazy(() => UserCardSelectSchema).optional(),
  include: z.lazy(() => UserCardIncludeSchema).optional(),
}).strict();

export const UserCardSelectSchema: z.ZodType<Prisma.UserCardSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  cardId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  card: z.union([z.boolean(),z.lazy(() => CardArgsSchema)]).optional(),
}).strict()

// CARD
//------------------------------------------------------

export const CardIncludeSchema: z.ZodType<Prisma.CardInclude> = z.object({
  user_cards: z.union([z.boolean(),z.lazy(() => UserCardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CardCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CardArgsSchema: z.ZodType<Prisma.CardDefaultArgs> = z.object({
  select: z.lazy(() => CardSelectSchema).optional(),
  include: z.lazy(() => CardIncludeSchema).optional(),
}).strict();

export const CardCountOutputTypeArgsSchema: z.ZodType<Prisma.CardCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CardCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CardCountOutputTypeSelectSchema: z.ZodType<Prisma.CardCountOutputTypeSelect> = z.object({
  user_cards: z.boolean().optional(),
}).strict();

export const CardSelectSchema: z.ZodType<Prisma.CardSelect> = z.object({
  id: z.boolean().optional(),
  cardNumber: z.boolean().optional(),
  cardType: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user_cards: z.union([z.boolean(),z.lazy(() => UserCardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CardCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATIENT
//------------------------------------------------------

export const PatientSelectSchema: z.ZodType<Prisma.PatientSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_cards: z.lazy(() => UserCardListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user_cards: z.lazy(() => UserCardOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_cards: z.lazy(() => UserCardListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCardWhereInputSchema: z.ZodType<Prisma.UserCardWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserCardWhereInputSchema),z.lazy(() => UserCardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserCardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserCardWhereInputSchema),z.lazy(() => UserCardWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cardId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  card: z.union([ z.lazy(() => CardScalarRelationFilterSchema),z.lazy(() => CardWhereInputSchema) ]).optional(),
}).strict();

export const UserCardOrderByWithRelationInputSchema: z.ZodType<Prisma.UserCardOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cardId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  card: z.lazy(() => CardOrderByWithRelationInputSchema).optional()
}).strict();

export const UserCardWhereUniqueInputSchema: z.ZodType<Prisma.UserCardWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserCardWhereInputSchema),z.lazy(() => UserCardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserCardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserCardWhereInputSchema),z.lazy(() => UserCardWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  cardId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  card: z.union([ z.lazy(() => CardScalarRelationFilterSchema),z.lazy(() => CardWhereInputSchema) ]).optional(),
}).strict());

export const UserCardOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserCardOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cardId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCardCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserCardAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserCardMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserCardMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserCardSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserCardScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserCardScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserCardScalarWhereWithAggregatesInputSchema),z.lazy(() => UserCardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserCardScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserCardScalarWhereWithAggregatesInputSchema),z.lazy(() => UserCardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cardId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CardWhereInputSchema: z.ZodType<Prisma.CardWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cardNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cardType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_cards: z.lazy(() => UserCardListRelationFilterSchema).optional()
}).strict();

export const CardOrderByWithRelationInputSchema: z.ZodType<Prisma.CardOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cardNumber: z.lazy(() => SortOrderSchema).optional(),
  cardType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user_cards: z.lazy(() => UserCardOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CardWhereUniqueInputSchema: z.ZodType<Prisma.CardWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    cardNumber: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    cardNumber: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  cardNumber: z.string().optional(),
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  cardType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_cards: z.lazy(() => UserCardListRelationFilterSchema).optional()
}).strict());

export const CardOrderByWithAggregationInputSchema: z.ZodType<Prisma.CardOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cardNumber: z.lazy(() => SortOrderSchema).optional(),
  cardType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CardCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CardAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CardMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CardMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CardSumOrderByAggregateInputSchema).optional()
}).strict();

export const CardScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CardScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cardNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  cardType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PatientWhereInputSchema: z.ZodType<Prisma.PatientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PatientOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientWhereUniqueInputSchema: z.ZodType<Prisma.PatientWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const PatientOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatientCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatientAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatientMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatientSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  user_cards: z.lazy(() => UserCardCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  user_cards: z.lazy(() => UserCardUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_cards: z.lazy(() => UserCardUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_cards: z.lazy(() => UserCardUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema),
  name: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCardCreateInputSchema: z.ZodType<Prisma.UserCardCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_cardsInputSchema),
  card: z.lazy(() => CardCreateNestedOneWithoutUser_cardsInputSchema)
}).strict();

export const UserCardUncheckedCreateInputSchema: z.ZodType<Prisma.UserCardUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  cardId: z.number().int(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserCardUpdateInputSchema: z.ZodType<Prisma.UserCardUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_cardsNestedInputSchema).optional(),
  card: z.lazy(() => CardUpdateOneRequiredWithoutUser_cardsNestedInputSchema).optional()
}).strict();

export const UserCardUncheckedUpdateInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCardCreateManyInputSchema: z.ZodType<Prisma.UserCardCreateManyInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  cardId: z.number().int(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserCardUpdateManyMutationInputSchema: z.ZodType<Prisma.UserCardUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCardUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardCreateInputSchema: z.ZodType<Prisma.CardCreateInput> = z.object({
  cardNumber: z.string(),
  cardType: z.string(),
  createdAt: z.coerce.date().optional(),
  user_cards: z.lazy(() => UserCardCreateNestedManyWithoutCardInputSchema).optional()
}).strict();

export const CardUncheckedCreateInputSchema: z.ZodType<Prisma.CardUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  cardNumber: z.string(),
  cardType: z.string(),
  createdAt: z.coerce.date().optional(),
  user_cards: z.lazy(() => UserCardUncheckedCreateNestedManyWithoutCardInputSchema).optional()
}).strict();

export const CardUpdateInputSchema: z.ZodType<Prisma.CardUpdateInput> = z.object({
  cardNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cardType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_cards: z.lazy(() => UserCardUpdateManyWithoutCardNestedInputSchema).optional()
}).strict();

export const CardUncheckedUpdateInputSchema: z.ZodType<Prisma.CardUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cardNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cardType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_cards: z.lazy(() => UserCardUncheckedUpdateManyWithoutCardNestedInputSchema).optional()
}).strict();

export const CardCreateManyInputSchema: z.ZodType<Prisma.CardCreateManyInput> = z.object({
  id: z.number().int().optional(),
  cardNumber: z.string(),
  cardType: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CardUpdateManyMutationInputSchema: z.ZodType<Prisma.CardUpdateManyMutationInput> = z.object({
  cardNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cardType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cardNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cardType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCreateInputSchema: z.ZodType<Prisma.PatientCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PatientUncheckedCreateInputSchema: z.ZodType<Prisma.PatientUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PatientUpdateInputSchema: z.ZodType<Prisma.PatientUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCreateManyInputSchema: z.ZodType<Prisma.PatientCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PatientUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserCardListRelationFilterSchema: z.ZodType<Prisma.UserCardListRelationFilter> = z.object({
  every: z.lazy(() => UserCardWhereInputSchema).optional(),
  some: z.lazy(() => UserCardWhereInputSchema).optional(),
  none: z.lazy(() => UserCardWhereInputSchema).optional()
}).strict();

export const UserCardOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserCardOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const CardScalarRelationFilterSchema: z.ZodType<Prisma.CardScalarRelationFilter> = z.object({
  is: z.lazy(() => CardWhereInputSchema).optional(),
  isNot: z.lazy(() => CardWhereInputSchema).optional()
}).strict();

export const UserCardCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCardCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cardId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCardAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserCardAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cardId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCardMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserCardMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cardId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCardMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserCardMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cardId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCardSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserCardSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cardId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardCountOrderByAggregateInputSchema: z.ZodType<Prisma.CardCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cardNumber: z.lazy(() => SortOrderSchema).optional(),
  cardType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CardAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CardMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cardNumber: z.lazy(() => SortOrderSchema).optional(),
  cardType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardMinOrderByAggregateInputSchema: z.ZodType<Prisma.CardMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cardNumber: z.lazy(() => SortOrderSchema).optional(),
  cardType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardSumOrderByAggregateInputSchema: z.ZodType<Prisma.CardSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatientAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatientSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCardCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserCardCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutUserInputSchema),z.lazy(() => UserCardCreateWithoutUserInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCardUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserCardUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutUserInputSchema),z.lazy(() => UserCardCreateWithoutUserInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserCardUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserCardUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutUserInputSchema),z.lazy(() => UserCardCreateWithoutUserInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserCardUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserCardUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserCardUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserCardUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserCardUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserCardUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserCardScalarWhereInputSchema),z.lazy(() => UserCardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserCardUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutUserInputSchema),z.lazy(() => UserCardCreateWithoutUserInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserCardUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserCardUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserCardUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserCardUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserCardUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserCardUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserCardScalarWhereInputSchema),z.lazy(() => UserCardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUser_cardsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_cardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_cardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_cardsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CardCreateNestedOneWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardCreateNestedOneWithoutUser_cardsInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutUser_cardsInputSchema),z.lazy(() => CardUncheckedCreateWithoutUser_cardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CardCreateOrConnectWithoutUser_cardsInputSchema).optional(),
  connect: z.lazy(() => CardWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUser_cardsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUser_cardsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_cardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_cardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_cardsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUser_cardsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUser_cardsInputSchema),z.lazy(() => UserUpdateWithoutUser_cardsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_cardsInputSchema) ]).optional(),
}).strict();

export const CardUpdateOneRequiredWithoutUser_cardsNestedInputSchema: z.ZodType<Prisma.CardUpdateOneRequiredWithoutUser_cardsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutUser_cardsInputSchema),z.lazy(() => CardUncheckedCreateWithoutUser_cardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CardCreateOrConnectWithoutUser_cardsInputSchema).optional(),
  upsert: z.lazy(() => CardUpsertWithoutUser_cardsInputSchema).optional(),
  connect: z.lazy(() => CardWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CardUpdateToOneWithWhereWithoutUser_cardsInputSchema),z.lazy(() => CardUpdateWithoutUser_cardsInputSchema),z.lazy(() => CardUncheckedUpdateWithoutUser_cardsInputSchema) ]).optional(),
}).strict();

export const UserCardCreateNestedManyWithoutCardInputSchema: z.ZodType<Prisma.UserCardCreateNestedManyWithoutCardInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutCardInputSchema),z.lazy(() => UserCardCreateWithoutCardInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCardUncheckedCreateNestedManyWithoutCardInputSchema: z.ZodType<Prisma.UserCardUncheckedCreateNestedManyWithoutCardInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutCardInputSchema),z.lazy(() => UserCardCreateWithoutCardInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCardUpdateManyWithoutCardNestedInputSchema: z.ZodType<Prisma.UserCardUpdateManyWithoutCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutCardInputSchema),z.lazy(() => UserCardCreateWithoutCardInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserCardUpsertWithWhereUniqueWithoutCardInputSchema),z.lazy(() => UserCardUpsertWithWhereUniqueWithoutCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserCardUpdateWithWhereUniqueWithoutCardInputSchema),z.lazy(() => UserCardUpdateWithWhereUniqueWithoutCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserCardUpdateManyWithWhereWithoutCardInputSchema),z.lazy(() => UserCardUpdateManyWithWhereWithoutCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserCardScalarWhereInputSchema),z.lazy(() => UserCardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCardUncheckedUpdateManyWithoutCardNestedInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateManyWithoutCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCardCreateWithoutCardInputSchema),z.lazy(() => UserCardCreateWithoutCardInputSchema).array(),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema),z.lazy(() => UserCardCreateOrConnectWithoutCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserCardUpsertWithWhereUniqueWithoutCardInputSchema),z.lazy(() => UserCardUpsertWithWhereUniqueWithoutCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCardCreateManyCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserCardWhereUniqueInputSchema),z.lazy(() => UserCardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserCardUpdateWithWhereUniqueWithoutCardInputSchema),z.lazy(() => UserCardUpdateWithWhereUniqueWithoutCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserCardUpdateManyWithWhereWithoutCardInputSchema),z.lazy(() => UserCardUpdateManyWithWhereWithoutCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserCardScalarWhereInputSchema),z.lazy(() => UserCardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserCardCreateWithoutUserInputSchema: z.ZodType<Prisma.UserCardCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  card: z.lazy(() => CardCreateNestedOneWithoutUser_cardsInputSchema)
}).strict();

export const UserCardUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserCardUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  cardId: z.number().int(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserCardCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserCardCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserCardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCardCreateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserCardCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserCardCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCardCreateManyUserInputSchema),z.lazy(() => UserCardCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCardUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserCardUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserCardWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserCardUpdateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserCardCreateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserCardUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserCardUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserCardWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserCardUpdateWithoutUserInputSchema),z.lazy(() => UserCardUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserCardUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserCardUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserCardScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserCardUpdateManyMutationInputSchema),z.lazy(() => UserCardUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserCardScalarWhereInputSchema: z.ZodType<Prisma.UserCardScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserCardScalarWhereInputSchema),z.lazy(() => UserCardScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserCardScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserCardScalarWhereInputSchema),z.lazy(() => UserCardScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cardId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserCreateWithoutUser_cardsInput> = z.object({
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema),
  name: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUser_cardsInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema),
  name: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUser_cardsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_cardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_cardsInputSchema) ]),
}).strict();

export const CardCreateWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardCreateWithoutUser_cardsInput> = z.object({
  cardNumber: z.string(),
  cardType: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CardUncheckedCreateWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardUncheckedCreateWithoutUser_cardsInput> = z.object({
  id: z.number().int().optional(),
  cardNumber: z.string(),
  cardType: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CardCreateOrConnectWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardCreateOrConnectWithoutUser_cardsInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CardCreateWithoutUser_cardsInputSchema),z.lazy(() => CardUncheckedCreateWithoutUser_cardsInputSchema) ]),
}).strict();

export const UserUpsertWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUser_cardsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUser_cardsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_cardsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_cardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_cardsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUser_cardsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUser_cardsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_cardsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUser_cardsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutUser_cardsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUser_cardsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUpsertWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardUpsertWithoutUser_cardsInput> = z.object({
  update: z.union([ z.lazy(() => CardUpdateWithoutUser_cardsInputSchema),z.lazy(() => CardUncheckedUpdateWithoutUser_cardsInputSchema) ]),
  create: z.union([ z.lazy(() => CardCreateWithoutUser_cardsInputSchema),z.lazy(() => CardUncheckedCreateWithoutUser_cardsInputSchema) ]),
  where: z.lazy(() => CardWhereInputSchema).optional()
}).strict();

export const CardUpdateToOneWithWhereWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardUpdateToOneWithWhereWithoutUser_cardsInput> = z.object({
  where: z.lazy(() => CardWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CardUpdateWithoutUser_cardsInputSchema),z.lazy(() => CardUncheckedUpdateWithoutUser_cardsInputSchema) ]),
}).strict();

export const CardUpdateWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardUpdateWithoutUser_cardsInput> = z.object({
  cardNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cardType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUncheckedUpdateWithoutUser_cardsInputSchema: z.ZodType<Prisma.CardUncheckedUpdateWithoutUser_cardsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cardNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cardType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCardCreateWithoutCardInputSchema: z.ZodType<Prisma.UserCardCreateWithoutCardInput> = z.object({
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_cardsInputSchema)
}).strict();

export const UserCardUncheckedCreateWithoutCardInputSchema: z.ZodType<Prisma.UserCardUncheckedCreateWithoutCardInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserCardCreateOrConnectWithoutCardInputSchema: z.ZodType<Prisma.UserCardCreateOrConnectWithoutCardInput> = z.object({
  where: z.lazy(() => UserCardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCardCreateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema) ]),
}).strict();

export const UserCardCreateManyCardInputEnvelopeSchema: z.ZodType<Prisma.UserCardCreateManyCardInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCardCreateManyCardInputSchema),z.lazy(() => UserCardCreateManyCardInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCardUpsertWithWhereUniqueWithoutCardInputSchema: z.ZodType<Prisma.UserCardUpsertWithWhereUniqueWithoutCardInput> = z.object({
  where: z.lazy(() => UserCardWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserCardUpdateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedUpdateWithoutCardInputSchema) ]),
  create: z.union([ z.lazy(() => UserCardCreateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedCreateWithoutCardInputSchema) ]),
}).strict();

export const UserCardUpdateWithWhereUniqueWithoutCardInputSchema: z.ZodType<Prisma.UserCardUpdateWithWhereUniqueWithoutCardInput> = z.object({
  where: z.lazy(() => UserCardWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserCardUpdateWithoutCardInputSchema),z.lazy(() => UserCardUncheckedUpdateWithoutCardInputSchema) ]),
}).strict();

export const UserCardUpdateManyWithWhereWithoutCardInputSchema: z.ZodType<Prisma.UserCardUpdateManyWithWhereWithoutCardInput> = z.object({
  where: z.lazy(() => UserCardScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserCardUpdateManyMutationInputSchema),z.lazy(() => UserCardUncheckedUpdateManyWithoutCardInputSchema) ]),
}).strict();

export const UserCardCreateManyUserInputSchema: z.ZodType<Prisma.UserCardCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  cardId: z.number().int(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserCardUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserCardUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  card: z.lazy(() => CardUpdateOneRequiredWithoutUser_cardsNestedInputSchema).optional()
}).strict();

export const UserCardUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCardUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cardId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCardCreateManyCardInputSchema: z.ZodType<Prisma.UserCardCreateManyCardInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserCardUpdateWithoutCardInputSchema: z.ZodType<Prisma.UserCardUpdateWithoutCardInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_cardsNestedInputSchema).optional()
}).strict();

export const UserCardUncheckedUpdateWithoutCardInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateWithoutCardInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCardUncheckedUpdateManyWithoutCardInputSchema: z.ZodType<Prisma.UserCardUncheckedUpdateManyWithoutCardInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserCardFindFirstArgsSchema: z.ZodType<Prisma.UserCardFindFirstArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  where: UserCardWhereInputSchema.optional(),
  orderBy: z.union([ UserCardOrderByWithRelationInputSchema.array(),UserCardOrderByWithRelationInputSchema ]).optional(),
  cursor: UserCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserCardScalarFieldEnumSchema,UserCardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserCardFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserCardFindFirstOrThrowArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  where: UserCardWhereInputSchema.optional(),
  orderBy: z.union([ UserCardOrderByWithRelationInputSchema.array(),UserCardOrderByWithRelationInputSchema ]).optional(),
  cursor: UserCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserCardScalarFieldEnumSchema,UserCardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserCardFindManyArgsSchema: z.ZodType<Prisma.UserCardFindManyArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  where: UserCardWhereInputSchema.optional(),
  orderBy: z.union([ UserCardOrderByWithRelationInputSchema.array(),UserCardOrderByWithRelationInputSchema ]).optional(),
  cursor: UserCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserCardScalarFieldEnumSchema,UserCardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserCardAggregateArgsSchema: z.ZodType<Prisma.UserCardAggregateArgs> = z.object({
  where: UserCardWhereInputSchema.optional(),
  orderBy: z.union([ UserCardOrderByWithRelationInputSchema.array(),UserCardOrderByWithRelationInputSchema ]).optional(),
  cursor: UserCardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserCardGroupByArgsSchema: z.ZodType<Prisma.UserCardGroupByArgs> = z.object({
  where: UserCardWhereInputSchema.optional(),
  orderBy: z.union([ UserCardOrderByWithAggregationInputSchema.array(),UserCardOrderByWithAggregationInputSchema ]).optional(),
  by: UserCardScalarFieldEnumSchema.array(),
  having: UserCardScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserCardFindUniqueArgsSchema: z.ZodType<Prisma.UserCardFindUniqueArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  where: UserCardWhereUniqueInputSchema,
}).strict() ;

export const UserCardFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserCardFindUniqueOrThrowArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  where: UserCardWhereUniqueInputSchema,
}).strict() ;

export const CardFindFirstArgsSchema: z.ZodType<Prisma.CardFindFirstArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CardFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CardFindFirstOrThrowArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CardFindManyArgsSchema: z.ZodType<Prisma.CardFindManyArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CardAggregateArgsSchema: z.ZodType<Prisma.CardAggregateArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CardGroupByArgsSchema: z.ZodType<Prisma.CardGroupByArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithAggregationInputSchema.array(),CardOrderByWithAggregationInputSchema ]).optional(),
  by: CardScalarFieldEnumSchema.array(),
  having: CardScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CardFindUniqueArgsSchema: z.ZodType<Prisma.CardFindUniqueArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const CardFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CardFindUniqueOrThrowArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const PatientFindFirstArgsSchema: z.ZodType<Prisma.PatientFindFirstArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientFindFirstOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindManyArgsSchema: z.ZodType<Prisma.PatientFindManyArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientAggregateArgsSchema: z.ZodType<Prisma.PatientAggregateArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientGroupByArgsSchema: z.ZodType<Prisma.PatientGroupByArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithAggregationInputSchema.array(),PatientOrderByWithAggregationInputSchema ]).optional(),
  by: PatientScalarFieldEnumSchema.array(),
  having: PatientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientFindUniqueArgsSchema: z.ZodType<Prisma.PatientFindUniqueArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientFindUniqueOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCardCreateArgsSchema: z.ZodType<Prisma.UserCardCreateArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  data: z.union([ UserCardCreateInputSchema,UserCardUncheckedCreateInputSchema ]),
}).strict() ;

export const UserCardUpsertArgsSchema: z.ZodType<Prisma.UserCardUpsertArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  where: UserCardWhereUniqueInputSchema,
  create: z.union([ UserCardCreateInputSchema,UserCardUncheckedCreateInputSchema ]),
  update: z.union([ UserCardUpdateInputSchema,UserCardUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCardCreateManyArgsSchema: z.ZodType<Prisma.UserCardCreateManyArgs> = z.object({
  data: z.union([ UserCardCreateManyInputSchema,UserCardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCardCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCardCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCardCreateManyInputSchema,UserCardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCardDeleteArgsSchema: z.ZodType<Prisma.UserCardDeleteArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  where: UserCardWhereUniqueInputSchema,
}).strict() ;

export const UserCardUpdateArgsSchema: z.ZodType<Prisma.UserCardUpdateArgs> = z.object({
  select: UserCardSelectSchema.optional(),
  include: UserCardIncludeSchema.optional(),
  data: z.union([ UserCardUpdateInputSchema,UserCardUncheckedUpdateInputSchema ]),
  where: UserCardWhereUniqueInputSchema,
}).strict() ;

export const UserCardUpdateManyArgsSchema: z.ZodType<Prisma.UserCardUpdateManyArgs> = z.object({
  data: z.union([ UserCardUpdateManyMutationInputSchema,UserCardUncheckedUpdateManyInputSchema ]),
  where: UserCardWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCardUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCardUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserCardUpdateManyMutationInputSchema,UserCardUncheckedUpdateManyInputSchema ]),
  where: UserCardWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCardDeleteManyArgsSchema: z.ZodType<Prisma.UserCardDeleteManyArgs> = z.object({
  where: UserCardWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CardCreateArgsSchema: z.ZodType<Prisma.CardCreateArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  data: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
}).strict() ;

export const CardUpsertArgsSchema: z.ZodType<Prisma.CardUpsertArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
  create: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
  update: z.union([ CardUpdateInputSchema,CardUncheckedUpdateInputSchema ]),
}).strict() ;

export const CardCreateManyArgsSchema: z.ZodType<Prisma.CardCreateManyArgs> = z.object({
  data: z.union([ CardCreateManyInputSchema,CardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CardCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CardCreateManyAndReturnArgs> = z.object({
  data: z.union([ CardCreateManyInputSchema,CardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CardDeleteArgsSchema: z.ZodType<Prisma.CardDeleteArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const CardUpdateArgsSchema: z.ZodType<Prisma.CardUpdateArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  data: z.union([ CardUpdateInputSchema,CardUncheckedUpdateInputSchema ]),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const CardUpdateManyArgsSchema: z.ZodType<Prisma.CardUpdateManyArgs> = z.object({
  data: z.union([ CardUpdateManyMutationInputSchema,CardUncheckedUpdateManyInputSchema ]),
  where: CardWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CardUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CardUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CardUpdateManyMutationInputSchema,CardUncheckedUpdateManyInputSchema ]),
  where: CardWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CardDeleteManyArgsSchema: z.ZodType<Prisma.CardDeleteManyArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatientCreateArgsSchema: z.ZodType<Prisma.PatientCreateArgs> = z.object({
  select: PatientSelectSchema.optional(),
  data: z.union([ PatientCreateInputSchema,PatientUncheckedCreateInputSchema ]),
}).strict() ;

export const PatientUpsertArgsSchema: z.ZodType<Prisma.PatientUpsertArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereUniqueInputSchema,
  create: z.union([ PatientCreateInputSchema,PatientUncheckedCreateInputSchema ]),
  update: z.union([ PatientUpdateInputSchema,PatientUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatientCreateManyArgsSchema: z.ZodType<Prisma.PatientCreateManyArgs> = z.object({
  data: z.union([ PatientCreateManyInputSchema,PatientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PatientCreateManyAndReturnArgs> = z.object({
  data: z.union([ PatientCreateManyInputSchema,PatientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientDeleteArgsSchema: z.ZodType<Prisma.PatientDeleteArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientUpdateArgsSchema: z.ZodType<Prisma.PatientUpdateArgs> = z.object({
  select: PatientSelectSchema.optional(),
  data: z.union([ PatientUpdateInputSchema,PatientUncheckedUpdateInputSchema ]),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientUpdateManyArgsSchema: z.ZodType<Prisma.PatientUpdateManyArgs> = z.object({
  data: z.union([ PatientUpdateManyMutationInputSchema,PatientUncheckedUpdateManyInputSchema ]),
  where: PatientWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatientUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PatientUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PatientUpdateManyMutationInputSchema,PatientUncheckedUpdateManyInputSchema ]),
  where: PatientWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PatientDeleteManyArgsSchema: z.ZodType<Prisma.PatientDeleteManyArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;