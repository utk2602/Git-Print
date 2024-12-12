'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Github, Code, Download } from 'lucide-react'
import { Receipt } from './Receipt'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { generateReceiptText } from "@/utils/generateReceiptText"

export default function GitHubReceipt() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [error, setError] = useState('')
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setReceiptData(null)
    
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch GitHub data')
      }
      
      setReceiptData(data)
    } catch (err) {
      setError('Failed to generate receipt. Please check the username and try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if ( receiptData) {
      const receiptText = generateReceiptText(receiptData)
      const blob = new Blob([receiptText], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${receiptData.username}_github_receipt.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">GitPrint</CardTitle>
        <CardDescription className="text-center">Capture your GitHub footprint in a sleek, receipt-style printout</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Github className="text-gray-400" />
            <Input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-grow"
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Receipt'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-center">
        <motion.div
          className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Code className="w-4 h-4" />
          <span>Crafted with ❤️ by utkarsh</span>
        </motion.div>
      </CardFooter>

      <AnimatePresence>
        {receiptData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Receipt data={receiptData} />
            <div className="mt-4 flex justify-center">
              <Button onClick={handleDownload} className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Receipt</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </Card>
  )
}

