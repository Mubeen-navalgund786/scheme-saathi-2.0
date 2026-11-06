import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Send, 
  Square, 
  Mic, 
  Menu, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  CheckSquare,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatSidebar } from '../components/ChatSidebar';
import { ThemeToggle } from '../components/ThemeToggle';
import { SchemeCard } from '../components/SchemeCard';
import { FeedbackModal } from '../components/FeedbackModal';
import { generateLocalReply, getLocalizedMessageText, BotResponseResult } from '../lib/responder';
import { ChatMessage, FeedbackData } from '../types';

/**
 * Parses inline formatting: markdown links [label](url), raw URLs, bold **text**, and italic *text*.
 */
function renderFormattedInline(text: string): React.ReactNode {
  if (!text) return null;

  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s)]+)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2] && match[3]) {
      const label = match[2];
      const url = match[3];
      nodes.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] font-semibold underline hover:brightness-90 inline-flex items-center gap-1 break-all"
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 inline-block shrink-0" aria-hidden="true" />
        </a>
      );
    } else if (match[4]) {
      const url = match[4];
      nodes.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] font-semibold underline hover:brightness-90 inline-flex items-center gap-1 break-all"
        >
          <span>{url}</span>
          <ExternalLink className="w-3 h-3 inline-block shrink-0" aria-hidden="true" />
        </a>
      );
    } else if (match[5]) {
      const boldText = match[5].slice(2, -2);
      nodes.push(
        <strong key={match.index} className="font-bold text-[var(--color-text)]">
          {renderFormattedInline(boldText)}
        </strong>
      );
    } else if (match[6]) {
      const italicText = match[6].slice(1, -1);
      nodes.push(
        <em key={match.index} className="italic text-[var(--color-muted)]">
          {renderFormattedInline(italicText)}
        </em>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : text;
}

/**
 * Structured renderer for bot responses with headings, checklists, tables, and links.
 */
const MessageTextRenderer: React.FC<{ content: string; isStreaming?: boolean }> = ({ content, isStreaming }) => {
  const blocks = content.split('\n\n');

  return (
    <div className="space-y-3 text-sm leading-relaxed break-words">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headings: ### Heading
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '');
          return (
            <h3
              key={bIdx}
              className="text-base font-bold text-[var(--color-text)] pt-1 pb-1.5 border-b border-[var(--color-border-subtle)]"
            >
              {renderFormattedInline(headingText)}
            </h3>
          );
        }

        // Markdown Table: | col1 | col2 |
        if (
          trimmed.includes('|') &&
          trimmed.split('\n').filter(Boolean).length >= 2 &&
          trimmed.split('\n').every((l) => l.trim().startsWith('|') && l.trim().endsWith('|'))
        ) {
          const rows = trimmed.split('\n').map((r) => r.trim()).filter(Boolean);
          const headerRow = rows[0].slice(1, -1).split('|').map((c) => c.trim());
          const dataRows = rows.slice(2).map((r) => r.slice(1, -1).split('|').map((c) => c.trim()));
          return (
            <div key={bIdx} className="overflow-x-auto my-2 rounded-xl border border-[var(--color-border)]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)]">
                  <tr>
                    {headerRow.map((cell, cIdx) => (
                      <th key={cIdx} className="p-2.5 font-bold text-[var(--color-text)]">
                        {renderFormattedInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                  {dataRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[var(--color-surface-subtle)]/50">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2.5 text-[var(--color-text)]">
                          {renderFormattedInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Standard lines in block
        const lines = block.split('\n');
        return (
          <div key={bIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const lTrim = line.trim();
              if (!lTrim) return null;

              // Bullet item: • or -
              if (lTrim.startsWith('• ') || lTrim.startsWith('- ')) {
                const text = lTrim.replace(/^[•-]\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1">
                    <span className="text-[var(--color-primary)] font-bold shrink-0 mt-0.5">•</span>
                    <span className="flex-1">{renderFormattedInline(text)}</span>
                  </div>
                );
              }

              // Question / info indicator: ❓
              if (lTrim.startsWith('❓ ')) {
                const text = lTrim.replace(/^❓\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                    <span className="text-amber-600 font-bold shrink-0">❓</span>
                    <span className="flex-1 font-medium">{renderFormattedInline(text)}</span>
                  </div>
                );
              }

              // Ineligibility / exclusion indicator: ❌
              if (lTrim.startsWith('❌ ')) {
                const text = lTrim.replace(/^❌\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 text-xs">
                    <span className="text-rose-600 font-bold shrink-0">❌</span>
                    <span className="flex-1">{renderFormattedInline(text)}</span>
                  </div>
                );
              }

              // Numbered list item: 1. ...
              if (/^\d+\.\s+/.test(lTrim)) {
                const match = lTrim.match(/^(\d+\.)\s+(.*)/);
                if (match) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-1">
                      <span className="text-[var(--color-primary)] font-bold text-xs shrink-0 mt-0.5">
                        {match[1]}
                      </span>
                      <span className="flex-1">{renderFormattedInline(match[2])}</span>
                    </div>
                  );
                }
              }

              return <p key={lIdx}>{renderFormattedInline(line)}</p>;
            })}
          </div>
        );
      })}
      {isStreaming && (
        <span
          className="inline-block w-2 h-4 ml-1 bg-[var(--color-primary)] animate-pulse align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

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
    language,
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
  
  // Transient safety messages (displayed on screen, but NEVER saved to localStorage)
  const [transientSafetyMessages, setTransientSafetyMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isCancelledRef = useRef(false);

  // Sync active chat session
  const activeChatId = chatId || currentChatId || (chats.length > 0 ? chats[0].id : null);
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
        if (currentChatId !== idToSelect) {
          setCurrentChatId(idToSelect);
        }
      } else {
        const newId = createNewChat();
        setCurrentChatId(newId);
      }
    }
  }, [chatId, chats, currentChatId, setCurrentChatId, createNewChat]);

  // Scroll to bottom whenever messages change or streaming updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, transientSafetyMessages, isTyping, streamedText]);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }
    };
  }, []);

  const suggestionChips = [
    { label: t.suggestionFarmer || 'Schemes for farmers', query: t.suggestionFarmer || 'Schemes for farmers' },
    { label: t.suggestionEligibility || 'Check my eligibility', query: t.suggestionEligibility || 'Check my eligibility' },
    { label: t.suggestionDocs || 'Documents needed', query: t.suggestionDocs || 'Documents needed' },
    { label: t.suggestionStudent || 'Scholarships for students', query: t.suggestionStudent || 'Scholarships for students' },
    { label: t.suggestionWomen || 'Schemes for women entrepreneurs', query: t.suggestionWomen || 'Schemes for women entrepreneurs' },
    { label: t.suggestionHealth || 'Health schemes', query: t.suggestionHealth || 'Health schemes' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isStreaming || isTyping) return;

    // Reset textarea height and text
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    let targetChatId = activeChatId;
    if (!targetChatId) {
      targetChatId = createNewChat();
    }

    // Safety rule check and intent generation with active conversation history and selected language
    const reply = generateLocalReply(text, user, activeChat?.messages, language);
    if (reply.isSafetyWarning) {
      const ephemeralUserMsg: ChatMessage = {
        id: 'msg-transient-u-' + Date.now(),
        role: 'user',
        text,
        createdAt: Date.now(),
        timestamp: Date.now(),
        isSafetyWarning: true,
        language,
      };
      const ephemeralBotMsg: ChatMessage = {
        id: 'msg-transient-b-' + Date.now(),
        role: 'bot',
        text: reply.text,
        createdAt: Date.now(),
        timestamp: Date.now(),
        isSafetyWarning: true,
        language,
      };

      setTransientSafetyMessages((prev) => [...prev, ephemeralUserMsg, ephemeralBotMsg]);
      return;
    }

    // Normal message flow: save user message to chat
    const userMsg: ChatMessage = {
      id: 'msg-u-' + Date.now(),
      role: 'user',
      text,
      schemeIds: [],
      createdAt: Date.now(),
      timestamp: Date.now(),
      language,
    };

    appendMessage(targetChatId, userMsg);

    // Start bot reply workflow with ~600ms animated typing dots
    executeBotReply(targetChatId, text, reply);
  };

  const executeBotReply = (chatSessionId: string, _query: string, precomputedReply: BotResponseResult) => {
    setIsTyping(true);
    isCancelledRef.current = false;

    // 1. Show typing indicator for about 600ms
    setTimeout(() => {
      if (isCancelledRef.current) {
        setIsTyping(false);
        return;
      }
      setIsTyping(false);

      setStreamingTargetResult(precomputedReply);
      setIsStreaming(true);

      const words = precomputedReply.text.split(' ');
      let currentWordIndex = 0;
      let accumulated = '';

      // 2. Stream word by word (about 25ms per word) with a blinking cursor
      streamTimerRef.current = setInterval(() => {
        if (isCancelledRef.current) {
          if (streamTimerRef.current) clearInterval(streamTimerRef.current);
          setIsStreaming(false);
          finalizeMessage(chatSessionId, accumulated, precomputedReply);
          return;
        }

        if (currentWordIndex < words.length) {
          accumulated += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
          setStreamedText(accumulated);
          currentWordIndex++;
        } else {
          if (streamTimerRef.current) clearInterval(streamTimerRef.current);
          setIsStreaming(false);
          finalizeMessage(chatSessionId, accumulated, precomputedReply);
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
    const botMsg: ChatMessage = {
      id: 'msg-b-' + Date.now(),
      role: 'bot',
      text: completedText || targetResult.text,
      createdAt: Date.now(),
      timestamp: Date.now(),
      schemeIds: targetResult.schemes?.map((s) => s.id) || [],
      schemes: targetResult.schemes,
      actionButton: targetResult.actionButton,
      language,
      intent: targetResult.intent,
      targetSchemeId: targetResult.schemes?.[0]?.id,
    };

    appendMessage(chatSessionId, botMsg);
    setStreamedText('');
    setStreamingTargetResult(null);
  };

  const handleThumbsUp = (msgId: string) => {
    if (!activeChatId) return;
    const fb: FeedbackData = {
      messageId: msgId,
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
      showToast('Feedback saved. Thank you!', 'success');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value.slice(0, 1000));
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const handleMicClick = () => {
    setMicTooltip(true);
    setTimeout(() => {
      setMicTooltip(false);
    }, 2500);
  };

  // Combine persisted messages with any in-memory transient safety messages
  const persistentMessages = activeChat?.messages || [];
  const allMessages = [...persistentMessages, ...transientSafetyMessages];

  return (
    <div className="flex h-screen bg-[var(--color-bg)] overflow-hidden">
      {/* Sidebar (260px) */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[var(--color-bg)] relative">
        {/* Header: chat title on left, theme toggle on right */}
        <header className="h-16 px-4 sm:px-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 md:hidden text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-xl hover:bg-[var(--color-surface-subtle)]"
              aria-label="Open sidebar navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-[var(--color-text)] truncate">
              {activeChat?.title || t.newChat || 'New chat'}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
          </div>
        </header>

        {/* Message List: scrollable, scrolls to newest message, aria-live polite */}
        <div 
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
          role="region"
          aria-label="Chat messages"
          aria-live="polite"
        >
          {allMessages.length === 0 && !isTyping && !isStreaming ? (
            /* Empty Chat State */
            <div className="max-w-xl mx-auto py-12 text-center my-auto">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center font-bold text-xl shadow-md mb-4">
                <CheckSquare className="w-8 h-8 text-[#FBF8F1]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)] tracking-tight">
                {t.howCanHelp || 'How can Scheme Saathi help you today?'}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2 mb-6 max-w-md mx-auto leading-relaxed">
                {t.chatSubheading || 'Discover government schemes, check your eligibility and find the support you need.'}
              </p>

              {/* Six suggestion chips, scrollable sideways on mobile */}
              <div className="flex flex-nowrap sm:grid sm:grid-cols-2 gap-3 text-left overflow-x-auto pb-3 sm:pb-0 scrollbar-none">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(chip.query)}
                    className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text)] shadow-xs transition-all flex items-center justify-between group active:scale-98 shrink-0 w-64 sm:w-auto cursor-pointer"
                  >
                    <span>{chip.label}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {allMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    /* User message in forest green with cream text */
                    <div className="max-w-lg bg-[#1F6B4A] text-[#FBF8F1] px-4.5 py-3 rounded-2xl rounded-tr-xs text-sm font-medium shadow-xs leading-relaxed break-words">
                      {getLocalizedMessageText(msg, language)}
                    </div>
                  ) : (
                    /* Bot message in surface colour with small logo */
                    <div className="flex items-start gap-3 max-w-2xl w-full">
                      <div className="w-7 h-7 rounded-lg bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center shrink-0 shadow-xs mt-0.5" aria-hidden="true">
                        <CheckSquare className="w-4 h-4 text-[#FBF8F1]" />
                      </div>
                      <div className="space-y-3 flex-1 min-w-0">
                        {/* Text bubble */}
                        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4.5 py-3.5 rounded-2xl rounded-tl-xs text-sm shadow-xs leading-relaxed break-words">
                          <MessageTextRenderer content={getLocalizedMessageText(msg, language)} />

                          {msg.actionButton && (
                            <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
                              <button
                                type="button"
                                onClick={() => navigate(msg.actionButton!.route)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[#1B2A22] text-xs font-bold shadow-xs hover:brightness-95 transition-colors cursor-pointer"
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

                        {/* Feedback Row (thumbs up & thumbs down), excluded for safety warnings */}
                        {!msg.isSafetyWarning && (
                          <div className="flex items-center gap-3 pt-1 text-xs text-[var(--color-muted)]">
                            {thanksMessageId === msg.id ? (
                              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md animate-in fade-in duration-150">
                                {t.thanksFeedback || 'Thanks for your feedback'}
                              </span>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px]">{t.wasThisHelpful || 'Was this helpful?'}</span>
                                <button
                                  type="button"
                                  onClick={() => handleThumbsUp(msg.id)}
                                  className={`p-1.5 rounded-lg hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer ${
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
                                  className={`p-1.5 rounded-lg hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer ${
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
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Three animated dots for about 600 ms */}
              {isTyping && (
                <div className="flex items-start gap-3 max-w-2xl">
                  <div className="w-7 h-7 rounded-lg bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <CheckSquare className="w-4 h-4 text-[#FBF8F1]" />
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" />
                  </div>
                </div>
              )}

              {/* Streaming reply word by word with blinking cursor */}
              {isStreaming && (
                <div className="flex items-start gap-3 max-w-2xl">
                  <div className="w-7 h-7 rounded-lg bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <CheckSquare className="w-4 h-4 text-[#FBF8F1]" />
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4.5 py-3.5 rounded-2xl rounded-tl-xs text-sm shadow-xs leading-relaxed break-words">
                    <MessageTextRenderer content={streamedText} isStreaming={true} />
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar at bottom: auto-growing textarea, Enter sends, Shift+Enter newline */}
        <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface-subtle)] focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent transition-all">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={t.askPlaceholder || "Ask about a scheme or service"}
                rows={1}
                maxLength={1000}
                className="w-full p-3.5 pr-24 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-hidden resize-none min-h-[48px] max-h-[180px]"
                aria-label="Ask about a scheme or service"
              />

              {/* Action buttons inside input bar */}
              <div className="absolute right-3 bottom-2.5 flex items-center gap-2">
                {/* Voice Input Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleMicClick}
                    onMouseEnter={() => setMicTooltip(true)}
                    onMouseLeave={() => setMicTooltip(false)}
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
                      {t.voiceComingSoon || 'Voice input is coming soon'}
                    </div>
                  )}
                </div>

                {/* Send or Stop button */}
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={handleStopStreaming}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    aria-label={t.stopStreaming || 'Stop streaming response'}
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>{t.stopStreaming || 'Stop'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[#FBF8F1] transition-colors disabled:opacity-40 disabled:hover:bg-[var(--color-primary)] shadow-xs cursor-pointer"
                    aria-label={t.sendMessage || 'Send message'}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Footer line under input with character counter near limit */}
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-[var(--color-muted)]">
              <span>{t.shortDisclaimer || 'Informational only. Always apply on the official government portal.'}</span>
              {inputText.length >= 800 && (
                <span className={inputText.length >= 950 ? 'text-amber-600 font-bold' : ''}>
                  {inputText.length} / 1000
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Feedback modal for thumbs down */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};
