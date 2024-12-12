import { NextResponse } from 'next/server'

async function fetchGitHubData(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }
  const userData = await response.json()
  
  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
  if (!reposResponse.ok) {
    throw new Error('Failed to fetch repository data')
  }
  const reposData = await reposResponse.json()
  
  const languages = reposData.reduce((acc: Record<string, number>, repo: any) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1
    }
    return acc
  }, {})
  
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([lang]) => lang)
    
  return {
    username: userData.login,
    name: userData.name || userData.login,
    repositories: userData.public_repos,
    stars: reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
    forks: reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0),
    followers: userData.followers,
    following: userData.following,
    topLanguages,
    contributionScore: Math.floor(Math.random() * 100),
    mostActiveDay: 'Aur ghaso bhai',
    commits: 21,
  }
}

export async function POST(request: Request) {
  try {
    const { username } = await request.json()
    const data = await fetchGitHubData(username)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
}
