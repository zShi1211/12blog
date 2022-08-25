export default function fallback(context: any, ret: string) {
    const { request } = context
    if (request.method === 'GET' && request.headers.accept.includes('text/html') && !context.parsedUrl.pathname.includes('.')) {
        return ret
    }
    return context.parsedUrl.pathname

}