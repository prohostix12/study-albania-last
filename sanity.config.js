import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(),
  ],
})
