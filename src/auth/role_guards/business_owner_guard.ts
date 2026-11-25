import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BusinessOwnerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest()
        const user = request.user

        if(!user || user.role !== 'business_owner'){
            throw new ForbiddenException('Access denied. Only business owners can perform this action.');
        }

        return true
    }
}