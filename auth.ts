import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./src/db";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { headers } from "next/headers";
import * as schema from "./src/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "user",
    additionalFields: {
      nickname: {
        type: "string",
        required: false,
      },
      favoritesSpots: {
        type: "number[]",
        required: false,
      },
      age: {
        type: "number",
        required: false,
      },
      country: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }, ctx) => {
        await resendSignIn(email, url);
      },
    }),
  ],
});

export const resendSignIn = async (email: string, url: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  return await resend.emails.send({
    from: `StreetSpot <${process.env.RESEND_SENDER_EMAIL}>`,
    to: email,
    subject: "StreetSpot Login",
    // TODO: Add a better email template
    html:
      '<p>Click en el siguiente link para ingresar: <a href="' +
      url +
      '">Ingresar</a></p>',
  });
};

export const signInMagicLinkServer = async (email: string) => {
  const data = await auth.api.signInMagicLink({
    body: {
      email, // required
      callbackURL: "/",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  return data;
};
