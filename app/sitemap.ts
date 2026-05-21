import {MetadataRoute} from 'next'
export default function sitemap() : MetadataRoute.Sitemap{
  return [
    {
      url : 'https://www.patternflowdsa.in',
      lastModified : new Date(),
    },
    {
      url : 'https://www.patternflowdsa.in/patterns',
      lastModified : new Date(),
    },
    {
      url : 'https://www.patternflowdsa.in/solve',
      lastModified : new Date(),
    },
  ]
}
