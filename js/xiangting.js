Majiang.Util = {};

(function(){

/*
 *  Majiang.Util.xiangting
 */

function getDazi(bingpai) {

    let n_pai  = 0;
    let n_dazi = 0;
    
    for (let n = 1; n <= 9; n++) {
        n_pai += bingpai[n];
        if (n <= 7 && bingpai[n+1] == 0 && bingpai[n+2] == 0) {
            n_dazi += Math.floor(n_pai / 2);
            n_pai = 0;
        }
    }
    n_dazi += Math.floor(n_pai / 2);
    /*let n_pai  = 0;
    let n_dazi = 0;    
    for (let n = 1; n <= 9; n++) {
        n_pai += bingpai[n];
        if (n <= 7 && bingpai[n+1] == 0 && bingpai[n+2] == 0) {
            n_dazi += Math.floor(n_pai / 2);
            n_pai = 0;
        }else if(n==8 && bingpai[9]==0&&bingpai[1]==0){
            n_dazi +=Math.floor(n_pai/2);
            n_pai=0;
        }else if(n==9 && bingpai[1]==0&&bingpai[2]==0){
            n_dazi +=Math.floor(n_pai/2);
            n_pai=0;
        }
    }
    n_dazi += Math.floor(n_pai / 2);*/
    
    return n_dazi;
}

function getDazi2(bingpaiMPS){
    let n_pai=0, n_dazi=0, n=0;
    for(n=1;n<=9;n++){
        if( (n<=8 && bingpaiMPS[n]==0&&bingpaiMPS[n+1]==0) || (n==9 && bingpaiMPS[9]==0&&bingpaiMPS[1]==0) ){
            n=(n%9)+1;
            break;
        }
    }
    for(let k=0;k<9;k++){
        const npk=(n+k-1)%9+1, npk_p1=npk%9+1, npk_p2=(npk+1)%9+1;
        n_pai += bingpaiMPS[npk];
        if(bingpaiMPS[npk_p1]==0&&bingpaiMPS[npk_p2]==0){
            n_dazi += Math.floor(n_pai/2);
            n_pai=0;
        }
    }
    return n_dazi+Math.floor(n_pai/2);
}

function getDaziZ(bingpai){
    return Math.floor( (bingpai[1]+bingpai[2]+bingpai[3]+bingpai[4])/2 ) + Math.floor( (bingpai[5]+bingpai[6]+bingpai[7])/2 );
}

function getMianziMPS2(bingpai, n, k){
    if(k>9) {
        const n_dazi=getDazi(bingpai);
        return [[0, n_dazi], [0, n_dazi]];
    }
    let max=getMianziMPS2(bingpai, n, k+1);
    const N=(n+k-1)%9+1, N_p1=(n+k)%9+1, N_p2=(n+k+1)%9+1;
    if(bingpai[N]>0 && bingpai[N_p1]>0 && bingpai[N_p2]>0){
        bingpai[N]--; bingpai[N_p1]--; bingpai[N_p2]--;
        shunzi = getMianziMPS2(bingpai, n, k);
        bingpai[N]++; bingpai[N_p1]++; bingpai[N_p2]++;
        r[0][0]++; r[1][0]++; //
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    }
    if(bingpai[N]>=3){
        bingpai[N] -=3;
        let r=getMianziMPS2(bingpai, n, k);
        bingpai[N] +=3;
        r[0][0]++; r[1][0]++; //
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    }
    return max;
}

function getMianziMPS(bingpai, n) {

    if (n > 9) { // 面子を抜き取り終えたら、塔子を数える
        const n_dazi = getDazi2(bingpai);
        return [[0, n_dazi], [0, n_dazi]];
    }

    let max = getMianziMPS(bingpai, n+1);
    
    if (n <= 7 && bingpai[n] > 0 && bingpai[n+1] > 0 && bingpai[n+2] > 0) {
        bingpai[n]--; bingpai[n+1]--; bingpai[n+2]--;
        let r = getMianziMPS(bingpai, n);
        bingpai[n]++; bingpai[n+1]++; bingpai[n+2]++;
        r[0][0]++; r[1][0]++; //
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    } else if(bingpai[8]>0 && bingpai[9]>0 && bingpai[1]>0){
        bingpai[8]--; bingpai[9]--; bingpai[1]--;
        let r=getMianziMPS(bingpai, 8);
        bingpai[8]++; bingpai[9]++; bingpai[1]++;
        r[0][0]++; r[1][0]++; //
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    } else if(bingpai[9]>0 && bingpai[1]>0 && bingpai[2]>0 ){
        bingpai[9]--; bingpai[1]--; bingpai[2]--;
        let r = getMianziMPS(bingpai, 9);
        bingpai[9]++; bingpai[1]++; bingpai[2]++;
        r[0][0]++; r[1][0]++; //
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    }
    
    if (bingpai[n] >= 3) {
        bingpai[n] -= 3;
        let r = getMianziMPS(bingpai, n);
        bingpai[n] += 3;
        r[0][0]++; r[1][0]++
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    }
    
    return max;
}

function getMianziZ(bingpai, n){
    if(n>7){ // 面子を抜き取り終えたら、塔子を数える
        const n_dazi=getDaziZ(bingpai);
        return [[0,n_dazi],[0,n_dazi]];
    }
    let max = getMianziZ(bingpai, n+1);
    if( n<=2 && bingpai[n] > 0 && bingpai[n+1] > 0 && bingpai[n+2] > 0){ // 東南西 or 南西北 の順子
        bingpai[n]--; bingpai[n+1]--; bingpai[n+2]--;
        let r = getMianziZ(bingpai, n);
        bingpai[n]++; bingpai[n+1]++; bingpai[n+2]++;
        r[0][0]++; r[1][0]++
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    } else if(n==3 && bingpai[3] > 0 && bingpai[4] > 0 && bingpai[1] > 0){ // 西北東の順子
        bingpai[3]--; bingpai[4]--; bingpai[1]--;
        let r = getMianziZ(bingpai, 3);
        bingpai[3]++; bingpai[4]++; bingpai[1]++;
        r[0][0]++; r[1][0]++
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    } else if(n==4 && bingpai[4] > 0 && bingpai[1] > 0 && bingpai[2] > 0){ // 北東南の順子
        bingpai[4]--; bingpai[1]--; bingpai[2]--;
        let r = getMianziZ(bingpai, 4);
        bingpai[4]++; bingpai[1]++; bingpai[2]++;
        r[0][0]++; r[1][0]++
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    } else if(n==5 && bingpai[5] > 0 && bingpai[6] > 0 && bingpai[7] > 0){ //白發中の順子
        bingpai[5]--; bingpai[6]--; bingpai[7]--;
        let r = getMianziZ(bingpai, 5);
        bingpai[5]++; bingpai[6]++; bingpai[7]++;
        r[0][0]++; r[1][0]++
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    }

    if (bingpai[n] >= 3) {
        bingpai[n] -= 3;
        let r = getMianziZ(bingpai, n);
        bingpai[n] += 3;
        r[0][0]++; r[1][0]++
        if (r[0][0]* 2 + r[0][1] > max[0][0]* 2 + max[0][1]) max[0] = r[0];
        if (r[1][0]*10 + r[1][1] > max[1][0]*10 + max[1][1]) max[1] = r[1];
    }

    return max;
}

function getMianziAll(shoupai) {

    let r = {};
    
    // 各色について、1から面子切り分けした場合と2から面子切り分けした場合と3から面子切り分けした場合を組み合わせる
    r.m = getMianziMPS(shoupai._bingpai.m ,1).concat(getMianziMPS(shoupai._bingpai.m, 2)).concat(getMianziMPS(shoupai._bingpai.m,3));
    r.p = getMianziMPS(shoupai._bingpai.p ,1).concat(getMianziMPS(shoupai._bingpai.p, 2)).concat(getMianziMPS(shoupai._bingpai.p,3));
    r.s = getMianziMPS(shoupai._bingpai.s ,1).concat(getMianziMPS(shoupai._bingpai.s, 2)).concat(getMianziMPS(shoupai._bingpai.s,3));
    r.z = getMianziZ(shoupai._bingpai.z, 1).concat(getMianziZ(shoupai._bingpai.z, 2)).concat(getMianziZ(shoupai._bingpai.z,3));
    const n_fulou = shoupai._fulou.length;


    let min_xiangting = 8;
    
    for (const m of r.m) {
        for (const p of r.p) {
            for (const s of r.s) {
                for(const z of r.z){
                    let n_mianzi = m[0] + p[0] + s[0] + z[0] + n_fulou;
                    let n_dazi   = m[1] + p[1] + s[1] + z[1];
                    if (n_mianzi > 4) n_mianzi = 4;
                    if (n_mianzi + n_dazi > 4) n_dazi = 4 - n_mianzi;
                    const xiangting = 8 - n_mianzi * 2 - n_dazi;
                    if (xiangting < min_xiangting) min_xiangting = xiangting;
                }
            }
        }
    }
    
    return min_xiangting;
}

function getPaishu(shoupai) {
 
    let n_pai = shoupai._fulou.length * 3;
    for (const s in shoupai._bingpai) {
        const bingpai = shoupai._bingpai[s];
        for (let n = 1; n < bingpai.length; n++) {
            n_pai += bingpai[n];
        }
    }
    return n_pai;
}

function getXiangtingYiban(shoupai) {
    
    // 取り敢えず雀頭無しと仮定して、シャンテン数を計算
    let min_xiangting = getMianziAll(shoupai) + (getPaishu(shoupai) < 13 ? 1 : 0);
    
    for (const s of ['m','p','s','z']) {
        for (let n = 1; n <= shoupai._bingpai[s].length; n++) {
            if (shoupai._bingpai[s][n] >= 2) { // 雀頭探し
                shoupai._bingpai[s][n] -= 2;
                const xiangting = getMianziAll(shoupai) - 1; // 雀頭を抜いてから、面子と塔子の数を数える
                shoupai._bingpai[s][n] += 2;
                if (xiangting < min_xiangting) min_xiangting = xiangting;
            }
        }
    }
    
    return min_xiangting;
}

function getXiangtingGuoshi(shoupai) {

    let n_yaojiu  = 0;
    let you_duizi = false;

    for (const s in shoupai._bingpai) {
        const bingpai = shoupai._bingpai[s];
        const nn = (s == 'z') ? [1,2,3,4,5,6,7] : [1,9];
        for (const n of nn) {
            if (bingpai[n] > 0) n_yaojiu++;
            if (bingpai[n] > 1) you_duizi = true;
        }
    }

    return you_duizi ? 12 - n_yaojiu : 13 - n_yaojiu;
}

function getXiangtingQiduizi(shoupai) {
    let n_duizi = 0;
    let n_danqi = 0;    
    for (const s of ['m','p','s','z']) {
        const bingpai = shoupai._bingpai[s];
        for (let n = 1; n < bingpai.length; n++) {
            if      (bingpai[n] >= 2) n_duizi++;
            else if (bingpai[n] == 1) n_danqi++;
        }
    }
    return (n_duizi + n_danqi < 7)
                ? 6 - n_duizi + (7 - n_duizi - n_danqi)
                : 6 - n_duizi;
    /*let n_duizi = 0;
    for (const s of ['m','p','s','z']) {
        const bingpai = shoupai._bingpai[s];
        for (let n = 1; n < bingpai.length; n++) {
            if      (bingpai[n] >= 2) n_duizi++;
        }
    }
    return 6 - n_duizi;*/
}

Majiang.Util.xiangting = function(shoupai) {

    var min_xiangting = getXiangtingYiban(shoupai);
    //console.log("4面子1雀頭:"+min_xiangting+"向聴");
    
    if (shoupai._fulou.length == 0) {
        var xiangting = getXiangtingQiduizi(shoupai);
        if (xiangting < min_xiangting){
             min_xiangting = xiangting;
             //console.log("七対子:"+min_xiangting+"向聴");
        }
    
        var xiangting = getXiangtingGuoshi(shoupai);
        if (xiangting < min_xiangting){
             min_xiangting = xiangting;
        }
    }

    return min_xiangting;
}

Majiang.Util.tingpai = function(shoupai, xiangting) {

    var pai = [];
 
    if (shoupai._zimo) return pai;
 
    xiangting = xiangting || Majiang.Util.xiangting;
 
    var n_xiangting = xiangting(shoupai);
    for (var s of ['m','p','s','z']) {
        var bingpai = shoupai._bingpai[s];
        for (var n = 1; n < bingpai.length; n++) {
            if (bingpai[n] >= 4) continue;
            bingpai[n]++;
            if (xiangting(shoupai) < n_xiangting) pai.push(s+n);
            bingpai[n]--;
        }
    }
 
    return pai;
}

})();
