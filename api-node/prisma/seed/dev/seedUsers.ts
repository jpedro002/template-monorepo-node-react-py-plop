import { faker } from '@faker-js/faker'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()


const TOTAL_USERS = 30; 
const ADMIN_PROBABILITY = 0.2; 


function getRandomRole(): Role {
  return Math.random() < ADMIN_PROBABILITY ? Role.ADMIN : Role.NURSE;
}


function generatePasswordHash(): string {
  
  
  return '$2a$10$' + faker.string.alphanumeric(53);
}


async function seedRandomUsers(count: number): Promise<void> {
  console.log(`Gerando ${count} usuários aleatórios...`);
  
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: generatePasswordHash(),
      role: Role.ADMIN,
      name: faker.person.fullName(),
      createdAt: faker.date.past(),
    }
  });
  console.log(`Admin criado com sucesso: ${adminUser.name} (ID: ${adminUser.id})`);
  
  
  const createdCount = 1; 
  
  for (let i = createdCount; i < count; i++) {
    try {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const role = getRandomRole();
      
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          password: generatePasswordHash(),
          role: role,
          name: `${firstName} ${lastName}`,
          createdAt: faker.date.past(),
        }
      });
      
      console.log(`Usuário criado com sucesso: ${user.name} (ID: ${user.id}, Role: ${user.role})`);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }
}


seedRandomUsers(TOTAL_USERS)
  .catch((e) => {
    console.error('Erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });