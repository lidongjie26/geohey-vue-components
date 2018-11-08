/**
 * @author Tsering Yuu
 * @type config
 * @summary item factory config
 * @version 1.0.0
 */

// base charts
import barNormal from './configs/bar-normal'
import barNegative from './configs/bar-negative'
import barContrast from './configs/bar-contrast'
import lineNormal from './configs/line-normal'
import pieNormal from './configs/pie-normal'
import scatterNormal from './configs/scatter-normal'

// more charts
import lineArea from './configs/line-area'

// 9 long
import barSharp from './configs/bar-sharp'
import lineAreaGap from './configs/line-area-Gap'
import scatterBubble from './configs/scatter-bubble'
import barBarLine from './configs/bar-bar-line'
import lineLine from './configs/line-line'
import barRadius from './configs/bar-radius'
import radarNormal from './configs/radar-normal'
import pieNumber from './configs/pie-number'

// combine charts
import barBar from './configs/bar-bar'

import relationGraph from './configs/relation-graph'

// map
import map2d from './configs/map-2d'
import mapAirline from './configs/map-airline'

// text
import text from './configs/text'
import richText from './configs/rich-text'
import timeShower from './configs/time-shower'

// ui
import backgroundGradient from './configs/background-gradient'
import image from './configs/image'
import borderCorner from './configs/border-corner'
import bg1 from './configs/bg1'
import bg2 from './configs/bg2'
import bg3 from './configs/bg3'
import title from './configs/title'
import titleSub1 from './configs/title-sub1'
import titleSub2 from './configs/title-sub2'

import webPage from './configs/web-page'
import linkText from './configs/link-text'

export default {
    'bar-normal': barNormal,
    'bar-negative': barNegative,
    'bar-contrast': barContrast,
    'line-normal': lineNormal,
    'pie-normal': pieNormal,
    'scatter-normal': scatterNormal,
    'bar-bar': barBar,
    'relation-graph': relationGraph,
    text,
    'rich-text': richText,
    'line-area': lineArea,
    'map-2d': map2d,
    'map-airline': mapAirline,
    'background-gradient': backgroundGradient,
    image,
    'border-corner': borderCorner,
    'bar-sharp': barSharp,
    'line-area-gap': lineAreaGap,
    'scatter-bubble': scatterBubble,
    'bar-bar-line': barBarLine,
    'line-line': lineLine,
    'bar-radius': barRadius,
    'radar-normal': radarNormal,
    'pie-number': pieNumber,
    bg1,
    bg2,
    bg3,
    title,
    'title-sub1': titleSub1,
    'title-sub2': titleSub2,
    'time-shower': timeShower,
    'web-page': webPage,
    'link-text': linkText,
}
