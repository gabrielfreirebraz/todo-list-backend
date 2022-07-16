import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface AuthRequest extends Request {
  user: any;
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: AuthRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    const [type, value] = authorization.split(' ');

    console.log({ type, value });

    if (type !== 'Bearer' || !value) {
      return res.sendStatus(401);
    }

    verify(value, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      req.user = decoded;

      next();
    });
  }
}
