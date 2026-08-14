import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { Observable } from "rxjs";

@Injectable()
export class HasUSerIDGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["user-id"];

    if (!userId || !isValidObjectId(userId)) {
      throw new BadRequestException('არასწორი ან ნაკლული user-id ჰედერი');
    }

    request.userId = userId;
    return true;
  }
}