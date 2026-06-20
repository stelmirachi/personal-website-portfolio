import { defineField, defineType } from 'sanity'

export const linkedinPost = defineType({
  name: 'linkedinPost',
  title: 'LinkedIn Post',
  type: 'document',
  fields: [
    defineField({
      name: 'linkedinId',
      title: 'LinkedIn Post ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Post Text',
      type: 'text',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'hidden',
      title: 'Hide from site',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'publishedAt',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title ? (title.length > 50 ? `${title.slice(0, 50)}...` : title) : 'No text',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date',
      }
    }
  }
})
