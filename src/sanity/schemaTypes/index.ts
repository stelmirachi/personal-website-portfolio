import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { linkedinPost } from './linkedinPost'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, linkedinPost],
}
