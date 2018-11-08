import axios from 'axios'
import qs from 'qs'

const baseUrl = {
    service: '/s/',
    // service: 'https://geohey.com/s/',
    // api: '/apps/data-view/api/',
    api: '/apps/data-view/api/',
    insight: '/s/insight/',
    // insight: 'http://localhost:5001/',
    dataviz: '/s/mapviz/',
    // dataviz: 'https://geohey.com/apps/dataviz/'
    // insight: 'http://localhost:9103/s/insight/'

}

if ( process.env.NODE_ENV === 'development' ) {

    document.cookie = 'token=19rYp67OuWAWTuifT8DNbuo5kbp4sjLTWul2xFM8mg5jOD44HbdugVPkEbsMrlQL';

    // baseUrl.service = 'https://geohey.com/s/'
    // baseUrl.insight = 'https://geohey.com/s/insight/'

}

const project = {

    list( params ) {
        const url = `${ baseUrl.api }list/`;

        const promise = axios.get( url, { params } )

        return promise;
    },

    create( data ) {

        const url = `${ baseUrl.api }`;

        const promise = axios.post( url, data )

        return promise;
    },

    get( uid ) {
        const url = `${ baseUrl.api }${ uid }`;

        const promise = axios.get( url )

        return promise;
    },

    remove( uid ) {
        const url = `${ baseUrl.api }${ uid }`;

        const promise = axios.delete( url )

        return promise;
    },

    update( data ) {
        const url = `${ baseUrl.api }${ data.uid }`;

        // console.log( url )

        const promise = axios.put( url, data )

        return promise;
    },

    getThumb( uid ) {
        const url = `${ baseUrl.api }${ uid }/thumb`;

        const promise = axios.get( url )

        return promise;

    },

    updateThumb( data ) {
        const url = `${ baseUrl.api }${ data.uid }/thumb`;

        const promise = axios.post( url, {
            thumb: data.thumb
        } )

        return promise;

    },

    uploadImage( base64Str ) {
        const url = `${ baseUrl.api }/upload-image`;

        const promise = axios.post( url, {
            image: base64Str
        } )

        return promise;

    },

    deleteImage( imageUid ) {
        const url = `${ baseUrl.api }/delete-image`;

        const promise = axios.post( url, {
            imageUid: imageUid
        } )

        return promise;

    },

    imageList() {
        const url = `${ baseUrl.api }/image-list`;

        const promise = axios.post( url,{} )

        return promise;

    }

}


const template = {

    list() {
        const url = `${ baseUrl.api }template-list`;

        const promise = axios.post( url, {} )

        return promise;
    },

    create( data ) {

        const url = `${ baseUrl.api }template`;

        const promise = axios.post( url, data )

        return promise;
    },

    get( uid ) {
        const url = `${ baseUrl.api }${ uid }/template`;

        const promise = axios.get( url )

        return promise;
    },
    
    remove( uid ) {
        const url = `${ baseUrl.api }${ uid }/template`;

        const promise = axios.delete( url )

        return promise;
    },
}

const data = {

    list( type, params ) {
        const url = `${ baseUrl.service }${ type === 'private' ? 'data' : 'public_data' }/list`;

        const promise = axios.get( url, { params } );

        return promise;
    },

    info( type, uid, ak ) {
        let url = `${ baseUrl.service }${ type === 'private' ? 'data' : 'public_data' }/${ uid }/info`;

        if ( ak ) {
            url += ( '?ak=' + ak );
        }

        const promise = axios.get( url );

        return promise;
    },

    getFields( type, uid ) {
        const url = `${ baseUrl.service }${ type === 'private' ? 'data' : 'public_data' }/${ uid }/fields`;

        const promise = axios.get( url )

        return promise;

    },

    query( type, tid, params ) {
        const url = `${ baseUrl.service }${ type === 'private' ? 'data' : 'public_data' }/${ uid }/query`;

        const promise = axios.get( url, { params })

        return promise;

    },
    
}

const insight = {

    count( dataType, uid, fieldName, ak ) {

        let url = `${ baseUrl.insight }${ dataType }/${ uid }/count`;

        if ( ak ) {
            url += ( '?ak=' + ak );
        }

        const promise = axios.post( url, qs.stringify( {
            countField: fieldName,
            limit: 30
        } ), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        } )

        return promise;

    },

    aggregate( { dataType, uid,  labelFields, aggregateFields, aggregateTypes, sortField, sortType, filter,ak } ) {
       
        let url = `${ baseUrl.insight }${ dataType }/${ uid }/aggregate`;

        if ( ak ) {
            url += ( '?ak=' + ak );
        }

        let params = {
            labelFields: JSON.stringify( labelFields ),
            aggregateFields: JSON.stringify( aggregateFields ),
            aggregateTypes: JSON.stringify( aggregateTypes )
        }

        if ( sortField && sortType ) {
            params.sortField = sortField;
            params.sortType = sortType;
        }

        if( filter ) params.filter = filter

        const promise = axios.post( url, qs.stringify( params ), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        } )

        return promise;

    }


}

const dataviz = {

    list( params, ak ) {
        let url = `${ baseUrl.dataviz }list`;

        if ( ak ) {
            url += ( '?ak=' + ak );
        }

        const promise = axios.get( url, { params } )

        return promise;
    },

    getVizId( config ) {
        const url = `${ baseUrl.dataviz }config?t=${ +new Date() }`;

        const promise = axios.post( url, qs.stringify( {
            configJson: JSON.stringify( config ),
            layerGrouped: true
        } ), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        } )

        return promise;
    },
    choropleth( dataType, uid, type, fieldName, countOrLimit ) {

        let url = `/app/dataviz/choropleth/${ type }`;

        let params = {
            dataType,
            dataUid: uid,
            fieldName,
        }

        if ( type === 'category' ) {
            url = `/app/dataviz/fieldValues`;
            params.limit = 100;
        } else {
            params.bucketCount = countOrLimit;
        }

        const promise = axios.post( url, qs.stringify( params ), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        } )

        return promise;

    },

    identify(params){
        let url = `/s/dataviz/identify?`+qs.stringify( params ) ;
        const promise = axios.get(url)
        return promise;
    }

}

export default {
    project,
    template,
    data,
    insight,
    dataviz,
    read: () => { return { then: () => {} } }
}
