document.addEventListener("DOMContentLoaded", () => {
    // 1. 初始化地图
    const map = L.map('my-map').setView([31.2304, 121.4737], 5); // 默认视角：中国

    // 2. 加载地图图层（OpenStreetMap）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 3. 城市数据（包含新增城市）
    const cities = [
        { name: "重庆", coords: [29.56301, 106.55156], story: "特种兵式旅游，打卡了各大景点，连续几天步数榜首！" },
        { name: "嘉兴", coords: [30.7461, 120.7556], story: "特别舒服的城市，沿河走，很凉快。" },
        { name: "芜湖", coords: [31.366, 118.384], story: "盲盒旅行抽到的，非常有自己节奏，色彩明亮，很出片。" },
        { name: "九江", coords: [29.705, 116.001], story: "沙滩公园，没有什么人，很舒服。" },
        { name: "南昌", coords: [28.682, 115.858], story: "小吃特别多，油条糍粑一万个好评！" },
        { name: "南京", coords: [32.060, 118.796], story: "去看音乐节，最难忘的是喜欢上汪苏泷，景点人太多，鱼嘴很惬意！" },
        { name: "贵阳", coords: [26.647, 106.630], story: "气候非常好，吃的也很好吃。" },
        // 新增城市
        { name: "自贡", coords: [29.359, 104.776], story: "方特很好玩，我将走遍全国各地的方特。" },
        { name: "成都", coords: [30.5728, 104.0668], story: "包容性超级强的城市，即便在街上看到coser也不会惊讶。" },
        { name: "北京", coords: [39.9042, 116.4074], story: "打卡各大热门景点，太热了，没去长城。" },
        { name: "莆田", coords: [25.438, 119.077], story: "拥有自己的风俗，乡下全是高楼大厦。" }
    ];

    // 4. 添加标记和弹出信息
    cities.forEach(city => {
        const marker = L.marker(city.coords).addTo(map);
        marker.bindPopup(`<strong>${city.name}</strong><br>${city.story}`);
    });
});
