import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),

            ignoreExpiration: false,

            secretOrKey: process.env.JWT_SECRET || '8b850679288d7ec9f5f29500edd233f6e1d237f2f218f83433cb6369ca265be5904ffb5559dad3bbbb8822f4d551982c7b145f219f78cc2fe572890f19c4b636',
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
        };
    }
}