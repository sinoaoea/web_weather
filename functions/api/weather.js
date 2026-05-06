/**
 * Cloudflare Pages Function - Weather API 代理
 *
 * 作用：前端通过此函数请求 WeatherAPI.com，API key 存储在 Cloudflare
 * 环境变量 WEATHER_API_KEY 中，不会暴露给浏览器端。
 *
 * 在 Cloudflare Pages Dashboard 中设置环境变量：
 *   - 变量名：WEATHER_API_KEY
 *   - 值：e407a812830a4e7d83d111337260605
 *
 * 路由：/api/weather?q=Beijing
 */

export async function onRequest(context) {
    const { request, env } = context;

    // 获取 API key（从 Cloudflare 环境变量读取）
    const apiKey = env.WEATHER_API_KEY;
    if (!apiKey) {
        return new Response(
            JSON.stringify({ error: '服务器配置错误：未设置 API key' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    // 获取查询参数
    const url = new URL(request.url);
    const city = url.searchParams.get('q') || 'auto:ip';

    // 构建请求 WeatherAPI.com 的 URL
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=no&lang=zh`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 透传 WeatherAPI 的响应状态码
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                // 禁止浏览器缓存代理响应（让前端自己管理缓存）
                'Cache-Control': 'no-store',
            },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: '无法连接到天气服务' }),
            {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
