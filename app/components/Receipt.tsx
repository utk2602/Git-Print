import { motion } from 'framer-motion'

interface ReceiptProps {
  data: {
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
}

function generateBarcodeDigits(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

export function Receipt({ data }: ReceiptProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const orderNumber = Math.floor(10000 + Math.random() * 90000);
  const barcodeDigits = generateBarcodeDigits(12);

  return (
    <motion.div 
      className="bg-receipt text-black p-8 rounded-lg shadow-lg font-receipt max-w-md mx-auto relative overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="receipt-texture absolute inset-0 opacity-5"></div>
      <div className="relative z-10">
        <div className="border-b-2 border-dashed border-gray-400 pb-4 mb-4">
          <h1 className="text-center font-bold text-3xl mb-2 receipt-title">GITHUB RECEIPT</h1>
          <p className="text-center text-sm">{currentDate}</p>
          <p className="text-center text-gray-600 text-sm">ORDER #{orderNumber}</p>
        </div>
        
        <div className="mb-6">
          <p className="font-bold">CUSTOMER: {data.name}</p>
          <p className="text-gray-600">@{data.username}</p>
        </div>
        
        <div className="space-y-2 mb-6">
          {[
            ['REPOSITORIES', data.repositories],
            ['STARS EARNED', data.stars],
            ['REPO FORKS', data.forks],
            ['FOLLOWERS', data.followers],
            ['FOLLOWING', data.following],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-gray-600">{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-1">TOP LANGUAGES:</p>
          <p className="font-bold">{data.topLanguages.join(', ')}</p>
        </div>
        
        <div className="space-y-2 mb-6">
          {[
            ['MOST ACTIVE DAY', data.mostActiveDay],
            ['COMMITS (30d)', data.commits],
            ['CONTRIBUTION SCORE', data.contributionScore],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-gray-600">{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t-2 border-dashed border-gray-400 pt-4">
          <p className="text-center text-sm">Served by: GitPrint</p>
          <p className="text-center text-gray-600 text-sm">{currentTime}</p>
          <div className="mt-4">
            <p className="text-center font-bold">COUPON CODE: {Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
            <p className="text-center text-gray-600 text-xs">Save for your next commit!</p>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            <p>CARD #: **** **** **** {Math.floor(1000 + Math.random() * 9000)}</p>
            <p>AUTH CODE: {Math.floor(100000 + Math.random() * 900000)}</p>
            <p>CARDHOLDER: {data.username}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="barcode-container">
              {barcodeDigits.split('').map((digit, index) => (
                <div key={index} className="barcode-line" style={{ width: `${parseInt(digit) + 1}px` }}></div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs mt-2">{barcodeDigits}</p>
        </div>
      </div>
    </motion.div>
  )
}

