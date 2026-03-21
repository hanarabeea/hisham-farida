"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function MessageSection() {
  const [name, setName] = useState('')
  const [textMessage, setTextMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messageStatus, setMessageStatus] = useState({ text: '', type: '' as 'success' | 'error' | 'info' | '' })

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setMessageStatus({ text: "Please enter your name", type: 'error' })
      return
    }

    if (!textMessage.trim()) {
      setMessageStatus({ text: "Please write a message", type: 'error' })
      return
    }

    setIsSending(true)
    setMessageStatus({ text: "Sending your message...", type: 'info' })

    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('message', textMessage.trim())

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      })

      const contentType = response.headers.get('content-type') || ''
      let responseData: any = null
      if (contentType.includes('application/json')) {
        try {
          responseData = await response.json()
        } catch (err) {
          const rawText = await response.text().catch(() => '')
          responseData = { raw: rawText }
        }
      } else {
        const rawText = await response.text().catch(() => '')
        responseData = { raw: rawText }
      }

      if (!response.ok) {
        const msg = responseData?.message || responseData?.error || 'Failed to send message'
        throw new Error(msg)
      }

      if (!responseData.success) {
        throw new Error(responseData.message || 'Message sending failed')
      }

      setMessageStatus({ 
        text: "Message sent successfully!",
        type: 'success'
      })
      
      setName('')
      setTextMessage('')
      
    } catch (error) {
      console.error('Error sending message:', error)
      setMessageStatus({ 
        text: error instanceof Error ? error.message : "Failed to send message", 
        type: 'error' 
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="message" className="py-16 px-4 md:py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Leave Us a Message</h2>
          <p className="text-gray-600 text-center mb-8 text-lg">Leave a lovely message for the couple</p>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          
          <div className="bg-white/90 p-8 md:p-10 rounded-lg shadow-lg max-w-2xl mx-auto border-t-4 border-accent">
            <form onSubmit={sendEmail} className="space-y-6 text-left">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  required
                />
              </div>

              <div>
                <label htmlFor="textMessage" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="textMessage"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  placeholder="Write your wishes here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-y"
                  required
                />
              </div>
              
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 text-white bg-accent rounded-md hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium whitespace-nowrap"
                  disabled={isSending}
                >
                  {isSending ? "Sending Message..." : "Send Message"}
                </button>
              </div>

              {messageStatus.text && (
                <div className={`mt-6 p-4 rounded-md text-center ${
                  messageStatus.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 
                  messageStatus.type === 'info' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
                  'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {messageStatus.text}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
