function token() {
    const charset = "qazxswedcvfrtgbnhyujmkiolp0129384756_POILKJMNBUYTHGFVCXREWQDSAZ";
  
    this.token = function(player_name, qq) {
      const remix = [];
      if (qq <= 0) {
        throw new Error("输入的值不在合理范围之内！");
      }
      if (player_name.length > 20 || player_name.length < 3) {
        throw new Error("输入的值不在合理范围之内！");
      }
      const qq_copy = qq;
  
      for (qq = qq + 707; qq !== 0; qq = Math.floor(qq / 64)) {
        remix.push(qq % 64);
      }
  
      for (const c of player_name) {
        const index = charset.indexOf(c);
        if (index === -1) {
          throw new Error(`Invalid player name character '${c}' in ${player_name}`);
        }
        remix.push(index);
      }
  
      if (remix.length % 2 === 1) {
        remix.push(Math.floor(qq_copy % 32) * 2);
      }
  
      let result = "";
      let node = 707;
      const size = Math.floor(remix.length / 2);
  
      for (let i = 0; i < 16; i++) {
        let value = 0;
  
        for (let j = 0; j < size; j++) {
          value += Math.sin(remix[j * 2] * node + remix[j * 2 + 1]);
        }
  
        node += value * 707;
        result += sigmoid(value).toString(16);
      }
  
      return result;
    };
  
    function sigmoid(value) {
      const sigmoid_result = 1 / (1 + Math.exp(0 - value));
      const result = Math.floor(sigmoid_result * 256);
      if (result >= 256) return 255;
      else return Math.max(result, 0);
    }
  }
  