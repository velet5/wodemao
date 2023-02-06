import LRU from 'lru-cache'

export class WodemaoClient {
  async parse(text: string): Promise<ParseResult> {
    const result = await this.cache.fetch(text)
    if (result) {
      return result
    } else {
      return Promise.reject(new Error('Failed to parse text'))
    }
  }

  private async parse0(text: String): Promise<ParseResult> {
    const response = await fetch(
      'https://wodemao-server.everyday.fail/tokenize',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }
    )
    const json = await response.json()
    return {
      fine: json.fine,
    }
  }

  private cache = new LRU<string, ParseResult>({
    max: 1000,
    ttl: 1000 * 60 * 60 * 24,
    allowStale: true,
    updateAgeOnGet: true,
    fetchMethod: async (text: string) => {
      return await this.parse0(text)
    },
  })
}

export interface ParseResult {
  fine: string[][]
}
