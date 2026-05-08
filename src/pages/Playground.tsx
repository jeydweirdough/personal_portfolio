import { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PageLoader } from '../components/ui/PageLoader'

interface KeyValue {
  key: string
  value: string
  enabled: boolean
}

interface RequestResponse {
  status: number
  statusText: string
  time: number
  size: string
  body: any
  headers: Record<string, string>
  isHtml?: boolean
  raw?: string
}

interface PlaygroundProps {
  onLoading?: (isLoading: boolean) => void
}

export default function Playground({ onLoading }: PlaygroundProps) {
  // Persistence Key
  const STORAGE_KEY = 'playground-state'

  // Load initial state
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}

  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>(savedState.method || 'GET')
  const [url, setUrl] = useState(savedState.url || 'https://jsonplaceholder.typicode.com/todos/1')
  const [params, setParams] = useState<KeyValue[]>(savedState.params || [])
  const [headers, setHeaders] = useState<KeyValue[]>(savedState.headers || [
    { key: 'Content-Type', value: 'application/json', enabled: true }
  ])
  const [body, setBody] = useState(savedState.body || '{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}')
  const [response, setResponse] = useState<RequestResponse | null>(savedState.response || null)
  const [sentData, setSentData] = useState<any>(savedState.sentData || null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'cookies'>('params')
  const [cookies, setCookies] = useState<Record<string, string>>({})
  const [isSyncing, setIsSyncing] = useState(false)
  const [includeCredentials, setIncludeCredentials] = useState(savedState.includeCredentials !== undefined ? savedState.includeCredentials : true)
  const [bodyType, setBodyType] = useState<'json' | 'form-data'>(savedState.bodyType || 'json')
  const [bodyParams, setBodyParams] = useState<KeyValue[]>(savedState.bodyParams || [])
  const [responseTab, setResponseTab] = useState<'pretty' | 'preview' | 'headers' | 'request'>('pretty')

  // Save state to localStorage
  useEffect(() => {
    const stateToSave = {
      method, url, params, headers, body, response, sentData, includeCredentials, bodyType, bodyParams
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
  }, [method, url, params, headers, body, response, sentData, includeCredentials, bodyType, bodyParams])

  // Sync URL -> Params
  useEffect(() => {
    if (isSyncing) return
    try {
      const urlObj = new URL(url)
      const queryParams: KeyValue[] = []
      urlObj.searchParams.forEach((value, key) => {
        queryParams.push({ key, value, enabled: true })
      })
      
      // Only update if they actually differ to avoid loops
      const currentEnabledParams = params.filter(p => p.enabled)
      if (JSON.stringify(queryParams) !== JSON.stringify(currentEnabledParams)) {
        setParams(queryParams)
      }
    } catch (e) {
      // Invalid URL while typing, ignore
    }
  }, [url])

  // Sync Params -> URL
  useEffect(() => {
    setIsSyncing(true)
    try {
      const urlObj = new URL(url)
      const newSearchParams = new URLSearchParams()
      params.forEach(p => {
        if (p.enabled && p.key) newSearchParams.append(p.key, p.value)
      })
      
      const newSearch = newSearchParams.toString()
      const currentSearch = urlObj.search.replace('?', '')
      
      if (newSearch !== currentSearch) {
        urlObj.search = newSearch
        setUrl(urlObj.toString())
      }
    } catch (e) {
      // Invalid URL
    }
    setTimeout(() => setIsSyncing(false), 10)
  }, [params])

  // Load cookies on mount
  useEffect(() => {
    const cookieMap: Record<string, string> = {}
    document.cookie.split(';').forEach(c => {
      const [key, val] = c.trim().split('=')
      if (key) cookieMap[key] = val
    })
    setCookies(cookieMap)
  }, [])

  const handleSend = async () => {
  setIsLoading(true)
  const startTime = Date.now()

  try {
    const requestHeaders: Record<string, string> = {}

    headers.forEach(h => {
      if (h.enabled && h.key && h.key.toLowerCase() !== 'content-type') {
        requestHeaders[h.key] = h.value
      }
    })

    requestHeaders['Content-Type'] = 'application/json'
    requestHeaders['Accept'] = 'application/json'

    const options: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: includeCredentials ? 'include' : 'same-origin'
    }

    let requestBody: any = null

    if (method !== 'GET') {
      if (bodyType === 'form-data') {
        requestBody = bodyParams.reduce((acc: Record<string, string>, p) => {
          if (p.enabled && p.key) {
            acc[p.key] = p.value
          }
          return acc
        }, {})

        options.body = JSON.stringify(requestBody)
      } else {
        try {
          requestBody = body.trim() ? JSON.parse(body) : {}
        } catch (e) {
          throw new Error('Request body must be valid JSON.')
        }

        options.body = JSON.stringify(requestBody)
      }
    }

    // Ensure URL has a protocol to prevent relative path resolution (unless it's a local path starting with /)
    const finalUrl = (url.match(/^[a-zA-Z]+:\/\//) || url.startsWith('/')) ? url : `https://${url}`

    const finalSentData = {
      method,
      url: finalUrl,
      headers: { ...requestHeaders },
      body: method === 'GET' ? null : requestBody,
      bodyType: bodyType
    }

    setSentData(finalSentData)

    const res = await fetch(finalUrl, options)

    const endTime = Date.now()

    const responseHeaders: Record<string, string> = {}
    res.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    const text = await res.text()
    const isHtml =
      text.trim().toLowerCase().startsWith('<!doctype') ||
      text.trim().toLowerCase().startsWith('<html')

    let data: any

    try {
      data = JSON.parse(text)
    } catch (e) {
      data = {
        error: 'Response is not valid JSON',
        isHtmlPreview: isHtml
      }
    }

    setResponse({
      status: res.status,
      statusText: res.statusText,
      time: endTime - startTime,
      size: (text.length / 1024).toFixed(2) + ' KB',
      body: data,
      headers: responseHeaders,
      isHtml,
      raw: text
    })
  } catch (error: any) {
    setResponse({
      status: 0,
      statusText: 'Error',
      time: Date.now() - startTime,
      size: '0 KB',
      body: { error: error.message },
      headers: {}
    })
  } finally {
    setIsLoading(false)
  }
}

  const addItem = (type: 'headers' | 'params' | 'body') => {
    const newItem = { key: '', value: '', enabled: true }
    if (type === 'headers') setHeaders([...headers, newItem])
    else if (type === 'params') setParams([...params, newItem])
    else setBodyParams([...bodyParams, newItem])
  }

  const removeItem = (type: 'headers' | 'params' | 'body', index: number) => {
    if (type === 'headers') setHeaders(headers.filter((_, i) => i !== index))
    else if (type === 'params') setParams(params.filter((_, i) => i !== index))
    else setBodyParams(bodyParams.filter((_, i) => i !== index))
  }

  const updateItem = (type: 'headers' | 'params' | 'body', index: number, field: keyof KeyValue, value: any) => {
    if (type === 'headers') {
      const newHeaders = [...headers]
      newHeaders[index] = { ...newHeaders[index], [field]: value }
      setHeaders(newHeaders)
    } else if (type === 'params') {
      const newParams = [...params]
      newParams[index] = { ...newParams[index], [field]: value }
      setParams(newParams)
    } else {
      const newBodyParams = [...bodyParams]
      newBodyParams[index] = { ...newBodyParams[index], [field]: value }
      setBodyParams(newBodyParams)
    }

    if (response) {
      console.log("Response content:", response.body)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-bg-dark animate-fade-in">
      {/* URL BAR */}
      <div className="p-4 border-b border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-bg-dark-soft/50 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex gap-2">
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-md px-3 py-2 text-xs font-bold text-accent-orange focus:outline-none focus:ring-1 focus:ring-accent-orange"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <div className="flex-1">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/v1/resource"
              className="w-full bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-md px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent-orange transition-all"
            />
          </div>
          <Button 
            variant="primary" 
            isLoading={isLoading} 
            onClick={handleSend}
            className="px-8"
          >
            Send
          </Button>
        </div>
        <div className="max-w-6xl mx-auto mt-2 flex items-center gap-4 px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={includeCredentials} 
              onChange={(e) => setIncludeCredentials(e.target.checked)}
              className="accent-accent-orange h-3.5 w-3.5"
            />
            <span className="text-[10px] font-bold text-text-light-secondary group-hover:text-text-light-primary dark:group-hover:text-text-dark-primary transition-colors uppercase tracking-tighter">Include Credentials (CORS Cookies)</span>
          </label>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* REQUEST CONFIG */}
        <div className="flex-1 border-r border-border-light dark:border-border-dark flex flex-col min-w-0">
          <div className="flex border-b border-border-light dark:border-border-dark px-4 bg-slate-50 dark:bg-bg-dark-soft">
            {['params', 'headers', 'body', 'cookies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? 'text-accent-orange' : 'text-text-light-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-orange" />}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'params' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-bold text-text-light-secondary uppercase tracking-tighter">Query Parameters</h4>
                  <button onClick={() => addItem('params')} className="text-[10px] font-bold text-accent-orange hover:underline">+ Add Param</button>
                </div>
                {params.map((p, i) => (
                  <div key={i} className="flex gap-2 items-center group">
                    <input 
                      type="checkbox" 
                      checked={p.enabled} 
                      onChange={(e) => updateItem('params', i, 'enabled', e.target.checked)}
                      className="accent-accent-orange"
                    />
                    <input 
                      placeholder="Key" 
                      value={p.key} 
                      onChange={(e) => updateItem('params', i, 'key', e.target.value)}
                      className="flex-1 bg-transparent border-b border-border-light dark:border-border-dark text-xs py-1 focus:outline-none focus:border-accent-orange"
                    />
                    <input 
                      placeholder="Value" 
                      value={p.value} 
                      onChange={(e) => updateItem('params', i, 'value', e.target.value)}
                      className="flex-1 bg-transparent border-b border-border-light dark:border-border-dark text-xs py-1 focus:outline-none focus:border-accent-orange"
                    />
                    <button onClick={() => removeItem('params', i)} className="opacity-0 group-hover:opacity-100 text-text-light-secondary hover:text-red-500 transition-opacity">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
                    </button>
                  </div>
                ))}
                {params.length === 0 && (
                  <div className="py-10 text-center border-2 border-dashed border-border-light dark:border-border-dark rounded-lg">
                    <p className="text-[10px] text-text-light-secondary uppercase">No parameters defined</p>
                    <button onClick={() => addItem('params')} className="text-[10px] font-bold text-accent-orange mt-2 hover:underline">Add your first parameter</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'headers' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-bold text-text-light-secondary uppercase tracking-tighter">Request Headers</h4>
                  <button onClick={() => addItem('headers')} className="text-[10px] font-bold text-accent-orange hover:underline">+ Add Header</button>
                </div>
                {headers.map((h, i) => (
                  <div key={i} className="flex gap-2 items-center group">
                    <input 
                      type="checkbox" 
                      checked={h.enabled} 
                      onChange={(e) => updateItem('headers', i, 'enabled', e.target.checked)}
                      className="accent-accent-orange"
                    />
                    <input 
                      placeholder="Key" 
                      value={h.key} 
                      onChange={(e) => updateItem('headers', i, 'key', e.target.value)}
                      className="flex-1 bg-transparent border-b border-border-light dark:border-border-dark text-xs py-1 focus:outline-none focus:border-accent-orange"
                    />
                    <input 
                      placeholder="Value" 
                      value={h.value} 
                      onChange={(e) => updateItem('headers', i, 'value', e.target.value)}
                      className="flex-1 bg-transparent border-b border-border-light dark:border-border-dark text-xs py-1 focus:outline-none focus:border-accent-orange"
                    />
                    <button onClick={() => removeItem('headers', i)} className="opacity-0 group-hover:opacity-100 text-text-light-secondary hover:text-red-500 transition-opacity">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'body' && (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <select 
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value as any)}
                    className="bg-slate-100 dark:bg-white/10 border border-border-light dark:border-border-dark rounded px-2 py-1 text-[10px] font-bold text-accent-orange focus:outline-none"
                  >
                    <option value="json">JSON</option>
                    <option value="form-data">FORM DATA</option>
                  </select>
                  <span className="text-[10px] text-text-light-secondary font-medium uppercase">
                    {bodyType === 'json' ? 'application/json' : 'multipart/form-data'}
                  </span>
                  {bodyType === 'form-data' && (
                    <button onClick={() => addItem('body')} className="ml-auto text-[10px] font-bold text-accent-orange hover:underline">+ Add Field</button>
                  )}
                </div>

                {bodyType === 'form-data' ? (
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {bodyParams.map((p, i) => (
                      <div key={i} className="flex gap-2 items-center group">
                        <input 
                          type="checkbox" 
                          checked={p.enabled} 
                          onChange={(e) => updateItem('body', i, 'enabled', e.target.checked)}
                          className="accent-accent-orange"
                        />
                        <input 
                          placeholder="Key" 
                          value={p.key} 
                          onChange={(e) => updateItem('body', i, 'key', e.target.value)}
                          className="flex-1 bg-transparent border-b border-border-light dark:border-border-dark text-xs py-1 focus:outline-none focus:border-accent-orange"
                        />
                        <input 
                          placeholder="Value" 
                          value={p.value} 
                          onChange={(e) => updateItem('body', i, 'value', e.target.value)}
                          className="flex-1 bg-transparent border-b border-border-light dark:border-border-dark text-xs py-1 focus:outline-none focus:border-accent-orange"
                        />
                        <button onClick={() => removeItem('body', i)} className="opacity-0 group-hover:opacity-100 text-text-light-secondary hover:text-red-500 transition-opacity">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
                        </button>
                      </div>
                    ))}
                    {bodyParams.length === 0 && (
                      <div className="py-10 text-center border-2 border-dashed border-border-light dark:border-border-dark rounded-lg">
                        <p className="text-[10px] text-text-light-secondary uppercase">No fields defined</p>
                        <button onClick={() => addItem('body')} className="text-[10px] font-bold text-accent-orange mt-2 hover:underline">Add your first field</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={'{\n  "key": "value"\n}'}
                    className="flex-1 w-full bg-slate-50 dark:bg-bg-dark-soft rounded-lg p-4 font-mono text-xs text-text-light-primary dark:text-text-dark-primary border border-border-light dark:border-border-dark focus:outline-none focus:ring-1 focus:ring-accent-orange resize-none"
                    spellCheck={false}
                  />
                )}
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 mb-6">
                  <p className="text-[10px] text-blue-500 font-bold mb-1 uppercase tracking-wider">Browser Sandbox</p>
                  <p className="text-[11px] text-text-light-secondary leading-relaxed">
                    Cookies are managed by the browser. 
                    <br /><br />
                    <strong className="text-text-light-primary dark:text-text-dark-primary">Note:</strong> 
                    1. Cross-origin cookies require <code className="bg-slate-100 dark:bg-white/10 px-1 rounded text-accent-orange">credentials: 'include'</code> (Enabled above).
                    <br />
                    2. <code className="bg-slate-100 dark:bg-white/10 px-1 rounded text-accent-orange">HttpOnly</code> cookies are stored by the browser but <strong>cannot</strong> be read by JavaScript (and thus won't show in this list).
                    <br />
                    3. The server must respond with <code className="bg-slate-100 dark:bg-white/10 px-1 rounded text-accent-orange">Access-Control-Allow-Credentials: true</code>.
                  </p>
                </div>
                <div className="space-y-2">
                   {Object.entries(cookies).map(([key, val]) => (
                     <div key={key} className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-bg-dark-soft border border-border-light dark:border-border-dark">
                        <span className="text-xs font-bold">{key}</span>
                        <span className="text-xs text-text-light-secondary truncate max-w-[200px]">{val}</span>
                     </div>
                   ))}
                   {Object.keys(cookies).length === 0 && (
                     <div className="text-center py-10 opacity-30 italic text-xs">No cookies found in current session.</div>
                   )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RESPONSE */}
        <div className="flex-1 bg-slate-50 dark:bg-bg-dark-soft/30 flex flex-col min-w-0">
          <div className="h-12 border-b border-border-light dark:border-border-dark px-2 flex items-center justify-between bg-white dark:bg-bg-dark">
             <div className="flex">
               {['pretty', 'preview', 'headers', 'request'].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setResponseTab(tab as any)}
                   className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                     responseTab === tab ? 'text-accent-orange' : 'text-text-light-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary'
                   }`}
                 >
                   {tab}
                   {responseTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-orange" />}
                 </button>
               ))}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!response && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center opacity-20">
                <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={1}/>
                </svg>
                <p className="text-sm font-medium">Enter a URL and click "Send" to test an API</p>
              </div>
            )}

            {/* Centralized loading is handled in App.tsx */}

            {response && !isLoading && (
              <div className="h-full flex flex-col">
                 {responseTab === 'pretty' && (
                   <div className="space-y-4 animate-fade-in">
                    {response && (
               <div className="flex gap-4 items-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-text-light-secondary uppercase">Status:</span>
                    <span className={`text-[10px] font-bold ${response.status < 400 ? 'text-emerald-500' : 'text-red-500'}`}>{response.status} {response.statusText}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hidden sm:flex">
                    <span className="text-[10px] text-text-light-secondary uppercase">Time:</span>
                    <span className="text-[10px] font-bold text-blue-500">{response.time} ms</span>
                  </div>
               </div>
             )}
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-bold text-text-light-secondary uppercase">Body (JSON)</span>
                         <Button size="xs" variant="ghost" onClick={() => navigator.clipboard.writeText(JSON.stringify(response.body, null, 2))}>Copy</Button>
                      </div>
                      <pre className="p-4 rounded-lg bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark overflow-x-auto text-[11px] font-mono leading-relaxed">
                        {response.isHtml && response.body.error ? (
                          <div className="text-accent-orange italic">Response is an HTML document. Switch to "Preview" to see it.</div>
                        ) : JSON.stringify(response.body, null, 2)}
                      </pre>
                   </div>
                 )}

                 {responseTab === 'preview' && (
                   <div className="h-full flex flex-col animate-fade-in">
                      {response.isHtml ? (
                        <div className="flex-1 border border-border-light dark:border-border-dark rounded-lg overflow-hidden bg-white">
                          <iframe 
                            srcDoc={response.raw} 
                            className="w-full h-full border-0" 
                            title="Response Preview"
                            sandbox="allow-scripts"
                          />
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-30">
                          <p className="text-sm font-medium italic">No HTML content to preview.</p>
                        </div>
                      )}
                   </div>
                 )}

                 {responseTab === 'headers' && (
                   <div className="animate-fade-in">
                      <span className="text-[10px] font-bold text-text-light-secondary uppercase block mb-4">Response Headers</span>
                      <div className="rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
                         {Object.entries(response.headers).map(([key, val]) => (
                           <div key={key} className="flex items-center justify-between p-2 border-b border-border-light dark:border-border-dark last:border-0 bg-white dark:bg-bg-dark">
                              <span className="text-[10px] font-bold text-text-light-primary dark:text-text-dark-primary">{key}</span>
                              <span className="text-[10px] text-text-light-secondary truncate ml-4">{val}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {responseTab === 'request' && sentData && (
                    <div className="animate-fade-in space-y-6">
                      <div>
                        <span className="text-[10px] font-bold text-text-light-secondary uppercase block mb-2">Request Details</span>
                        <div className="p-3 rounded bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="text-accent-orange border-accent-orange/20">{sentData.method}</Badge>
                            <span className="text-xs font-mono break-all">{sentData.url}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-text-light-secondary uppercase block mb-2">Request Headers</span>
                        <div className="rounded border border-border-light dark:border-border-dark overflow-hidden">
                          {Object.entries(sentData.headers).map(([key, val]) => (
                            <div key={key} className="flex items-center justify-between p-2 border-b border-border-light dark:border-border-dark last:border-0 bg-white dark:bg-bg-dark text-[10px]">
                              <span className="font-bold">{key}</span>
                              <span className="text-text-light-secondary">{val as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {sentData.body && (
                        <div>
                          <span className="text-[10px] font-bold text-text-light-secondary uppercase block mb-2">
                            Request Body ({sentData.bodyType === 'json' ? 'JSON' : 'Form Data'})
                          </span>
                          <pre className="p-4 rounded bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark overflow-x-auto text-[11px] font-mono leading-relaxed">
                            {JSON.stringify(sentData.body, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
