// // auth/authentication.middleware.ts
// import { Injectable, NestMiddleware } from '@nestjs/common';

// @Injectable()
// export class AuthenticationMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     // Implement your authentication logic here
//     // If authentication is successful, set the user object in the request context
//     const user = ... // Retrieve the authenticated user
//     req.user = user;
//     next();
//   }
// }
