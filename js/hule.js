/*
 *  Majiang.Util.hule
 */

(function(){

function getMianziMPS2(color, bingpai, n, k) {
    if (k > 9) return [[]];
    const N=(n+k-1)%9+1, N_p1=(n+k)%9+1, N_p2=(n+k+1)%9+1;
    if (bingpai[N] == 0) return getMianziMPS2(color, bingpai, n, k+1);    
    let shunzi = [];
    if (bingpai[N] > 0 && bingpai[N_p1] > 0 && bingpai[N_p2] > 0) {
        bingpai[N]--; bingpai[N_p1]--; bingpai[N_p2]--;
        shunzi = getMianziMPS2(color, bingpai, n, k);
        bingpai[N]++; bingpai[N_p1]++; bingpai[N_p2]++;
        for (let s_mianzi of shunzi) {
            s_mianzi.unshift(color+(N)+(N_p1)+(N_p2));
        }
    }
    let kezi = [];
    if (bingpai[N] >= 3) {
        bingpai[N] -= 3;
        kezi = getMianziMPS2(color, bingpai, n, k);
        bingpai[N] += 3;
        for (let k_mianzi of kezi) {
            k_mianzi.unshift(color+N+N+N);
        }
    }    
    return shunzi.concat(kezi);
}

function getMianziMPS(color, bingpai, n) {
    if (n > 9) return [[]];
    
    if (bingpai[n] == 0) return getMianziMPS(color, bingpai, n+1);
    
    let shunzi = [];
    if (n <= 7 && bingpai[n] > 0 && bingpai[n+1] > 0 && bingpai[n+2] > 0) {
        bingpai[n]--; bingpai[n+1]--; bingpai[n+2]--;
        shunzi = getMianziMPS(color, bingpai, n);
        bingpai[n]++; bingpai[n+1]++; bingpai[n+2]++;
        for (let s_mianzi of shunzi) {
            s_mianzi.unshift(color+(n)+(n+1)+(n+2));
        }
    } else if(bingpai[8]>0 && bingpai[9]>0 && bingpai[1]>0 ){
        bingpai[8]--; bingpai[9]--; bingpai[1]--;
        shunzi = getMianziMPS(color, bingpai, 8);
        bingpai[8]++; bingpai[9]++; bingpai[1]++;
        for(let s_mianzi of shunzi){
            s_mianzi.unshift(color+"891");
        }
    } else if(bingpai[9]>0 && bingpai[1]>0 && bingpai[2]>0 ){
        bingpai[9]--; bingpai[1]--; bingpai[2]--;
        shunzi = getMianziMPS(color, bingpai, 9);
        bingpai[9]++; bingpai[1]++; bingpai[2]++;
        for(let s_mianzi of shunzi){
            s_mianzi.unshift(color+"912");
        }
    }

    let kezi = [];
    if (bingpai[n] >= 3) {
        bingpai[n] -= 3;
        kezi = getMianziMPS(color, bingpai, n);
        bingpai[n] += 3;
        for (let k_mianzi of kezi) {
            k_mianzi.unshift(color+n+n+n);
        }
    }
    
    return shunzi.concat(kezi);
}

function getMianziZ(bingpai, n){
    if(n>7) return [[]];
    if(bingpai[n]==0) return getMianziZ(bingpai, n+1);
    let shunzi=[];
    if( n<=2 && bingpai[n] > 0 && bingpai[n+1] > 0 && bingpai[n+2] > 0){ // 東南西 or 南西北 の順子
        bingpai[n]--; bingpai[n+1]--; bingpai[n+2]--;
        shunzi = getMianziZ(bingpai, n);
        bingpai[n]++; bingpai[n+1]++; bingpai[n+2]++;
        for(let s_mianzi of shunzi){
            s_mianzi.unshift('z'+(n)+(n+1)+(n+2));
        }
    } else if(n==3 && bingpai[3] > 0 && bingpai[4] > 0 && bingpai[1] > 0){ // 西北東の順子
        bingpai[3]--; bingpai[4]--; bingpai[1]--;
        shunzi = getMianziZ(bingpai, 3);
        bingpai[3]++; bingpai[4]++; bingpai[1]++;
        for(let s_mianzi of shunzi){
            s_mianzi.unshift('z341');
        }
    } else if(n==4 && bingpai[4] > 0 && bingpai[1] > 0 && bingpai[2] > 0){ // 北東南の順子
        bingpai[4]--; bingpai[1]--; bingpai[2]--;
        shunzi = getMianziZ(bingpai, 4);
        bingpai[4]++; bingpai[1]++; bingpai[2]++;
        for(let s_mianzi of shunzi){
            s_mianzi.unshift('z412');
        }
    } else if(n==5 && bingpai[5] > 0 && bingpai[6] > 0 && bingpai[7] > 0){ //白發中の順子
        bingpai[5]--; bingpai[6]--; bingpai[7]--;
        shunzi = getMianziZ(bingpai, 5);
        bingpai[5]++; bingpai[6]++; bingpai[7]++;
        for(let s_mianzi of shunzi){
            s_mianzi.unshift('z567');
        }
    }

    var kezi = [];
    if(bingpai[n]>=3 ){
        bingpai[n]-=3;
        kezi = getMianziZ(bingpai, n);
        bingpai[n]+=3;
        for(let k_mianzi of kezi){
            k_mianzi.unshift('z'+n+n+n);
        }
    }
    return shunzi.concat(kezi);
}

function getMianziAll(shoupai) {
    let mianzi_MPSZ = [[]];
    for (var s of ['m','p','s','z']) { // m/s/p/zの面子分解
        let new_mianzi = [];
        for(let i=1;i<=3;i++){
            const sub_mianzi = 
               ('z'==s? getMianziZ(shoupai._bingpai['z'],i): getMianziMPS2(s, shoupai._bingpai[s], i,0));
            for (const mm of mianzi_MPSZ) {
                for (const nn of sub_mianzi) {
                    new_mianzi.push( mm.concat(nn) );
                }
            }
        }
        mianzi_MPSZ = new_mianzi;
    }

    // 副露面子
    const MIANZI_fulow = shoupai._fulou.map(function(m){return m.replace(/0/g ,'5')}); 

    // MPSZ面子の組み合わせに対して、副露面子を追加
    let mianzi_all=Array(0);
    for(const mm of mianzi_MPSZ){
        mianzi_all.push( mm.concat(MIANZI_fulow) );
    }
    //console.dir(mianzi_all);

    return mianzi_all;
}

function add_hulepai(hule_mianzi, p) {

    var regexp   = new RegExp('^(' + p[0] + '.*' + (p[1] || '5') +')');
    var replacer = '$1' + p[2] + '!';
    
    var new_mianzi = [];
    
    for (var i = 0; i < hule_mianzi.length; i++) {
        if (hule_mianzi[i].match(/[\-\+\=]/)) continue;
        if (i > 0 && hule_mianzi[i] == hule_mianzi[i-1]) continue;
        var m = hule_mianzi[i].replace(regexp, replacer);
        if (m == hule_mianzi[i]) continue;
        var tmp_mianzi = hule_mianzi.concat();
        tmp_mianzi[i] = m;
        new_mianzi.push(tmp_mianzi);
    }
    
    return new_mianzi;
}

/**
 * 4面子1雀頭形を全ての和了形に分解する
 */
function hule_mianzi_yiban(shoupai, hulepai) {
    var hule_mianzi = [];
    
    for (var s in shoupai._bingpai) { // 's'は色、s={m,p,s,z}のループ
        var bingpai = shoupai._bingpai[s]; // bingpaiはs色の手牌, bingpai={0:0, 1:0, ..., 9:2};数字に対する手持ちの数の連想配列
        for (var n = 1; n < bingpai.length; n++) { // 1～9まで(字牌は1～7まで)ループ
            //console.log("hule_mianzi_yiban():"+s+n+','+bingpai[n]);
            if (bingpai[n] < 2){
                continue; //雀頭探し
            }
            bingpai[n] -= 2; // 雀頭だけ抜く
            var jiangpai = s+n+n; // 雀頭=jaingpai;
            for (var mm of getMianziAll(shoupai)) {
                if(mm.length!=4) continue; //4面子なかったら、次の和了形に
                mm.unshift(jiangpai); // 雀頭をmmにくっつける
                hule_mianzi = hule_mianzi.concat(add_hulepai(mm, hulepai)); //和了牌の処理
            }
            bingpai[n] += 2;
        }
    }
    return hule_mianzi;
}

/**
 * 七対子形を全ての和了形に分解する
 */
function hule_mianzi_qiduizi(shoupai, hulepai) {

    var mianzi = [];
    
    for (var s in shoupai._bingpai) {
        var bingpai = shoupai._bingpai[s];
        for (var n = 1; n < bingpai.length; n++) {
            if (bingpai[n] == 0) continue;
            if (bingpai[n] == 2) {
                var p = (s+n == hulepai.substr(0,2))
                            ? s+n+n + hulepai[2] + '!'
                            : s+n+n;
                mianzi.push(p);
            }
            else return [];
        }
    }

    return (mianzi.length == 7) ? [mianzi] : [];
}

/**
 * 国士無双形を全ての和了形に分解する
 */
function hule_mianzi_guoshi(shoupai, hulepai) {

    var mianzi = [];

    if (shoupai._fulou.length > 0) return mianzi;
    
    var you_duizi = false;
    for (var s in shoupai._bingpai) {
        var bingpai = shoupai._bingpai[s];
        var nn = (s == 'z') ? [1,2,3,4,5,6,7] : [1,9];
        for (var n of nn) {
            if (bingpai[n] == 2) {
                var p = (s+n == hulepai.substr(0,2))
                            ? s+n+n + hulepai[2] + '!'
                            : s+n+n;
                mianzi.unshift(p);
                you_duizi = true;
            }
            else if (bingpai[n] == 1) {
                var p = (s+n == hulepai.substr(0,2))
                            ? s+n + hulepai[2] + '!'
                            : s+n;
                mianzi.push(p);
            }
            else return [];
        }
    }

    return you_duizi ? [mianzi] : [];
}

function hule_mianzi_jiulian(shoupai, hulepai) {

    var s = hulepai[0];
    if (! s.match(/^[mps]$/)) return [];
    
    var mianzi = s;
    var bingpai = shoupai._bingpai[s];
    for (var n = 1; n <= 9; n++) {
        if ((n == 1 || n == 9) && bingpai[n] < 3) return [];
        if (bingpai[n] == 0) return [];
        var nn = (n == hulepai[1]) ? bingpai[n] - 1 : bingpai[n];
        for (var i = 0; i < nn; i++) {
            mianzi += n;
        }
    }
    mianzi += hulepai.substr(1) + '!';

    return [[mianzi]];
}

/**
 * 和了形を全ての和了形に分解する
 * 入力 shoupai:手牌(副露牌、自摸牌も含む) rongpai:栄和牌
 */
function hule_mianzi(shoupai, rongpai) {

    var hulepai = rongpai || shoupai._zimo + '_'; // hulepai:和了牌、ロンの時はrongpai, ronpaiがない時は自摸なので、shoupai._zimo
    hulepai = hulepai.replace(/0/, '5'); // 和了牌の赤ドラを赤じゃなくする。赤の処理は別に後で行う
    
    return [].concat(hule_mianzi_yiban(shoupai, hulepai))
             .concat(hule_mianzi_qiduizi(shoupai, hulepai))
             .concat(hule_mianzi_guoshi(shoupai, hulepai))
             .concat(hule_mianzi_jiulian(shoupai, hulepai));
}
/**
 * mianzi:手牌が面子ごとにバラバラにされ、配列として入力
 * mianzi[n]={"p99","p123-!","m456","s456","s789"};
 */
function getHudi(mianzi, zhuangfeng, menfeng) {

    const ZHUANGFENGPAI_REGEXP = new RegExp('^z' + (zhuangfeng + 1) + '.*$'); // 自分風か場風
    const MENFENGPAI_REGEXP    = new RegExp('^z' + (menfeng + 1) + '.*$'); // 自風か場風
    const SANYUANPAI_REGEXP    = /^z[567].*$/; // 三元牌
    
    const YAOJIU_REGEXP        = /^.*[z19].*$/; // 么九牌
    const ZIPAI_REGEXP         = /^z.*$/; // 字牌
    
    const KEZI_REGEXP          = /^[mpsz](\d)\1\1.*$/;
    const ANKEZI_REGEXP        = /^[mpsz](\d)\1\1(?:\1|_\!)?$/;
    const GANGZI_REGEXP        = /^[mpsz](\d)\1\1.*\1.*$/;
    
    const DANQI_REGEXP         = /^[mpsz](\d)\1[\-\+\=\_]\!$/;
    const KANZHANG_REGEXP      = /^[mps]\d\d[\-\+\=\_]\!\d$/;
    const BIANZHANG_REGEXP     = /^[mps](123[\-\+\=\_]\!|7[\-\+\=\_]\!89)$/;

    let hudi = {
        fu:         20,
        menqian:    true,
        zimo:       true,
        shunzi:     { m: {}, p: {}, s: {} , z:{} },
        kezi:       { m: [0,0,0,0,0,0,0,0,0,0],
                      p: [0,0,0,0,0,0,0,0,0,0],
                      s: [0,0,0,0,0,0,0,0,0,0],
                      z: [0,0,0,0,0,0,0,0]      },
        n_shunzi:   0, //順子の数
        n_kezi:     0, //刻子の数
        n_ankezi:   0, //暗刻の数
        n_gangzi:   0, //槓子の数
        n_zipai:    0, //字牌の数
        n_yaojiu:   0, //么九牌の数
        danqi:      false,
        pinghu:     false,
        zhuangfeng: zhuangfeng,
        menfeng:    menfeng
    };
    
    for (let m of mianzi) {
        //console.log(m);
    
        if (m.match(/[\-\+\=]\!/))      hudi.zimo    = false;
        if (m.match(/[\-\+\=](?!\!)/))  hudi.menqian = false;
        
        if (m.match(YAOJIU_REGEXP))            hudi.n_yaojiu++;
        if (m.match(ZIPAI_REGEXP))             hudi.n_zipai++;

        if (m.match(DANQI_REGEXP))             hudi.danqi = true;
        
        if (mianzi.length != 5) continue;
        
        if (m == mianzi[0]) { // 雀頭
            let fu = 0;
            if (m.match(ZHUANGFENGPAI_REGEXP)) fu += 2;
            if (m.match(MENFENGPAI_REGEXP))    fu += 2;
            if (m.match(SANYUANPAI_REGEXP))    fu += 2;
            hudi.fu += fu;
            if (hudi.danqi)             hudi.fu += 2;
        }
        else if (m.match(KEZI_REGEXP)) { //刻子
            hudi.n_kezi++;
            let fu = 2;
            if (m.match(YAOJIU_REGEXP)) { fu *= 2;                  }
            if (m.match(ANKEZI_REGEXP)) { fu *= 2; hudi.n_ankezi++; }
            if (m.match(GANGZI_REGEXP)) { fu *= 4; hudi.n_gangzi++; }
            hudi.fu += fu;
            hudi.kezi[m[0]][m[1]] = 1;
        }
        else { // 順子
            hudi.n_shunzi++;
            if (m.match(KANZHANG_REGEXP))  hudi.fu += 2;
            if (m.match(BIANZHANG_REGEXP)) hudi.fu += 2;
            const nnn = m.replace(/[^\d]/g, '');
            if (! hudi.shunzi[m[0]][nnn])   hudi.shunzi[m[0]][nnn] = 1;
            else                            hudi.shunzi[m[0]][nnn]++;
        }
    }
    
    if (mianzi.length == 7) { // 7面子なら七対子なので25符
        hudi.fu = 25;
    }
    else if (mianzi.length == 5) { // 5面子
        hudi.pinghu = (hudi.menqian && hudi.n_shunzi==4 ? true : false);// (hudi.menqian && hudi.fu == 20); // 門前&20符⇛平和FLAGを立てる
        if (hudi.zimo) { // 自摸
            if (! hudi.pinghu)      hudi.fu +=  2; //ピンヅモには自摸符を加えない
        } // 栄和
        else {
            if (hudi.menqian)       hudi.fu += 10;
            else if (hudi.fu == 20) hudi.fu  = 30;
        }
        hudi.fu = Math.ceil(hudi.fu / 10) * 10; // 符の1桁を切り上げ
    }
    
    return hudi;
}

function get_pre_hupai(hupai) {

    let pre_hupai = [];
    
    if (hupai.lizhi == 1)   pre_hupai.push({ name: '立直', fanshu: 1, point:1});
    if (hupai.lizhi == 2)   pre_hupai.push({ name: 'ダブル立直', fanshu: 2, point:1});
    if (hupai.yifa)         pre_hupai.push({ name: '一発', fanshu: 1, point:1});
    if (hupai.haidi == 1)   pre_hupai.push({ name: '海底摸月', fanshu: 1, point:1});
    if (hupai.haidi == 2)   pre_hupai.push({ name: '河底撈魚', fanshu: 1, point:1});
    if (hupai.lingshang)    pre_hupai.push({ name: '嶺上開花', fanshu: 1, point:1});
    if (hupai.qianggang)    pre_hupai.push({ name: '槍槓', fanshu: 1, point:10});

    if (hupai.tianhu == 1)  pre_hupai = [{ name: '天和', fanshu: '*', point:20}];
    if (hupai.tianhu == 2)  pre_hupai = [{ name: '地和', fanshu: '*', point:20}];

    return pre_hupai;
}

/**
 * 役判定関数、get_pre_hupai,get_post_hupai以外の役を判定する
 * 入力 mianzi: hudai: pre_hupai:get_pre_hupaiの出力
 * 出力 役と翻数の組の配列 [{name:'平和', fanshu:1}, {name:'断么九', fansu:1}, ...]
 */

function get_hupai(mianzi, hudi, pre_hupai) {

    function menqianqing() {
        if (hudi.menqian && hudi.zimo)
                return [{ name: '門前清自摸和', fanshu: 1 , point:1}];
        return [];
    }
    function fanpai() {
        const feng_hanzi = ['東','南','西','北'];
        let fanpai_all = [];
        if (hudi.kezi.z[hudi.zhuangfeng+1])
                fanpai_all.push({ name: '場風 ' + feng_hanzi[hudi.zhuangfeng],
                                  fanshu: 1 ,point:1});
        if (hudi.kezi.z[hudi.menfeng+1])
                fanpai_all.push({ name: '自風 ' + feng_hanzi[hudi.menfeng],
                                  fanshu: 1 , point:1});
        if (hudi.kezi.z[5]) fanpai_all.push({ name: '翻牌 白', fanshu: 1 , point:1});
        if (hudi.kezi.z[6]) fanpai_all.push({ name: '翻牌 發', fanshu: 1 , point:1});
        if (hudi.kezi.z[7]) fanpai_all.push({ name: '翻牌 中', fanshu: 1 , point:1});
        return fanpai_all;
    }
    function pinghu() {
        if (hudi.menqian && hudi.pinghu)        return [{ name: '平和', fanshu: 1 , point:1}];
        return [];
    }
    function duanyaojiu() {
        if (hudi.n_yaojiu == 0) return [{ name: '断幺九', fanshu: 1 , point:1}];
        return [];
    }
    function yibeikou() {
        if (! hudi.menqian)     return [];
        let beikou = 0;
        for (const s in hudi.shunzi) {
            for (const m in hudi.shunzi[s]) {
                if (hudi.shunzi[s][m] > 3) beikou++;
                if (hudi.shunzi[s][m] > 1) beikou++;
            }
        }
        if (beikou == 1)        return [{ name: '一盃口', fanshu: 1 , point:1}];
        return [];
    }
    function sansetongshun() {
        const shunzi = hudi.shunzi;
        for (const m in shunzi.m) {
            if (shunzi.p[m] && shunzi.s[m])
                return [{ name: '三色同順', fanshu: (hudi.menqian ? 2 : 1) , point:2}];
        }
        return [];
    }
    function yiqitongguan() {
        const shunzi = hudi.shunzi;
        for (const s in shunzi) {
            if ( (shunzi[s][123] && shunzi[s][456] && shunzi[s][789]) || (shunzi[s][234] && shunzi[s][567] && shunzi[s][891]) || (shunzi[s][345] && shunzi[s][678] && shunzi[s][912]) )
                return [{ name: '一気通貫', fanshu: (hudi.menqian ? 2 : 1) , point:2}];
        }
        return [];
    }
    function hunquandaiyaojiu() {
        if (hudi.n_yaojiu == 5 && hudi.n_shunzi > 0 && hudi.n_zipai > 0)
                return [{ name: '混全帯幺九', fanshu: (hudi.menqian ? 2 : 1) , point:2}];
        return [];
    }
    function qiduizi() {
        if (mianzi.length == 7)     return [{ name: '七対子', fanshu: 2 , point:3}];
        return [];
    }
    function duiduihu() {
        if (hudi.n_kezi == 4)       return [{ name: '対々和', fanshu: 2 , point:2}];
        return [];
    }
    function sananke() {
        if (hudi.n_ankezi == 3)     return [{ name: '三暗刻', fanshu: 2 , point:3}];
        return [];
    }
    function sangangzi() {
        if (hudi.n_gangzi == 3)     return [{ name: '三槓子', fanshu: 2 , point:10}];
        return [];
    }
    function sansetongke() {
        const kezi = hudi.kezi;
        for (let n = 1; n <= 9; n++) {
            if (kezi.m[n] + kezi.p[n] + kezi.s[n] == 3)
                                    return [{ name: '三色同刻', fanshu: 2 , point:10 }];
        }
        return [];
    }
    function hunlaotou() {
        if (hudi.n_yaojiu == mianzi.length
            && hudi.n_shunzi == 0 && hudi.n_zipai > 0)
                                    return [{ name: '混老頭', fanshu: 2 , point:10}];
        return [];
    }
    function xiaosanyuan() {
        if (hudi.kezi.z[5] + hudi.kezi.z[6] + hudi.kezi.z[7] == 2
            && mianzi[0].match(/^z[567]/))
                                    return [{ name: '小三元', fanshu: 2 , point:10}];
        return [];
    }
    function hunyise() {
        for (const s of ['m','p','s']) {
            const yise = new RegExp('^[z' + s + '].*$');
            if (mianzi.filter(function(m){return m.match(yise)}).length
                        == mianzi.length
                &&  hudi.n_zipai > 0)
                    return [{ name: '混一色', fanshu: (hudi.menqian ? 3 : 2) , point:10}];
        }
        return [];
    }
    function chunquandaiyaojiu() {
        if (hudi.n_yaojiu == 5 && hudi.n_shunzi > 0 && hudi.n_zipai == 0)
                return [{ name: '純全帯幺九', fanshu: (hudi.menqian ? 3 : 2) , point:10}];
        return [];
    }
    function erbeikou() {
        if (! hudi.menqian)     return [];
        let beikou = 0;
        for (const s in hudi.shunzi) {
            for (var m in hudi.shunzi[s]) {
                if (hudi.shunzi[s][m] > 3) beikou++;
                if (hudi.shunzi[s][m] > 1) beikou++;
            }
        }
        if (beikou == 2)        return [{ name: '二盃口', fanshu: 3 , point:10}];
        return [];
    }
    function qingyise() {
        for (const s of ['m','p','s']) {
            const yise = new RegExp('^[z' + s + '].*$');
            if (mianzi.filter(function(m){return m.match(yise)}).length
                        == mianzi.length
                &&  hudi.n_zipai == 0)
                    return [{ name: '清一色', fanshu: (hudi.menqian ? 6 : 5) , point:10}];
        }
        return [];
    }

    function guoshiwushuang() {
        if (mianzi.length != 13)    return [];
        if (hudi.danqi)     return [{ name: '国士無双十三面', fanshu: '**' , point:10}];
        else                return [{ name: '国士無双', fanshu: '*' , point:10}];
    }
    function sianke() {
        if (hudi.n_ankezi != 4)     return [];
        if (hudi.danqi)     return [{ name: '四暗刻単騎', fanshu: '**' , point:10}];
        else                return [{ name: '四暗刻', fanshu: '*' , point:10}];
    }
    function dasanyuan() {
        if (hudi.kezi.z[5] + hudi.kezi.z[6] + hudi.kezi.z[7] == 3) {
            const bao_mianzi = mianzi.filter(function(m){
                        return m.match(/^z([567])\1\1(?:[\-\+\=]|\1)(?!\!)/)});
            const baojia = (bao_mianzi[2] && bao_mianzi[2].match(/[\-\+\=]/));
            return [{ name: '大三元', fanshu: '*', baojia: baojia && baojia[0] , point:10}];
        }
        return [];
    }
    function sixihu() {
        const kezi = hudi.kezi;
        if (kezi.z[1] + kezi.z[2] + kezi.z[3] + kezi.z[4] == 4) {
            var bao_mianzi = mianzi.filter(function(m){
                        return m.match(/^z([1234])\1\1(?:[\-\+\=]|\1)(?!\!)/)});
            const baojia = (bao_mianzi[3] && bao_mianzi[3].match(/[\-\+\=]/));
            return [{ name: '大四喜', fanshu: '**', baojia: baojia && baojia[0] , point:10}];
        }
        if (kezi.z[1] + kezi.z[2] + kezi.z[3] + kezi.z[4] == 3
            && mianzi[0].match(/^z[1234]/))
                            return [{ name: '小四喜', fanshu: '*' , point:10}];
        return [];
    }
    function ziyise() {
        if (hudi.n_zipai == mianzi.length)
                            return [{ name: '字一色', fanshu: '*' , point:10}];
        return [];
    }
    function lvyise() {
        if (mianzi.filter(function(m){return m.match(/^[mp]/)}).length > 0)
                                            return [];
        if (mianzi.filter(function(m){return m.match(/^z[^6]/)}).length > 0)
                                            return [];
        if (mianzi.filter(function(m){return m.match(/^s.*[1579]/)}).length > 0)
                                            return [];
        return [{ name: '緑一色', fanshu: '*' , point:10}];
    }
    function qinglaotou() {
        if (hudi.n_kezi == 4 && hudi.n_yaojiu == 5 && hudi.n_zipai == 0)
                            return [{ name: '清老頭', fanshu: '*' , point:10}];
        return [];
    }
    function sigangzi() {
        if (hudi.n_gangzi == 4)
                            return [{ name: '四槓子', fanshu: '*' , point:10}];
        return [];
    }
    function jiulianbaodeng() {
        if (mianzi.length != 1)             return [];
        if (mianzi[0].match(/^[mps]1112345678999/))
                            return [{ name: '純正九蓮宝燈', fanshu: '**' , point:10}];
        else                return [{ name: '九蓮宝燈', fanshu: '*' , point:10}];
    }

    let damanguan = (pre_hupai.length > 0 && pre_hupai[0].fanshu[0] == '*')
                        ? pre_hupai : [];
    damanguan = damanguan
                .concat(guoshiwushuang())
                .concat(sianke())
                .concat(dasanyuan())
                .concat(sixihu())
                .concat(ziyise())
                .concat(lvyise())
                .concat(qinglaotou())
                .concat(sigangzi())
                .concat(jiulianbaodeng());

    if (damanguan.length > 0) return damanguan;
    else return pre_hupai
                .concat(menqianqing()) //門前清自摸和
                .concat(fanpai()) //役牌
                .concat(pinghu()) //平和
                .concat(duanyaojiu()) //断么九
                .concat(yibeikou()) //一盃口
                .concat(sansetongshun()) //三色同順
                .concat(yiqitongguan()) //一気通貫
                .concat(hunquandaiyaojiu())
                .concat(qiduizi())
                .concat(duiduihu())
                .concat(sananke())
                .concat(sangangzi())
                .concat(sansetongke())
                .concat(hunlaotou())
                .concat(xiaosanyuan())
                .concat(hunyise())
                .concat(chunquandaiyaojiu())
                .concat(erbeikou())
                .concat(qingyise());
}

function get_post_hupai(paistr, baopai, fubaopai) {

    var post_hupai = [];
    
    var substr = paistr.match(/[mpsz][^mpsz,]*/g) || [];
    
    var n_baopai = 0;
    for (var p of baopai) {
        p = Majiang.Shan.zhenbaopai(p);
        var regexp = new RegExp(p[1],'g');
        for (var str of substr) {
            if (str[0] != p[0]) continue;
            str = str.replace(/0/, '5');
            var nn = str.match(regexp);
            if (nn) n_baopai += nn.length;
        }
    }
    if (n_baopai) post_hupai.push({ name: 'ドラ', fanshu: n_baopai });
    
    var n_hongpai = 0;
    var nn = paistr.match(/0/g);
    if (nn) n_hongpai = nn.length;
    if (n_hongpai) post_hupai.push({ name: '赤ドラ', fanshu: n_hongpai });
    
    var n_fubaopai = 0;
    for (var p of fubaopai) {
        p = Majiang.Shan.zhenbaopai(p);
        var regexp = new RegExp(p[1],'g');
        for (var str of substr) {
            if (str[0] != p[0]) continue;
            str = str.replace(/0/, '5');
            var nn = str.match(regexp);
            if (nn) n_fubaopai += nn.length;
        }
    }
    if (n_fubaopai) post_hupai.push({ name: '裏ドラ', fanshu: n_fubaopai });
    
    return post_hupai;
}

/**
 * 和了形を求めるプログラム
 * http://d.hatena.ne.jp/xlc/20150410/1428678406
 * 入力 shoupai={
 *   _bingpai={
 *       m={0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:1, 8:1, 9:1},
 *       p={0:0, 1:0, 2:1, 3:1, 4:1, 5:0, 6:0, 7:0, 8:0, 9:0},
 *       s={0:0, 1:0, 2:0, 3:2, 4:1, 5:1, 6:1, 7:0, 8:0, 9:0},
 *       z={0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}},
 *   _fulou={
 *       0:"z555="},
 *   _zimo="p3";
 *  };
 * 入力2 rongpai="p3=";
 * 入力3 param={
 *   baopai={0:"m7"},
 *   fubaopai={},
 *   hupai={haidi:0, lingshang:false, lizhi:0, qianggang:false, tianhu:0, yifa:false},
 *   jicun={changbang:0, lizhibang:0},
 *   menfeng=3,
 *   zhuangfeng=0;
 *  };
 *   
 */
Majiang.Util.hule = function(shoupai, rongpai, param) {
    //console.dir(shoupai);
    //console.dir(rongpai);
    //console.dir(param);

    var max = {
        hupai:      null,
        fu:         0,
        fanshu:     0,
        damanguan:  0,
        defen:      0,
        fenpei:     [ 0, 0, 0, 0 ]
    };
    
    var pre_hupai  = get_pre_hupai(param.hupai);
    var post_hupai = get_post_hupai(
                        shoupai.toString(), param.baopai, param.fubaopai);
    //console.dir(pre_hupai);
    //console.dir(post_hupai);
    
    for (var mianzi of hule_mianzi(shoupai, rongpai)) {
        //console.dir(mianzi);
        var hudi  = getHudi(mianzi, param.zhuangfeng, param.menfeng);
        var hupai = get_hupai(mianzi, hudi, pre_hupai);
        //console.dir(hudi);
        //console.dir(hupai);
        
        if (hupai.length == 0) continue; //和了牌が0なら次のループ回へ
        
        var fu = hudi.fu;
        var fanshu = 0, defen = 0, damanguan = 0;
 
        var baojia2, defen2 = 0;

        /*** ここからが点数計算 ****/
        if (hupai[0].fanshu[0] == '*') { // 役満のとき
            for (var h of hupai) {
                damanguan += h.fanshu.match(/\*/g).length;
                if (h.baojia) {
                    baojia2 = h.baojia == '+' ? (param.menfeng + 1) % 4
                            : h.baojia == '=' ? (param.menfeng + 2) % 4
                            : h.baojia == '-' ? (param.menfeng + 3) % 4
                            : -1;
                    defen2  = 8000 * h.fanshu.match(/\*/g).length;
                }
            }
            defen = 8000 * damanguan;
        }
        else { // 役満でないとき
            hupai = hupai.concat(post_hupai);
            for (var h of hupai) { fanshu += h.fanshu }
            if      (fanshu >= 13) defen = 8000;
            else if (fanshu >= 11) defen = 6000;
            else if (fanshu >=  8) defen = 4000;
            else if (fanshu >=  6) defen = 3000;
            else {
                defen = fu * 2 * 2;
                for (var i = 0; i < fanshu; i++) { defen *= 2 }
                if (defen >= 2000) defen = 2000;
            }
        }
        
        var fenpei = [ 0, 0, 0, 0 ];
 
        if (defen2 > 0) {
            if (rongpai) defen2 = defen2 / 2;
            defen  = defen - defen2;
            defen2 = defen2 * (param.menfeng == 0 ? 6 : 4);
            fenpei[param.menfeng] =  defen2;
            fenpei[baojia2]       = -defen2;
        }
 
        var changbang = param.jicun.changbang;
        var lizhibang = param.jicun.lizhibang;
        
        if (rongpai || defen == 0) {
            var baojia = defen == 0        ? baojia2
                       : rongpai[2] == '+' ? (param.menfeng + 1) % 4
                       : rongpai[2] == '=' ? (param.menfeng + 2) % 4
                       : rongpai[2] == '-' ? (param.menfeng + 3) % 4
                       : -1;
            defen = Math.ceil(defen * (param.menfeng == 0 ? 6 : 4) / 100) * 100;
            fenpei[param.menfeng] +=  defen + changbang * 300 + lizhibang * 1000;
            fenpei[baojia]        += -defen - changbang * 300;
        }
        else {
            var zhuangjia = Math.ceil(defen * 2 / 100) * 100;
            var sanjia    = Math.ceil(defen     / 100) * 100;
            if (param.menfeng == 0) {
                defen = zhuangjia * 3;
                for (var l = 0; l < 4; l++) {
                    if (l == param.menfeng)
                        fenpei[l] += defen + changbang * 300 + lizhibang * 1000;
                    else
                        fenpei[l] += -zhuangjia - changbang * 100;
                }
            }
            else {
                defen = zhuangjia + sanjia * 2;
                for (var l = 0; l < 4; l++) {
                    if (l == param.menfeng)
                        fenpei[l] += defen      + changbang * 300
                                               + lizhibang * 1000;
                    else if (l == 0)
                        fenpei[l] += -zhuangjia - changbang * 100;
                    else
                        fenpei[l] += -sanjia    - changbang * 100;
                }
            }
        }
        
        if (defen + defen2 > max.defen) { /** 得られた和了点の最大値を解とする */
            max = {
                hupai:      hupai,          //和了役一覧
                fu:         fu,             //府
                fanshu:     fanshu,         //藩数
                damanguan:  damanguan,      //役満複合数
                defen:      defen + defen2, // 和了打点
                fenpei:     fenpei          // 局収支
            };
        }
    }
    
    return max;
}

})();