import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { and, eq, gt } from "drizzle-orm"

import { db } from "@/lib/db"
import { authSessions, users } from "@/lib/db/schema"

export const AUTH_COOKIE = "utm_dash_session"
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

type UserRow = typeof users.$inferSelect

function normalizeUsername(username: string): string {
  return username.trim()
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex")
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const derived = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${derived}`
}

export function verifyPassword(password: string, encoded: string): boolean {
  const [salt, expected] = encoded.split(":")
  if (!salt || !expected) return false
  const actual = scryptSync(password, salt, 64)
  const expectedBuf = Buffer.from(expected, "hex")
  return expectedBuf.length === actual.length && timingSafeEqual(actual, expectedBuf)
}

export async function findUserByUsername(username: string): Promise<UserRow | undefined> {
  return db.query.users.findFirst({
    where: eq(users.username, normalizeUsername(username)),
  })
}

export async function createUser(
  username: string,
  password: string,
  brandId: string
): Promise<UserRow> {
  const inserted = await db
    .insert(users)
    .values({
      username: normalizeUsername(username),
      brandId,
      passwordHash: hashPassword(password),
    })
    .returning()
  return inserted[0]!
}

export async function createSession(userId: number): Promise<string> {
  const token = randomBytes(32).toString("hex")
  await db.insert(authSessions).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + SESSION_TTL_MS),
  })
  return token
}

export async function deleteSession(token: string): Promise<void> {
  await db.delete(authSessions).where(eq(authSessions.tokenHash, hashToken(token)))
}

export async function getCurrentUser(): Promise<UserRow | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value
  if (!token) return null

  const session = await db.query.authSessions.findFirst({
    where: and(
      eq(authSessions.tokenHash, hashToken(token)),
      gt(authSessions.expiresAt, new Date())
    ),
  })
  if (!session) return null

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
  })
  return user ?? null
}
