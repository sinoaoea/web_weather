// ==================== 配置 ====================
// 请在这里填入你的 WeatherAPI.com API密钥
// 免费注册地址：https://www.weatherapi.com/signup.aspx
const API_KEY =;
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// 缓存配置
const CACHE_PREFIX = 'weather_cache_';
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟（毫秒）

// ==================== DOM元素 ====================
const cityInput = document.getElementById('cityInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const currentWeather = document.getElementById('currentWeather');
const forecast = document.getElementById('forecast');

// ==================== 工具函数 ====================

// 显示加载状态
function showLoading() {
    loading.style.display = 'block';
    error.style.display = 'none';
    currentWeather.style.display = 'none';
    forecast.style.display = 'none';
}

// 隐藏加载状态
function hideLoading() {
    loading.style.display = 'none';
}

// 显示错误信息
function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    hideLoading();
}

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
}

// 获取星期几
function getWeekday(dateStr) {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekdays[date.getDay()];
}

// ==================== 缓存管理 ====================

// 生成缓存键名
function getCacheKey(city) {
    return CACHE_PREFIX + city.toLowerCase().trim();
}

// 保存天气数据到缓存
function saveToCache(city, data) {
    try {
        const cacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem(getCacheKey(city), JSON.stringify(cacheData));
        console.log(`✅ 缓存已保存: ${city}`);
    } catch (e) {
        console.warn('缓存保存失败:', e);
    }
}

// 从缓存读取天气数据
function getFromCache(city) {
    try {
        const cached = localStorage.getItem(getCacheKey(city));
        if (!cached) {
            return null;
        }

        const cacheData = JSON.parse(cached);
        const now = Date.now();
        const age = now - cacheData.timestamp;

        // 检查缓存是否过期
        if (age > CACHE_DURATION) {
            console.log(`⏰ 缓存已过期: ${city} (${Math.floor(age / 1000)}秒前)`);
            localStorage.removeItem(getCacheKey(city));
            return null;
        }

        const remainingTime = Math.floor((CACHE_DURATION - age) / 1000);
        console.log(`📦 使用缓存数据: ${city} (剩余 ${remainingTime} 秒)`);
        return cacheData.data;
    } catch (e) {
        console.warn('缓存读取失败:', e);
        return null;
    }
}

// 清除所有过期缓存
function clearExpiredCache() {
    try {
        const keys = Object.keys(localStorage);
        let cleared = 0;

        keys.forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                try {
                    const cached = JSON.parse(localStorage.getItem(key));
                    const age = Date.now() - cached.timestamp;

                    if (age > CACHE_DURATION) {
                        localStorage.removeItem(key);
                        cleared++;
                    }
                } catch (e) {
                    // 无效的缓存数据，直接删除
                    localStorage.removeItem(key);
                    cleared++;
                }
            }
        });

        if (cleared > 0) {
            console.log(`🧹 已清除 ${cleared} 个过期缓存`);
        }
    } catch (e) {
        console.warn('清除缓存失败:', e);
    }
}

// ==================== API调用 ====================

// 获取天气数据
async function fetchWeather(city) {
    // 检查API密钥
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('请先在 app.js 中配置您的 API 密钥！访问 https://www.weatherapi.com/signup.aspx 免费获取。');
        return null;
    }

    // 先尝试从缓存获取数据
    const cachedData = getFromCache(city);
    if (cachedData) {
        return cachedData;
    }

    // 缓存未命中，请求 API
    console.log(`🌐 请求 API: ${city}`);

    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7&aqi=no&lang=zh`
        );

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('未找到该城市，请检查城市名称是否正确');
            } else if (response.status === 401) {
                throw new Error('API密钥无效，请检查配置');
            } else {
                throw new Error(`请求失败: ${response.status}`);
            }
        }

        const data = await response.json();

        // 保存到缓存
        saveToCache(city, data);

        return data;
    } catch (err) {
        if (err.message.includes('Failed to fetch')) {
            throw new Error('网络连接失败，请检查网络连接');
        }
        throw err;
    }
}

// ==================== 显示天气数据 ====================

// 显示当前天气
function displayCurrentWeather(data) {
    const { location, current } = data;

    // 城市名称和更新时间
    document.getElementById('cityName').textContent = `${location.name}, ${location.country}`;
    document.getElementById('updateTime').textContent = `更新时间：${current.last_updated}`;

    // 天气图标和温度
    document.getElementById('weatherIcon').src = `https:${current.condition.icon}`;
    document.getElementById('temperature').textContent = `${Math.round(current.temp_c)}°C`;
    document.getElementById('weatherDesc').textContent = current.condition.text;

    // 详细信息
    document.getElementById('feelsLike').textContent = `${Math.round(current.feelslike_c)}°C`;
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('windSpeed').textContent = `${current.wind_kph} km/h`;
    document.getElementById('visibility').textContent = `${current.vis_km} km`;
    document.getElementById('pressure').textContent = `${current.pressure_mb} mb`;
    document.getElementById('uv').textContent = current.uv;

    currentWeather.style.display = 'block';
}

// 显示7天预报
function displayForecast(data) {
    const { forecast: { forecastday } } = data;
    const forecastContainer = document.getElementById('forecastContainer');

    forecastContainer.innerHTML = '';

    forecastday.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';

        dayElement.innerHTML = `
            <div class="forecast-date">${formatDate(day.date)}</div>
            <div class="forecast-weekday">${getWeekday(day.date)}</div>
            <img class="forecast-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <div class="forecast-temp">
                ${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°
            </div>
            <div class="forecast-desc">${day.day.condition.text}</div>
            <div class="forecast-details">
                <span>💧 ${day.day.avghumidity}%</span>
                <span>🌬️ ${Math.round(day.day.maxwind_kph)}km/h</span>
            </div>
        `;

        forecastContainer.appendChild(dayElement);
    });

    forecast.style.display = 'block';
}

// ==================== 搜索功能 ====================

// 搜索天气
async function searchWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        showError('请输入城市名称');
        return;
    }

    showLoading();

    try {
        const data = await fetchWeather(city);

        if (data) {
            hideLoading();
            displayCurrentWeather(data);
            displayForecast(data);
        }
    } catch (err) {
        showError(err.message);
    }
}

// 根据IP自动定位并查询天气
async function autoLocationWeather() {
    // 检查是否是首次访问（使用 sessionStorage）
    if (sessionStorage.getItem('weatherVisited')) {
        return;
    }

    showLoading();

    try {
        // 使用 WeatherAPI 的自动IP定位功能
        const data = await fetchWeather('auto:ip');

        if (data) {
            hideLoading();
            displayCurrentWeather(data);
            displayForecast(data);
            // 标记已访问
            sessionStorage.setItem('weatherVisited', 'true');
        }
    } catch (err) {
        // 自动定位失败时静默处理，不显示错误
        hideLoading();
        console.log('自动定位失败:', err.message);
    }
}

// 快速搜索城市
function searchCity(cityName) {
    cityInput.value = cityName;
    searchWeather();
}

// ==================== 事件监听 ====================

// 回车键搜索
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 清除过期缓存
    clearExpiredCache();

    // 首次访问时自动根据IP定位并显示天气
    autoLocationWeather();
});
