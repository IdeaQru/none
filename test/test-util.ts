import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export class UserTest {
  static async delete() {
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prisma.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10), // Hash password "test"
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { username: "test" }
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  // Tambahkan metode untuk update password jika diperlukan
  static async updatePassword(username: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash password baru
    await prisma.user.update({
      where: { username },
      data: { password: hashedPassword },
    });
  }
}
