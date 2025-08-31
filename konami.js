const konamiCode = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
    "b","a","b","a"
];

let konamiPosition = 0;

window.addEventListener("keydown", (e) => {
    if(e.key === konamiCode[konamiPosition]){
        konamiPosition++;
        if(konamiPosition === konamiCode.length){
            activateMaze();
            konamiPosition = 0;
        }
    } else {
        konamiPosition = 0;
    }
});

function activateMaze() {
    // 创建迷宫容器
    if(document.getElementById("maze-container")) return; // 避免重复触发

    const container = document.createElement("div");
    container.id = "maze-container";
   container.style.position = "fixed";
container.style.top = "50%";
container.style.left = "50%";
container.style.transform = "translate(-50%, -50%)";
container.style.width = "400px";
container.style.height = "400px";
container.style.background = "#222";
container.style.border = "4px solid #a18c96";
container.style.zIndex = "10000";
container.style.display = "grid";
container.style.gridTemplateRows = "repeat(10, 1fr)";
container.style.gridTemplateColumns = "repeat(10, 1fr)";

    document.body.appendChild(container);

    // 简单迷宫地图 0=空 1=墙
    const mazeMap = [
        [0,1,0,0,0,1,0,0,1,0],
        [0,1,0,1,0,1,0,1,1,0],
        [0,0,0,1,0,0,0,1,0,0],
        [1,1,0,1,1,1,0,1,0,1],
        [0,0,0,0,0,1,0,0,0,0],
        [0,1,1,1,0,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,1,0],
        [0,1,0,1,1,1,1,0,1,0],
        [0,0,0,0,0,0,1,0,0,0],
        [1,1,1,1,1,0,1,1,1,0]
    ];

    // 绘制迷宫
    const cells = [];
    for(let r=0;r<10;r++){
        for(let c=0;c<10;c++){
            const cell = document.createElement("div");
            cell.style.border = "1px solid #555";
            cell.style.background = mazeMap[r][c] ? "#555" : "#eee";
            cell.dataset.row = r;
            cell.dataset.col = c;
            container.appendChild(cell);
            cells.push(cell);
        }
    }

    // 玩家
    let playerPos = {row:0, col:0};
    const player = document.createElement("div");
    player.style.background = "#ff4da6";
    player.style.width = "100%";
    player.style.height = "100%";
    cells[0].appendChild(player);

    // 移动玩家
    function movePlayer(dr, dc){
        const newRow = playerPos.row + dr;
        const newCol = playerPos.col + dc;
        if(newRow<0||newRow>9||newCol<0||newCol>9) return;
        if(mazeMap[newRow][newCol]===1) return;

        cells[playerPos.row*10 + playerPos.col].removeChild(player);
        playerPos.row = newRow;
        playerPos.col = newCol;
        cells[playerPos.row*10 + playerPos.col].appendChild(player);

        // 到达终点
    if(playerPos.row===9 && playerPos.col===9){
    setTimeout(()=>{
        alert("恭喜你走出迷宫！🎉");
        container.remove(); // 让迷宫消失
    },50);
}
    }



    window.addEventListener("keydown", e=>{
        switch(e.key){
            case "ArrowUp": movePlayer(-1,0); break;
            case "ArrowDown": movePlayer(1,0); break;
            case "ArrowLeft": movePlayer(0,-1); break;
            case "ArrowRight": movePlayer(0,1); break;
        }
    });
}
