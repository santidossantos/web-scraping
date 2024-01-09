import { UpdateFrequency } from './update-frequency'

export interface SiteForm {
  name: string
  domain: string
  maxDepth: string
  updateFrequency: UpdateFrequency
  extractor: string
  icon: string
}
