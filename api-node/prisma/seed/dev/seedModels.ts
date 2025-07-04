import { PrismaClient, User, Card, Patient, UserCard } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function seedUsersCardsPatients() {
  console.log('🌱 Iniciando seed dos modelos User, Card, Patient e UserCard...')

  try {
    // Limpar dados existentes
    await db.userCard.deleteMany()
    await db.card.deleteMany()
    await db.user.deleteMany()
    await db.patient.deleteMany()

    console.log('🧹 Dados existentes removidos')

    // Criar usuários
    const users: User[] = []
    const hashedPassword = await bcrypt.hash('123456', 10)

    // Criar usuário admin
    const adminUser = await db.user.create({
      data: {
        email: 'admin@admin.com',
        name: 'Administrador',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    users.push(adminUser)
    console.log('👤 Usuário admin criado:', adminUser.email)

    // Criar usuários enfermeiros
    for (let i = 0; i < 5; i++) {
      const user = await db.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: hashedPassword,
          role: 'NURSE',
        },
      })
      users.push(user)
    }
    console.log(`👥 ${users.length - 1} enfermeiros criados`)

    // Criar cartões
    const cards: Card[] = []
    const cardTypes = ['RFID', 'NFC', 'MAGNETIC', 'BARCODE']

    for (let i = 0; i < 15; i++) {
      const card = await db.card.create({
        data: {
          cardNumber: faker.string.alphanumeric(12).toUpperCase(),
          cardType: faker.helpers.arrayElement(cardTypes),
        },
      })
      cards.push(card)
    }
    console.log(`💳 ${cards.length} cartões criados`)

    // Criar pacientes
    const patients: Patient[] = []
    for (let i = 0; i < 20; i++) {
      const patient = await db.patient.create({
        data: {
          name: faker.person.fullName(),
        },
      })
      patients.push(patient)
    }
    console.log(`🏥 ${patients.length} pacientes criados`)

    // Criar relacionamentos UserCard (many-to-many)
    const userCards: UserCard[] = []
    
    // Garantir que cada usuário tenha pelo menos um cartão
    for (const user of users) {
      const availableCards = cards.filter(card => 
        !userCards.some(uc => uc.cardId === card.id)
      )
      
      if (availableCards.length > 0) {
        const randomCard = faker.helpers.arrayElement(availableCards)
        const userCard = await db.userCard.create({
          data: {
            userId: user.id,
            cardId: randomCard.id,
          },
        })
        userCards.push(userCard)
      }
    }

    // Criar alguns relacionamentos adicionais (usuários com múltiplos cartões)
    const remainingCards = cards.filter(card => 
      !userCards.some(uc => uc.cardId === card.id)
    )

    for (let i = 0; i < Math.min(5, remainingCards.length); i++) {
      const randomUser = faker.helpers.arrayElement(users)
      const randomCard = remainingCards[i]
      
      // Verificar se o usuário já não tem esse cartão
      const existingRelation = userCards.find(uc => 
        uc.userId === randomUser.id && uc.cardId === randomCard.id
      )
      
      if (!existingRelation) {
        const userCard = await db.userCard.create({
          data: {
            userId: randomUser.id,
            cardId: randomCard.id,
          },
        })
        userCards.push(userCard)
      }
    }

    console.log(`🔗 ${userCards.length} relacionamentos UserCard criados`)

    // Exibir estatísticas finais
    const stats = {
      users: await db.user.count(),
      cards: await db.card.count(),
      patients: await db.patient.count(),
      userCards: await db.userCard.count(),
    }

    console.log('📊 Estatísticas finais:')
    console.log(`   • Usuários: ${stats.users}`)
    console.log(`   • Cartões: ${stats.cards}`)
    console.log(`   • Pacientes: ${stats.patients}`)
    console.log(`   • Relacionamentos UserCard: ${stats.userCards}`)

    console.log('✅ Seed concluído com sucesso!')

  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

// Executar o seed se o arquivo for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedUsersCardsPatients()
}

export { seedUsersCardsPatients }
