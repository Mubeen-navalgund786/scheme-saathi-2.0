import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Send, 
  Square, 
  Mic, 
  Menu, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink, 
  CheckCircle2, 
  CheckSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatSidebar } from '../components/ChatSidebar';
import { ThemeToggle } from '../components/ThemeToggle';
import { SchemeCard } from '../components/SchemeCard';
import { FeedbackModal } from '../components/FeedbackModal';
import { generateLocalReply, BotResponseResult } from '../lib/responder';
import { ChatMessage, FeedbackData } from '../types';

export const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const { 
    user, 
    chats, 
    currentChatId, 
    setCurrentChatId, 
    createNewChat, 
    appendMessage, 
    updateFeedback, 
    showToast,
    t
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [streamingTargetResult, setStreamingTargetResult] = useState<BotResponseResult | null>(null);
  const [micTooltip, setMicTooltip] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [activeFeedbackMessageId, setActiveFeedbackMessageId] = useState<string | null>(null);
  const [thanksMessageId, setThanksMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isCancelledRef = useRef(false);

  // Sync active chat session
  const activeChatId = chatId || currentChatId;
  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    if (chatId) {
      if (chatId !== currentChatId) {
        setCurrentChatId(chatId);
      }
    } else {
      if (chats.length > 0) {
        const idToSelect = currentChatId && chats.some((c) => c.id === currentChatId)
          ? currentChatId
          : chats[0].id;
        setCurrentChatId(idToSelect);
        navigate(`/chat/${idToSelect}`, { replace: true });
      } else {
        const newId = createNewChat();
        navigate(`/chat/${newId}`, { replace: true });
      }
    }
  }, [chatId, chats, currentChatId, setCurrentChatId, navigate, createNewChat]);

  // Scroll to bottom whenever messages change or streaming updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isTyping, streamedText]);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }
    };
  }, []);

  const suggestionChips = [
    'Schemes for farmers',
    'Check my eligibility',
    'Documents needed',
    'Scholarships for students',
    'Schemes for women entrepreneurs',
    'Health schemes',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isStreaming || isTyping) return;

    let targetChatId = activeChatId;
    if (!targetChatId) {
      targetChatId = createNewChat();
      navigate(`/chat/${targetChatId}`, { replace: true });
    }

    const userMsg: ChatMessage = {
      id: 'msg-u-' + Date.now(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    // Append user message
    appendMessage(targetChatId, userMsg);
    setInputText('');

    // Start bot reply workflow
    executeBotReply(targetChatId, text);
  };

  const executeBotReply = (chatSessionId: string, query: string) => {
    setIsTyping(true);
    isCancelledRef.current = false;

    // 1. Show typing indicator for about 600ms
    setTimeout(() => {
      if (isCancelledRef.current) {
        setIsTyping(false);
        return;
      }
      setIsTyping(false);

      // 2. Generate local reply
      const reply = generateLocalReply(query, user);
      setStreamingTargetResult(reply);
      setIsStreaming(true);

      const words = reply.text.split(' ');
      let currentWordIndex = 0;
      let accumulated = '';

      // Stream word by word (~25ms per word)
      streamTimerRef.current = setInterval(() => {
        if (isCancelledRef.current) {
          if (streamTimerRef.current) clearInterval(streamTimerRef.current);
          setIsStreaming(false);
          finalizeMessage(chatSessionId, accumulated, reply);
          return;
        }

        if (currentWordIndex < words.length) {
          accumulated += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
          setStreamedText(accumulated);
          currentWordIndex++;
        } else {
          if (streamTimerRef.current) clearInterval(streamTimerRef.current);
          setIsStreaming(false);
          finalizeMessage(chatSessionId, accumulated, reply);
        }
      }, 25);
    }, 600);
  };

  const handleStopStreaming = () => {
    isCancelledRef.current = true;
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
    }
    setIsStreaming(false);
    setIsTyping(false);

    if (activeChatId && streamingTargetResult) {
      finalizeMessage(activeChatId, streamedText, streamingTargetResult);
    }
  };

  const finalizeMessage = (
    chatSessionId: string,
    completedText: string,
    targetResult: BotResponseResult
  ) => {
    // If it's a safety warning, do not save or attach sensitive content
    if (targetResult.isSafetyWarning) {
      const botMsg: ChatMessage = {
        id: 'msg-b-' + Date.now(),
        role: 'assistant',
        text: targetResult.text,
        timestamp: Date.now(),
      };
      appendMessage(chatSessionId, botMsg);
      setStreamedText('');
      setStreamingTargetResult(null);
      return;
    }

    const botMsg: ChatMessage = {
      id: 'msg-b-' + Date.now(),
      role: 'assistant',
      text: completedText || targetResult.text,
      timestamp: Date.now(),
      schemes: targetResult.schemes,
      actionButton: targetResult.actionButton,
    };

    appendMessage(chatSessionId, botMsg);
    setStreamedText('');
    setStreamingTargetResult(null);
  };

  const handleThumbsUp = (msgId: string) => {
    if (!activeChatId) return;
    const fb: FeedbackData = {
      rating: 'up',
      timestamp: Date.now(),
    };
    updateFeedback(activeChatId, msgId, fb);
    setThanksMessageId(msgId);
    setTimeout(() => {
      setThanksMessageId((prev) => (prev === msgId ? null : prev));
    }, 2000);
  };

  const handleOpenThumbsDown = (msgId: string) => {
    setActiveFeedbackMessageId(msgId);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    if (activeChatId && activeFeedbackMessageId) {
      updateFeedback(activeChatId, activeFeedbackMessageId, feedback);
      showToast('Feedback submitted. Thank you!', 'success');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicClick = () => {
    setMicTooltip(true);
    setTimeout(() => {
      setMicTooltip(false);
    }, 2500);
  };

  const currentMessages = activeChat?.messages || [];

  return (
    <div className="flex h-screen bg-[var(--color-bg)] overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-[var(--color-bg)] relative">
        {/* Header */}
        <header className="h-14 px-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 md:hidden text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-xl hover:bg-[var(--color-surface-subtle)]"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-bold text-[var(--color-text)] truncate">
              {activeChat?.title || 'Scheme Saathi Chat'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Message List */}
        <div 
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
          role="region"
          aria-label="Chat messages"
        >
          {currentMessages.length === 0 && !isTyping && !isStreaming ? (
            /* Empty Chat State */
            <div className="max-w-xl mx-auto py-12 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center font-bold text-xl shadow-md mb-4">
                <CheckSquare className="w-8 h-8 text-[#FBF8F1]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)] tracking-tight">
                Ask about a government scheme
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2 mb-6 max-w-md mx-auto leading-relaxed">
                {t.greeting}
              </p>

              <div className="flex flex-nowrap sm:grid sm:grid-cols-2 gap-3 text-left overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleSendMessage(chip)}
                    className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text)] shadow-xs transition-all flex items-center justify-between group active:scale-98 shrink-0 w-64 sm:w-auto"
                  >
                    <span>{chip}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    /* User Bubble */
                    <div className="max-w-lg bg-[#1F6B4A] text-[#FBF8F1] px-4.5 py-3 rounded-2xl rounded-tr-xs text-sm font-medium shadow-xs leading-relaxed break-words">
                      {msg.text}
                    </div>
                  ) : (
                    /* Bot Bubble */
                    <div className="flex items-start gap-3 max-w-2xl w-full" aria-live="polite">
                      <div className="w-8 h-8 rounded-xl bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                        SS
                      </div>
                      <div className="space-y-3 flex-1 min-w-0">
                        {/* Text bubble */}
                        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4.5 py-3.5 rounded-2xl rounded-tl-xs text-sm shadow-xs leading-relaxed whitespace-pre-wrap break-words">
                          {msg.text}

                          {msg.actionButton && (
                            <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
                              <button
                                type="button"
                                onClick={() => navigate(msg.actionButton!.route)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[#1B2A22] text-xs font-bold shadow-xs hover:brightness-95 transition-colors"
                              >
                                <span>{msg.actionButton.label}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Attached Scheme Cards */}
                        {msg.schemes && msg.schemes.length > 0 && (
                          <div className="space-y-3">
                            {msg.schemes.map((scheme) => (
                              <SchemeCard key={scheme.id} scheme={scheme} />
                            ))}
                          </div>
                        )}

                        {/* Feedback Row */}
                        <div className="flex items-center gap-3 pt-1 text-xs text-[var(--color-muted)]">
                          {thanksMessageId === msg.id ? (
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md animate-in fade-in duration-150">
                              Thanks for your feedback
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px]">Was this helpful?</span>
                              <button
                                type="button"
                                onClick={() => handleThumbsUp(msg.id)}
                                className={`p-1.5 rounded-lg hover:bg-[var(--color-surface-subtle)] transition-colors ${
                                  msg.feedback?.rating === 'up'
                                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                                }`}
                                aria-label="Thumbs up"
                                title="Helpful"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenThumbsDown(msg.id)}
                                className={`p-1.5 rounded-lg hover:bg-[var(--color-surface-subtle)] transition-colors ${
                                  msg.feedback?.rating === 'down'
                                    ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                                }`}
                                aria-label="Thumbs down"
                                title="Not helpful"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-3 max-w-2xl" aria-live="polite">
                  <div className="w-8 h-8 rounded-xl bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    SS
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Streaming bubble */}
              {isStreaming && (
                <div className="flex items-start gap-3 max-w-2xl" aria-live="polite">
                  <div className="w-8 h-8 rounded-xl bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    SS
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4.5 py-3.5 rounded-2xl rounded-tl-xs text-sm shadow-xs leading-relaxed whitespace-pre-wrap break-words">
                    {streamedText}
                    <span className="inline-block w-2 h-4 ml-1 bg-[var(--color-primary)] animate-pulse align-middle" />
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips Bar */}
        <div className="px-4 py-2 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]/60 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
          {suggestionChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSendMessage(chip)}
              disabled={isStreaming || isTyping}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] hover:border-[var(--color-primary)] text-[var(--color-text)] transition-colors shrink-0 disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface-subtle)] focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent transition-all">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 1000))}
                onKeyDown={handleKeyDown}
                placeholder={t.askPlaceholder || "Ask about a scheme or service"}
                rows={2}
                disabled={isStreaming}
                className="w-full p-3.5 pr-24 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-hidden resize-none"
              />

              {/* Action buttons inside textarea */}
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                {/* Voice Input Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleMicClick}
                    className="p-2 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                    aria-label="Voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Mic Tooltip */}
                  {micTooltip && (
                    <div
                      role="tooltip"
                      className="absolute bottom-full right-0 mb-2 px-2.5 py-1 text-[11px] font-semibold text-[#FBF8F1] bg-[#1B2A22] rounded-md shadow-lg whitespace-nowrap animate-in fade-in duration-150 z-30"
                    >
                      Voice input is coming soon
                    </div>
                  )}
                </div>

                {/* Send or Stop button */}
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={handleStopStreaming}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors"
                    title="Stop streaming response"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[#FBF8F1] transition-colors disabled:opacity-40 disabled:hover:bg-[var(--color-primary)] shadow-xs"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Character counter & Disclaimer */}
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-[var(--color-muted)]">
              <span>{t.shortDisclaimer || 'Informational only. Always apply on the official government portal.'}</span>
              <span className={inputText.length > 900 ? 'text-amber-600 font-bold' : ''}>
                {inputText.length} / 1000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback modal for thumbs down */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};
