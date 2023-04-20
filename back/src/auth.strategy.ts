import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard, PassportStrategy} from '@nestjs/passport';
import {BearerStrategy} from "passport-azure-ad";

@Injectable()
export class AzureAdStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
    constructor() {
        super({
            identityMetadata: 'https://login.microsoftonline.com/[tenantID]/.well-known/openid-configuration',
            clientID: 'c0a3815e...',
            tenantID: 'f8cdef31...',
            clientSecret: '8a076e41...',
            callbackURL: 'http://localhost:3000/auth/callback',
            resource: 'https://graph.microsoft.com',
            responseType: 'code',
            responseMode: 'form_post',
            scope: ['openid', 'profile', 'email'],
        });
    }

    async validate(profile: any, done: (error: any, user?: any) => void) {
        return profile;
        // Customize the validation logic here based on the properties available in the `profile` object.
        // Return a user object if validation succeeds, or an error if it fails.
    }
}

@Injectable()
export class AzureADGuard implements CanActivate {
    constructor(private readonly azureAdStrategy: AzureAdStrategy) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        return new Promise<boolean>((resolve, reject) => {
            this.azureAdStrategy.authenticate(req,  (error, user) => {
                if (error) {
                    reject(error);
                } else {
                    req.user = user;
                    resolve(true);
                }
            });
        });
    }
}
