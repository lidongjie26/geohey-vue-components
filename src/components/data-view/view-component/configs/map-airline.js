
export default {
    defaultConfig: {
        name: '飞线图',
        type: 'map-airline',
        x: 20,
        y: 20,
        width: 960,
        height: 600,
        isFocused: true,
        icon: 'map_2',
        dragging: false,
    },
    defaultOptions: {
        geo3D: {
            map: 'china',
            shading: 'color',
            environment: null,
            silent: true,
            realisticMaterial: {
                roughness: 0.8,
                metalness: 0
            },
            postEffect: {
                enable: true
            },
            groundPlane: {
                show: false
            },
            light: {
                main: {
                    intensity: 1,
                    alpha: 30
                },
                ambient: {
                    intensity: 0
                }
            },
            viewControl: {
                distance: 70,
                alpha: 89,

                panMouseButton: 'left',
                rotateMouseButton: 'right',
                panSensitivity: 0, // 禁止平移，
                rotateSensitivity: 0 //禁止旋转
            },

            itemStyle: {
                color: '#000000',
                borderWidth: 1,
                borderColor: '#ffffff',
                opacity: 0.8
            },

            regionHeight: 0.5
        },
        series: [
            {
                type: 'lines3D',

                coordinateSystem: 'geo3D',

                effect: {
                    show: true,
                    trailWidth: 1,
                    trailOpacity: 0.5,
                    trailLength: 0.2,
                    constantSpeed: 5
                },

                blendMode: 'lighter',

                lineStyle: {
                    color: '#ff0000',
                    width: 0.2,
                    opacity: 0.05
                },

                data: []
            }
        ]
    }
}
