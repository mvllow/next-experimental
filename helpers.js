import { db } from './firebase'

export const fetchConfig = async () => {
  let configUrl = `https://api.github.com/repos/vercel/next.js/contents/packages/next/build/webpack-config.ts`
  let configData = await fetch(configUrl).then((res) => res.json())

  if (configData) {
    let content = atob(configData.content)
    let matches = content.matchAll(/experimental\.(\w+)/g)
    let items = Array.from(matches, (m) => m[1])
    let uniqueItems = [...new Set(items)]

    uniqueItems.map((item) => {
      db.collection('options').doc(item).set(
        {
          name: item,
          updated: Date.now(),
        },
        { merge: true }
      )
    })
  }
}

export const fetchIssues = async (option) => {
  let cleanOption = option.trim().replace(' ', '+')
  let issuesUrl = `https://api.github.com/search/issues?q=${cleanOption}+repo:vercel/next.js`
  let issuesData = await fetch(issuesUrl).then((res) => res.json())

  if (issuesData) {
    let { items } = issuesData

    let issues = items.map((issue) => ({
      title: issue.title || 'Not available',
      url: issue.html_url || '',
    }))

    db.collection('options').doc(option).update({
      issues,
    })
  }
}
