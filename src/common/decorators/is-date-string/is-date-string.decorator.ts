import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from 'class-validator';
  
  @ValidatorConstraint({ async: true })
  export class IsDateStringConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d$/;
      return typeof value === 'string' && dateRegex.test(value);
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Date must be in DD/MM/YYYY format';
    }
  }
  
  export function IsDateString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsDateString',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: IsDateStringConstraint,
      });
    };
  }
  