"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { motionVariants, motionViewport } from "@/lib/animations"
import { Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface Comment {
  id: string
  author: string
  authorEmail: string
  content: string
  date: string
  avatar?: string
}

interface CommentsSectionProps {
  initialComments?: Comment[]
  onCommentSubmit?: (comment: Comment) => void
}

export default function CommentsSection({ 
  initialComments = [], 
  onCommentSubmit 
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState({
    author: "",
    email: "",
    content: ""
  })

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newComment.author || !newComment.email || !newComment.content) {
      alert("Please fill in all fields")
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      authorEmail: newComment.email,
      content: newComment.content,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newComment.author)}&background=random`
    }

    setComments([...comments, comment])
    setNewComment({ author: "", email: "", content: "" })
    
    // Call optional callback
    if (onCommentSubmit) {
      onCommentSubmit(comment)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-6 h-6 text-blue-600" />
        <h2 className="text-3xl font-bold">Comments ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <Card className="mb-8 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <h3 className="text-xl font-semibold">Leave a Comment</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={newComment.author}
                  onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Comment *
              </label>
              <Textarea
                id="comment"
                placeholder="Share your thoughts..."
                rows={4}
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="py-12 text-center text-slate-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                            {comment.author}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {comment.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
