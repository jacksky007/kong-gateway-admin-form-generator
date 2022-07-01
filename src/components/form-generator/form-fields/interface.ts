import { FieldType } from '../interface'

export interface FormFieldProps<T extends FieldType> {
  name: string
  schema: T
}
