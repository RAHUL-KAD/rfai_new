// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        summary: { type: 'string', required: false },
        authors: { type: 'list', of: { type: 'string' } },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
    },
    computedFields: {
        url: { type: 'string', resolve: (post) => `/blog/${post._raw.flattenedPath}` },
    },
}))

export default makeSource({ contentDirPath: 'blog', documentTypes: [Post] })