import { createFuzzyMatcher } from 'routes/MainPage/utils/getConsonantSearch'

interface IHighLightItemProps {
  text: string
  query: string
}

const HighLightItem = ({ text, query }: IHighLightItemProps) => {
  const regex = createFuzzyMatcher(query)

  const highlightedItem = text.replace(regex, (match, ...groups) => {
    const letters = groups.slice(0, query.length)
    // console.log(`matchk: ${match}  , groups: ${groups} letters: ${letters}`)
    let lastIndex = 0
    const highlighted: string[] = []
    for (let i = 0, l = letters.length; i < l; i += 1) {
      const idx = match.indexOf(letters[i], lastIndex)
      highlighted.push(match.substring(lastIndex, idx))
      highlighted.push(`<mark>${letters[i]}</mark>`)
      lastIndex = idx + 1
    }
    return highlighted.join('')
  })

  return highlightedItem
}

export default HighLightItem