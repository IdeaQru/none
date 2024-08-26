import { PrismaClient } from "@prisma/client";

// Extending PrismaClient with additional properties/methods
class PrismaClientExtended extends PrismaClient {
  someCustomMethod() {
    // custom implementation
  }
}

export const prisma = new PrismaClientExtended({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});
