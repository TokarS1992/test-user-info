import { Observable } from "rxjs/observable";

export abstract class ErrorsTypes {
    public handleCatchError(err: any) {
        return Observable.throwError(err);
    }
};