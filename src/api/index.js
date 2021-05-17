const axios = require('axios')

// const url = 'http://localhost:8081/api/v1'
const url = 'https://lazydevapi.com/api/v1'

const links = {
    getBlogs: url + '/blogs',
    getSingleBlog: url + '/blogs/',    
    saveBlog: url + '/blogs/save/',
    saveBlock: url + '/blogs/save/',
    showHideBlog: url + '/blogs/status/change/'
}

export default {

    getLinks: () => {
        return links;
    },

    getBlogs() {

        return new Promise((resolve, reject) => {
            
            axios.get(this.getLinks().getBlogs)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })

    },

    getSingleBlog(title) {
        return new Promise((resolve, reject) => {
            axios.get(this.getLinks().getSingleBlog + title)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    saveBlog(title) {
        return new Promise((resolve, reject) => {
            axios.put(this.getLinks().saveBlock + title)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    saveBlock(title, blockId) {
        return new Promise((resolve, reject) => {
            
            axios.put(this.getLinks().saveBlog + title + '/block/' + blockId)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

}