import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const email = 'admin@example.com';
  const password = 'Admin1234'; // Contraseña de prueba
  const name = 'Administrador';

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verifica si ya existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log('Usuario ya existe:', email);
    return;
  }

  // Crear usuario
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
      age: 30
    }
  });

  console.log('Usuario creado correctamente:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// un usuario de prueba ya que no esta para crear usuario