import { format } from 'date-fns'

interface ReceiptData {
  username: string
  name: string
  repositories: number
  stars: number
  forks: number
  followers: number
  following: number
  topLanguages: string[]
  contributionScore: number
  mostActiveDay: string
  commits: number
}

export function generateReceiptText(data: ReceiptData): string {
  const currentDate = format(new Date(), 'MMMM d, yyyy')
  const currentTime = format(new Date(), 'h:mm a')
  const orderNumber = Math.floor(10000 + Math.random() * 90000)

  return `
GITHUB RECEIPT
${currentDate}
ORDER #${orderNumber}

CUSTOMER: ${data.name}
@${data.username}

REPOSITORIES: ${data.repositories}
STARS EARNED: ${data.stars}
REPO FORKS: ${data.forks}
FOLLOWERS: ${data.followers}
FOLLOWING: ${data.following}

TOP LANGUAGES: ${data.topLanguages.join(', ')}

MOST ACTIVE DAY: ${data.mostActiveDay}
COMMITS (30d): ${data.commits}
CONTRIBUTION SCORE: ${data.contributionScore}

Served by: GitPrint
${currentTime}

COUPON CODE: ${Math.random().toString(36).substring(2, 8).toUpperCase()}
Save for your next commit!

CARD #: **** **** **** ${Math.floor(1000 + Math.random() * 9000)}
AUTH CODE: ${Math.floor(100000 + Math.random() * 900000)}
CARDHOLDER: ${data.username}

Thank you for using GitPrint!
`.trim()
}

