"use client"

import type React from "react"
import {useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { askGeminiWithContext, askGeminiWithContextAndHistory } from "@/lib/gemini-service"
import { getUserHealthContext } from "@/lib/getUserHealthContext" // Import the utility
import { 
    MessageSquare,
    Send,
  } from "lucide-react"

export default function AiChatbot() {
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hello! I'm your health assistant. How can I help you today?" },
  ])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessages = [...chatMessages, { role: "user", content: chatInput }]
    setChatMessages(newMessages)
    setChatInput("")

    setChatMessages([
      ...newMessages,
      { role: "assistant", content: "Analyzing your health data..." },
    ])

    try {
      // Dynamically fetch the user's health context
      const userHealthContext = await getUserHealthContext("mock-user-id")

      // Pass the user input and context to the LLM
      //const response = await askGeminiWithContext(chatInput, userHealthContext)
      const response = await askGeminiWithContextAndHistory(chatInput, userHealthContext, chatMessages)
      setChatMessages([
        ...newMessages,
        { role: "assistant", content: response },
      ])
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error)
      setChatMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn't process your request. Please try again later.",
        },
      ])
    }
 }
 return (
 <div>
 <Card className="h-[calc(100vh-8rem)]">
   <CardHeader>
     <CardTitle className="flex items-center gap-2">
       <MessageSquare className="h-5 w-5" />
       AI Assistant
     </CardTitle>
     <CardDescription>Ask questions about your health data</CardDescription>
   </CardHeader>
   <CardContent>
     <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
       <div className="flex flex-col gap-4">
         {chatMessages.map((message, index) => (
           <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
             <div
               className={`rounded-lg px-4 py-2 max-w-[80%] ${
                 message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
               }`}
             >
               <p className="text-sm">{message.content}</p>
             </div>
           </div>
         ))}
       </div>
     </ScrollArea>
   </CardContent>
   <CardFooter>
     <form onSubmit={handleSendMessage} className="flex w-full gap-2">
       <Input
         placeholder="Ask about your health data..."
         value={chatInput}
         onChange={(e) => setChatInput(e.target.value)}
         className="flex-1"
       />
       <Button type="submit" size="icon">
         <Send className="h-4 w-4" />
       </Button>
     </form>
   </CardFooter>
 </Card>
</div>
)
}