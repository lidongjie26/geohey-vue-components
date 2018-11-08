
export default {
    defaultConfig: {
        name: '二维地图',
        type: 'map-2d',
        x: 20,
        y: 20,
        width: 960,
        height: 600,
        isFocused: true,
        icon: 'map_2',
        dragging: false,
    },
    defaultOptions: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        theme: 'light',
        animation: false,
        uid: null,
        res: null,
        center: null,
        rotate: null,
        showBaseMap: true,
        baseMapColor: '#f2f6f9',
        showLayerList: true,
        linkageField: null,
        linkage: true,
        fieldList: [],
    }
}
