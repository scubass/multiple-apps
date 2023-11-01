import { PrismaClient } from "@prisma/client";
import { connect } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { fetch as undiciFetch } from "undici";
import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrimsaDB() {
  const connection = connect({ url: env.DATABASE_URL, fetch: undiciFetch });

  const adapter = new PrismaPlanetScale(connection);

  const prisma = new PrismaClient({ adapter });
  return prisma;
}

export const db = globalForPrisma.prisma ?? createPrimsaDB();
// new PrismaClient({
//   log:
//     env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
// });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
