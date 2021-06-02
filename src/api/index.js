const axios = require('axios')

// const url = 'http://localhost:8081/api/v1'
const url = 'https://lazydevapi.herokuapp.com/api/v1'

const links = {
    getBlogs: url + '/blogs',
    getSingleBlog: url + '/blogs/',    
    saveBlog: url + '/blogs/save/',
    saveBlock: url + '/blogs/save/',
    showHideBlog: url + '/blogs/status/change/',
    getCategories: url + '/blogs/get/categories',
    getSimilarBlogs: url + '/blogs/get/similar',
    getTrendingBlogs: url + '/blogs/get/trending',
    search: url + '/blogs/get/search'
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
    },

    getCategories() {
        return new Promise((resolve, reject) => {
            axios.get(this.getLinks().getCategories)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })        
    },

    getSimilarBlogs(phrase, match) {
        return new Promise((resolve, reject) => {
            axios.get(this.getLinks().getSimilarBlogs + `?phrase=${phrase}&match=${match}`)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getTrendingBlogs(category) {

        if(category)
        {
            return new Promise((resolve, reject) => {
                axios.get(this.getLinks().getTrendingBlogs + `?category=${phrase}`)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
        else return new Promise((resolve, reject) => {
            axios.get(this.getLinks().getTrendingBlogs)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
        
    },

    search(query){

        if(query) {
            return new Promise((resolve, reject) => {
                axios.get(this.getLinks().search + `?query=${query}`).
                then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
        else return new Promise((resolve, reject) => {
            axios.get(this.getLinks().search).
            then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

}