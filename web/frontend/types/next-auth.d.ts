import { DefaultSession } from "next-auth";

// ref: https://reacthustle.com/blog/extend-user-session-nextauth-typescript
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      email: string;
      name: string;
      id: string;
    };
  }
  interface User {
    token: string | null;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string | null;
  }
}
