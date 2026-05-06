/**
 * 热门城市酒店推荐数据
 *
 * 数据来源：携程旅行网 https://hotels.ctrip.com
 * 每个城市推荐 3 家知名酒店，点击跳转到携程该城市酒店列表页。
 * 如需接入携程联盟返佣，可在 URL 后追加 sid 和 allianceid 参数。
 */

const HOTEL_DATA = {
    // === 国内城市 ===
    '北京': {
        url: 'https://hotels.ctrip.com/hotel/beijing1',
        hotels: [
            { name: '北京王府井希尔顿酒店', desc: '王府井商圈 · 豪华五星' },
            { name: '北京国贸大酒店', desc: '国贸CBD · 云端夜景' },
            { name: '北京诺金酒店', desc: '将台路 · 艺术设计酒店' },
        ]
    },
    '上海': {
        url: 'https://hotels.ctrip.com/hotel/shanghai2',
        hotels: [
            { name: '上海外滩华尔道夫酒店', desc: '外滩 · 一线江景' },
            { name: '上海浦东丽思卡尔顿酒店', desc: '陆家嘴 · 东方明珠畔' },
            { name: '上海和平饭店', desc: '外滩 · 百年经典' },
        ]
    },
    '广州': {
        url: 'https://hotels.ctrip.com/hotel/guangzhou48',
        hotels: [
            { name: '广州花园酒店', desc: '环市东路 · 岭南花园' },
            { name: '广州四季酒店', desc: '珠江新城 · 云端入住' },
            { name: '广州白天鹅宾馆', desc: '沙面 · 珠江夜景' },
        ]
    },
    '深圳': {
        url: 'https://hotels.ctrip.com/hotel/shenzhen24',
        hotels: [
            { name: '深圳瑞吉酒店', desc: '罗湖 · 云端地标' },
            { name: '深圳君悦酒店', desc: '福田CBD · 繁华商圈' },
            { name: '深圳华侨城洲际大酒店', desc: '华侨城 · 西班牙风情' },
        ]
    },
    '杭州': {
        url: 'https://hotels.ctrip.com/hotel/hangzhou21',
        hotels: [
            { name: '杭州西湖国宾馆', desc: '西湖核心 · 园林酒店' },
            { name: '杭州西子湖四季酒店', desc: '西湖 · 江南庭院' },
            { name: '杭州香格里拉饭店', desc: '西湖 · 北山风光' },
        ]
    },
    '成都': {
        url: 'https://hotels.ctrip.com/hotel/chengdu28',
        hotels: [
            { name: '成都博舍酒店', desc: '太古里 · 潮流设计' },
            { name: '成都群光君悦酒店', desc: '春熙路 · 城市中心' },
            { name: '成都瑞吉酒店', desc: '天府新区 · 奢华体验' },
        ]
    },
    '重庆': {
        url: 'https://hotels.ctrip.com/hotel/chongqing27',
        hotels: [
            { name: '重庆来福士洲际酒店', desc: '朝天门 · 两江交汇' },
            { name: '重庆解放碑威斯汀酒店', desc: '解放碑 · 城市之巅' },
            { name: '重庆北碚悦榕庄', desc: '北碚 · 温泉度假' },
        ]
    },
    '香港': {
        url: 'https://hotels.ctrip.com/hotel/hongkong36',
        hotels: [
            { name: '香港半岛酒店', desc: '尖沙咀 · 维多利亚港' },
            { name: '香港文华东方酒店', desc: '中环 · 金融中心' },
            { name: '香港四季酒店', desc: '中环 · 维港海景' },
        ]
    },
    '台北': {
        url: 'https://hotels.ctrip.com/hotel/taibei2',
        hotels: [
            { name: '台北君悦酒店', desc: '信义区 · 101旁' },
            { name: '台北W饭店', desc: '信义区 · 潮流夜生活' },
            { name: '台北晶华酒店', desc: '中山区 · 精品购物' },
        ]
    },
    '南京': {
        url: 'https://hotels.ctrip.com/hotel/nanjing14',
        hotels: [
            { name: '南京金陵饭店', desc: '新街口 · 南京地标' },
            { name: '南京苏宁索菲特银河大酒店', desc: '鼓楼 · 法式优雅' },
            { name: '南京颐和公馆', desc: '颐和路 · 民国风情' },
        ]
    },
    '武汉': {
        url: 'https://hotels.ctrip.com/hotel/wuhan13',
        hotels: [
            { name: '武汉万达瑞华酒店', desc: '武昌江畔 · 奢华体验' },
            { name: '武汉泛海费尔蒙酒店', desc: '汉口CBD · 百年品牌' },
            { name: '武汉晴川假日酒店', desc: '汉阳 · 长江大桥旁' },
        ]
    },
    '西安': {
        url: 'https://hotels.ctrip.com/hotel/xian11',
        hotels: [
            { name: '西安索菲特传奇酒店', desc: '市中心 · 法式宫殿' },
            { name: '西安威斯汀大酒店', desc: '大雁塔旁 · 文化之旅' },
            { name: '西安丽思卡尔顿酒店', desc: '高新区 · 现代奢华' },
        ]
    },
    '天津': {
        url: 'https://hotels.ctrip.com/hotel/tianjin4',
        hotels: [
            { name: '天津利顺德大饭店', desc: '和平区 · 百年历史' },
            { name: '天津瑞吉金融街酒店', desc: '海河畔 · 欧式风情' },
            { name: '天津四季酒店', desc: '营口道 · 精品奢华' },
        ]
    },
    '苏州': {
        url: 'https://hotels.ctrip.com/hotel/suzhou22',
        hotels: [
            { name: '苏州金鸡湖大酒店', desc: '金鸡湖 · 园林酒店' },
            { name: '苏州中茵皇冠假日酒店', desc: '金鸡湖 · 邮轮主题' },
            { name: '苏州南园宾馆', desc: '姑苏区 · 园林别墅' },
        ]
    },
    '长沙': {
        url: 'https://hotels.ctrip.com/hotel/changsha196',
        hotels: [
            { name: '长沙尼依格罗酒店', desc: '芙蓉CBD · 云端体验' },
            { name: '长沙君悦酒店', desc: '湘江畔 · 橘子洲头' },
            { name: '长沙大王山朗豪酒店', desc: '岳麓区 · 度假胜地' },
        ]
    },
    '厦门': {
        url: 'https://hotels.ctrip.com/hotel/xiamen21',
        hotels: [
            { name: '厦门康莱德酒店', desc: '思明 · 双子塔云端' },
            { name: '厦门鹭江宾馆', desc: '鹭江道 · 鼓浪屿对面' },
            { name: '厦门海悦山庄酒店', desc: '环岛路 · 海景度假' },
        ]
    },
    '青岛': {
        url: 'https://hotels.ctrip.com/hotel/qingdao8',
        hotels: [
            { name: '青岛海天大酒店', desc: '市南区 · 一线海景' },
            { name: '青岛海尔洲际酒店', desc: '奥帆中心 · 帆船之都' },
            { name: '青岛金沙滩希尔顿酒店', desc: '黄岛 · 金沙滩畔' },
        ]
    },
    '大连': {
        url: 'https://hotels.ctrip.com/hotel/dalian5',
        hotels: [
            { name: '大连一方城堡豪华精选酒店', desc: '星海广场 · 城堡酒店' },
            { name: '大连康莱德酒店', desc: '东港 · 海景奢华' },
            { name: '大连富丽华大酒店', desc: '中山区 · 经典五星' },
        ]
    },
    '昆明': {
        url: 'https://hotels.ctrip.com/hotel/kunming20',
        hotels: [
            { name: '昆明索菲特大酒店', desc: '市中心 · 法式风情' },
            { name: '昆明洲际酒店', desc: '滇池畔 · 度假天堂' },
            { name: '昆明华邑酒店', desc: '滇池 · 中式园林' },
        ]
    },
    '三亚': {
        url: 'https://hotels.ctrip.com/hotel/sanya2',
        hotels: [
            { name: '三亚亚特兰蒂斯酒店', desc: '海棠湾 · 水世界乐园' },
            { name: '三亚艾迪逊酒店', desc: '海棠湾 · 设计感满分' },
            { name: '三亚太阳湾柏悦酒店', desc: '亚龙湾 · 私密海湾' },
        ]
    },
    '拉萨': {
        url: 'https://hotels.ctrip.com/hotel/lasa14',
        hotels: [
            { name: '拉萨瑞吉度假酒店', desc: '城关区 · 藏式奢华' },
            { name: '拉萨香格里拉大酒店', desc: '罗布林卡旁 · 高原氧吧' },
            { name: '拉萨圣地天堂洲际大饭店', desc: '城关区 · 高原绿洲' },
        ]
    },
    '珠海': {
        url: 'https://hotels.ctrip.com/hotel/zhuhai48',
        hotels: [
            { name: '珠海瑞吉酒店', desc: '湾仔 · 澳门对岸' },
            { name: '珠海横琴凯悦酒店', desc: '横琴 · 长隆附近' },
            { name: '珠海中海万丽酒店', desc: '前山河畔 · 城市绿洲' },
        ]
    },
    '哈尔滨': {
        url: 'https://hotels.ctrip.com/hotel/haerbin6',
        hotels: [
            { name: '哈尔滨冰雪大世界假日酒店', desc: '松北 · 冰雪奇缘' },
            { name: '哈尔滨万达嘉华酒店', desc: '松北 · 度假首选' },
            { name: '哈尔滨中央大街大公馆1903', desc: '中央大街 · 俄式风情' },
        ]
    },
};

// 中英文城市名称别名映射（指向 Chinese Key）
const CITY_ALIAS = {
    // 英文 → 中文
    'beijing': '北京',
    'peking': '北京',
    'shanghai': '上海',
    'guangzhou': '广州',
    'canton': '广州',
    'shenzhen': '深圳',
    'hangzhou': '杭州',
    'chengdu': '成都',
    'chongqing': '重庆',
    'hongkong': '香港',
    'hong kong': '香港',
    'taipei': '台北',
    'taipeh': '台北',
    'nanjing': '南京',
    'nanking': '南京',
    'wuhan': '武汉',
    'xian': '西安',
    'tianjin': '天津',
    'tientsin': '天津',
    'suzhou': '苏州',
    'soochow': '苏州',
    'changsha': '长沙',
    'xiamen': '厦门',
    'amoy': '厦门',
    'qingdao': '青岛',
    'tsingtao': '青岛',
    'dalian': '大连',
    'kunming': '昆明',
    'sanya': '三亚',
    'lasa': '拉萨',
    'lhasa': '拉萨',
    'lasha': '拉萨',
    'zhuhai': '珠海',
    'haerbin': '哈尔滨',
    'harbin': '哈尔滨',
    'macau': '香港',
    'macao': '香港',
    // 拼音变体
    'beijing shi': '北京',
    'shanghai shi': '上海',
};

/**
 * 根据城市名称查找对应的酒店推荐数据
 * @param {string} cityName - 城市名称（支持中文、英文、拼音）
 * @returns {object|null} 酒店数据对象或 null
 */
function findHotelData(cityName) {
    if (!cityName) return null;

    // 1. 直接匹配中文名
    if (HOTEL_DATA[cityName]) {
        return HOTEL_DATA[cityName];
    }

    // 2. 通过别名映射查找
    const normalized = cityName.toLowerCase().trim();
    if (CITY_ALIAS[normalized]) {
        const cnName = CITY_ALIAS[normalized];
        return HOTEL_DATA[cnName] || null;
    }

    // 3. 模糊匹配：截取 API 返回的 "Beijing, China" 中的第一部分
    const parts = cityName.split(/[,，、\s]+/);
    for (const part of parts) {
        if (!part) continue;
        // 直接匹配
        if (HOTEL_DATA[part]) return HOTEL_DATA[part];
        // 别名匹配
        const p = part.toLowerCase().trim();
        if (CITY_ALIAS[p]) {
            const cnName = CITY_ALIAS[p];
            if (HOTEL_DATA[cnName]) return HOTEL_DATA[cnName];
        }
    }

    return null;
}
