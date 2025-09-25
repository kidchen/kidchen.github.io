import { pinyin } from 'pinyin'

/**
 * Convert Chinese text to URL-safe pinyin format
 * @param text - The text to convert (can contain Chinese and English)
 * @returns URL-safe string with Chinese converted to pinyin
 */
export function toPinyinSlug(text: string): string {
  // Convert Chinese characters to pinyin
  const pinyinResult = pinyin(text, {
    style: 'normal', // No tone marks
    heteronym: false, // Use most common pronunciation
    segment: true // Better word segmentation
  })
  
  // Join pinyin arrays and convert to lowercase
  const pinyinText = pinyinResult
    .map(item => Array.isArray(item) ? item[0] : item)
    .join('')
    .toLowerCase()
  
  // Replace spaces and special characters with hyphens, remove multiple hyphens
  return pinyinText
    .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Create a mapping of original text to pinyin slug
 * Used to maintain bidirectional conversion
 */
export function createPinyinMapping(texts: string[]): Record<string, string> {
  const mapping: Record<string, string> = {}
  
  texts.forEach(text => {
    mapping[text] = toPinyinSlug(text)
  })
  
  return mapping
}

/**
 * Find original text from pinyin slug
 */
export function findOriginalFromPinyin(pinyinSlug: string, mapping: Record<string, string>): string | null {
  for (const [original, pinyin] of Object.entries(mapping)) {
    if (pinyin === pinyinSlug) {
      return original
    }
  }
  return null
}
