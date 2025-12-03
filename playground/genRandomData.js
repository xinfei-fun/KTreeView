import Mock from 'mockjs';


export function genRandomData(currentId = 0, count = 5, delay=0) {
    console.log('🚀 ~ genRandomData.js:5 ~ genRandomData ~ currentId:', currentId)

    const fakedata = Mock.mock({
        [`nodes|${count}`]: [{
            'id': '@id',            
            'label': '@ctitle(3,15)',
            'isLeaf|1-10': true  // 10% 叶子
        }]
    });

    if (delay > 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(fakedata.nodes);
            }, delay);
        });
    }

    return fakedata.nodes;
}
