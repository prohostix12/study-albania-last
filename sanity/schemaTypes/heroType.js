export const heroType = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'titlePrefix',
      title: 'Title Prefix (e.g. Study in)',
      type: 'string',
    },
    {
      name: 'titleAccent',
      title: 'Title Accent (e.g. Albania)',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    },
    {
      name: 'videoUrl',
      title: 'Background Video URL (optional)',
      type: 'url',
    },
    {
      name: 'posterImage',
      title: 'Fallback/Poster Image',
      type: 'image',
    }
  ],
}
