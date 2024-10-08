import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.headers.authorization) {
			try {
				const [, jwt] = req.headers.authorization.split(' ');
				const payload = await this.verifyJWT(jwt, this.secret);
				req.user = payload.email;
				next();
			} catch (e) {
				next();
			}
		} else {
			next();
		}
	}

	private async verifyJWT(jwt: string, secret: string): Promise<JwtPayload> {
		return new Promise((resolve, reject) => {
			verify(jwt, secret, (err, payload) => {
				if (err) {
					reject(err);
				}
				resolve(payload as JwtPayload);
			});
		});
	}
}
