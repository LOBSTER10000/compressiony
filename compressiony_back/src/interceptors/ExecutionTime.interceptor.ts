import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


export class ExecutionTimeInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ExecutionTimeInterceptor.name);
    

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const startTime = Date.now();
        return next.handle().pipe(
            tap(()=>{
                const endTime = Date.now();
                const duration = endTime - startTime;
                this.logger.log('Execution Time :', duration)
            })
        )
    }
}