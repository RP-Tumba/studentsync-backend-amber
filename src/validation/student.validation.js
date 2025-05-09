import { body } from "express-validator";

export const validations= [
    body('first_name')
    .notEmpty().withMessage('first name is required')
    .bail()
    .isAlpha().withMessage('first name must contain only character'),

    body('last_name')
    .notEmpty().withMessage('last name is required')
    .bail()
    .isAlpha().withMessage('last name must contain only character'),
    body('student_id')
    .notEmpty().withMessage('student id is required'),
    body('email')
    .notEmpty().withMessage('email is required')
    .bail()
    .isEmail().withMessage('incorrect Email format'),

    body('date_of_birth')
    .notEmpty().withMessage('DOB is required')
    .bail()
    .isDate().withMessage('Invalid  DOB format  (YYYY-MM-DD expected)'),

    body('contact_number')
    .notEmpty().withMessage('contact is required')
    .bail()
    .isMobilePhone().withMessage('invalid contact use only number'),
  
    

    body('enrollment_date')
    .notEmpty().withMessage('enroll date required')
    .bail()
    .isDate().withMessage('Invalid Enroll Date format (YY-MM-DD expected)')
]