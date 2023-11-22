import { z } from "zod"

const envVarsSchema = z.object({
  ENVIRONMENT: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.number().default(8000),
})

const validatedEnvVars = envVarsSchema.safeParse({
  ENVIRONMENT: Bun.env.ENVIRONMENT,
  PORT: Number(Bun.env.PORT),
})

if (!validatedEnvVars.success) {
  throw new Error(
    `Config validation error: ${validatedEnvVars.error.flatten().fieldErrors}`,
  )
}

const config = {
  environment: validatedEnvVars.data.ENVIRONMENT,
  port: validatedEnvVars.data.PORT,
}

export default config
