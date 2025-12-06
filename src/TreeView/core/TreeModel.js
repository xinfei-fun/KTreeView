import { cloneDeep } from 'es-toolkit/object';

/**
 * @description 树模型
 * @class TreeModel
 * @typedef {Object} Node
 * @property {string} id - 节点唯一标识
 * @property {string} name - 节点名称
 * @property {boolean} isLeaf - 是否是叶子
 * @property {Node[]} [children] - 子节点，可选
 */

export default class TreeModel {
    #rawTreeData; // 第一层的原始数据，由于这个组件支持懒加载，这里是个数组且不带 children （非 tree 结构）

    #nodeMap; // 一个map，用来注册节点，方便查找（复杂度低）

    #expandedIdsSet; // 一个set，用来记录展开的节点，方便查找（复杂度低）

    #flattenList; // 一个打平的结构

    #loadChildrenFn; // 用于加载 children 的方法， 接受同步或者异步（promise）

    constructor(loaderFn) {
        this.#rawTreeData = [];
        this.#nodeMap = new Map();
        this.#expandedIdsSet = new Set();
        this.#flattenList = [];

        this.#loadChildrenFn = loaderFn;
    }

    /**
     * @description 设置根节点数据，重新构建树结构 （注意不是重新 mount ui）
     * @param 第一层的 列表数据，不需要带 children，因为是懒加载模式
     */
    reBuild(rootListData) {
        this.#rawTreeData = cloneDeep(rootListData);
        this.#nodeMap.clear();
        this.#expandedIdsSet.clear();

        this._buildNodeMap(this.#rawTreeData);
        this._reFlattenTree();
    }

    /**
     *
     * @description 检测 指定的节点 是否展开
     * @param {*} id
     * @return {boolean}
     */
    isNodeExpanded(id) {
        return this.#expandedIdsSet.has(id);
    }

    /**
     * @description 这里是注册节点，注册只需要注册出现的节点，可以节省性能
     * @returns 注册的点击以 id 为key，填充进 nodemap
     */
    _buildNodeMap(nodes) {
        for (const node of nodes) {
            this.#nodeMap.set(node.id, node);
            if (!node.isLeaf) {
                this._buildNodeMap(node.children || []);
            }
        }
    }

    /**
     * @description 这个是把树结构打平。注意这里的生成的 node 会用于渲染，所以他们的属性和原始数据有些不同. 另外不需要打平所有数据，只需要打平出现的节点即可
     */
    _reFlattenTree() {
        const result = [];

        const dfsFn = (nodes, level) => {
            for (const node of nodes) {
                const isExpanded = this.isNodeExpanded(node.id);

                Object.assign(node, {
                    level,
                    isExpanded,
                    children: node.children || [],
                    alreadyLoad: node.alreadyLoad || false,
                    isLoading: node.isLoading || false,
                });

                result.push(node);

                if (isExpanded && !node.isLeaf) {
                    dfsFn(node.children || [], level + 1);
                }
            }
        };

        dfsFn(this.#rawTreeData, 0);

        this.#flattenList = result;
    }

    get flattenList() {
        return this.#flattenList;
    }

    // 根据id 获取节点
    getNodeById(id) {
        return this.#nodeMap.get(id);
    }

    // 展开
    async expand(id) {
        const node = this.getNodeById(id);

        if (!node) {
            console.log('cannot find node:', node);
            return;
        }

        if (node.isLoading) {
            console.log('The current node is already loading!');
            return;
        }

        // 如果没有加载过
        if (!node.alreadyLoad) {
            node.isLoading = true;

            const maybePromise = this.#loadChildrenFn(node);
            const promise = maybePromise instanceof Promise ? maybePromise : new Promise((resolve) => resolve(maybePromise));

            try {
                const result = await promise;
                this._buildNodeMap(result);
                node.children = result;
                node.alreadyLoad = true;
            } catch (error) {
                console.error(error);
                return;
            } finally {
                node.isLoading = false;
            }
        }

        this.#expandedIdsSet.add(id);
        this._reFlattenTree();
    }

    // 折叠
    collapse(id) {
        this.#expandedIdsSet.delete(id);
        this._reFlattenTree();
    }

    // 获取节点数量
    getNodeCount() {
        return this.#nodeMap.size;
    }
}
