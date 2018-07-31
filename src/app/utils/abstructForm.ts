import { FormControl, Validators} from '@angular/forms';

export abstract class AbstructForm {
    public getFormContol(value: any, config?: object) {
        const validators = [];
        // if (Object.keys(config).length === 0) {
        //     return new FormControl(value);
        // }
        for (const key in config) {
            if (config.hasOwnProperty(key)) {
                if (typeof config[key] === 'boolean' && config[key]) {
                    validators.push(Validators[key]);
                } else {
                    validators.push(Validators[key](config[key]));
                }
            }
        }
        return new FormControl(value, validators);
    }
}