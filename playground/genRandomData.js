import Mock from 'mockjs';


export function genRandomData(currentId=0) {
    

    const fakedata= Mock.mock({
        'nodes|5': [{
            'id': '@id',
            'pid': currentId,
            'label': '@ctitle(3,6)',            
            'isLeaf|1-10': true  // 10% 叶子    
        }]
    });

    return fakedata.nodes;
}