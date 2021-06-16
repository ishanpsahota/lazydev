<template>
      <div class="row mx-0 p-3 blogs-create-wrapper w-100">                                    
        <h1 class="display-4 mx-auto " v-if="!preview_mode" >
            New Blog 
        </h1>        
        <hr v-if="!preview_mode" class="divider w-100" />
        <div :class="['col-md-2', blog.blocks.length > 0 ? 'd-md-block' : 'd-none' ]">
            <div class="sticky-top my-auto pt-5">
                <ul class="index-list">
                <li class="index-list-item" v-for="(block, i) in blog.blocks" :key="i"> 
                    <a :href="`#${getId(block.heading)}`" class="" @click="highlightHeading(getId(block.heading))">
                    {{block.heading}} 
                    </a>
                </li>
                </ul>
            </div>
        </div>        
        <div :class="['col-md-8', 'my-3', blog.blocks.length > 0 ? 'mr-auto' : 'mx-auto']">
            <b-form class="form-create-wrapper" @submit.prevent="createBlog" @reset="onReset" >
                <div :class="['form-create-title-wrapper', 'my-3', blog.image.url ? 'blogs-create-img-wrapper': '', 'glass-wrapper']" :style="`background-image: url(${blog.image.url})`">                    
                    <div v-if="!blog.image.url" :class="['glass-circle glass-circle-2 glass-circle-lg glass-circle-centre ']"></div>                                    
                    <div :class="['form-create-title-input', blog.image.url ? 'd-flex m-auto' : 'glass-inner']">
                        <b-form-group class="text-wrapper" >                                              
                            <b-form-input type="text" required class="form-create-field text-center form-create-text form-control-lg" :disabled="disabled" id="title" v-model="blog.title" placeholder="Enter the blog title" />                                                                                
                            <div class="w-100 text-center">
                                <div class="badge badge-suggestions badge-pill badge-accent mt-4 " v-if="blog.category">                                                                                
                                    {{capitalize(blog.category)}}                                                    
                                </div>
                            </div>                            
                        </b-form-group>
                    </div>                    
                </div>    
                <div class="col-12 my-2 text-center">        
                    <h6> By <strong> {{blog.author}} </strong> </h6>        
                    <small> <b-icon-calendar2 /> &nbsp; {{blog.date}} </small>        
                </div>                                                                
                <b-form-group v-if="!preview_mode">
                    <b-input-group>
                        <b-input-group-prepend>
                            <label class="input-group-text form-create-input-group-text" for="category"> Category </label>
                        </b-input-group-prepend>                        
                        <select @change="setCategory($event)" class="custom-select form-create-field form-create-select" id="category">
                            <option :value="null" dsabled selected>Choose an option </option>
                            <option v-for="(cat, i) in categories" :key="i" :value="cat.value"> {{cat.text}} </option>
                        </select>
                    </b-input-group>
                </b-form-group>
                
                <!-- <b-form-group>
                    <label for="image">Blog Hero Image (Optional)</label>                                        
                    <b-form-file
                        v-model="blog.image"
                        @change="getImage($event)"
                        :state="Boolean(blog.image)"
                        id="image"
                        class="form-create-field form-create-file"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..." />
                        <input type="file" accept="image/*" class="custom-file-input "  @change="getImage($event)" placeholder="Choose a file" id="image" />
                </b-form-group> -->
                <b-form-group v-if="!preview_mode" label="Hero Image Type">
                    <b-form-radio-group>
                        <b-form-radio v-model="image_type" :aria-describedby="image_type" name="image_type" value="upload">Upload image</b-form-radio>
                        <b-form-radio v-model="image_type" :aria-describedby="image_type" name="image_type" value="url">Paste Web URL</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <template v-if="!preview_mode">
                    <b-form-group v-if="image_type == 'upload'">
                        <b-input-group>
                            <b-form-file accept="image/*" id="image" class="form-create-field form-create-file" placeholder="Choose a file" ref="hero_image" @change="setImage($event, 'hero')" />
                            <b-input-group-append >
                                <button :class="['btn', error.hero_img_upload ? 'bg-danger' : '', blog.image.url.length > 0 ? 'bg-success' : 'bg-accent' ]" 
                                    type="button" :disabled="disabled || loading.hero_img_upload || blog.title.length < 1" @click="uploadImage('hero', null)"> 
                                        <b-spinner v-if="loading.hero_img_upload" />
                                        <span v-else-if="error.hero_img_upload"> Error! </span>
                                        <span v-else-if="blog.image.url.length > 0"> Uploaded! </span>
                                        <span v-else> Upload </span>
                                </button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>     
                    <b-form-group v-if="image_type == 'url'">
                        <b-input-group>                        
                            <b-form-input type="text" class="form-create-field form-create-text" :disabled="disabled" v-model="blog.image.url" placeholder="Enter URL here" />                        
                            <b-form-input type="text" class="form-create-field form-create-text" :disabled="disabled" v-model="blog.image.provider" placeholder="Enter URL provider here (Copyrighter)" />                                               
                        </b-input-group>
                    </b-form-group>                     
                </template>
                <hr v-if="!preview_mode" class="divider">
                <div class="block-wrapper" v-for="(block, i) in blog.blocks" :key="i" :id="getId(block.heading)" :ref="getId(block.heading)">
                    <h2 class=""> {{block.heading}} </h2>
                    <blog-image v-if="block.image.url" :image="block.image.url" :size="block.imageSize" />
                    <p class="text-sm-sm" v-html="renderText(block.text)"> </p>
                    <glass-div class="mx-auto" :size="'sm'" v-if="block.tip" :category="null" :title="block.tip" />                                                    
                </div>
                <template v-if="!preview_mode">
                     <div class="d-flex flex-row p-2 align-items-baseline">
                        <!-- <b-icon-dash-circle-fill @click="blockCount -=1 " v-if="blockCount >= 2" class="clickable" /> -->
                        <h4 class="mx-3"> Text Blocks : {{blog.blocks.length}} </h4>
                        <!-- <b-icon-plus-circle-fill class="clickable" @click="blockCount +=1" /> -->
                    </div>
                </template>
                <template v-if="!preview_mode">
                    <b-form-group class="my-2 p-4 rounded border border-primary" >                                               
                        <b-form-group class="py-1">                          
                            <!-- <label for="blockTitle">Block Title</label> -->
                            <b-form-input type="text" class="form-create-field form-create-text form-control-lg" :disabled="disabled" id="blockTitle" v-model="tempBlock.heading" placeholder="Enter the block title" />                                                    
                        </b-form-group>
                        <b-form-group class="py-1">                          
                            <label :for="`blockTip`">Block Tip</label>
                            <b-form-input type="text" class="form-create-field form-create-text" :disabled="disabled" :id="`blockTip`" v-model="tempBlock.tip" placeholder="Enter the block tip" />                                                    
                        </b-form-group>
                        <b-form-group class="py-1">                          
                            <label :for="`blockText`">Block Text</label>
                            <b-form-textarea
                            :id="`blockText`"
                            v-model="tempBlock.text"
                            class="form-create-field form-create-text border border-purple p-3"
                            placeholder="Enter the block text here"
                            rows="3"                            
                            ></b-form-textarea>                            
                        </b-form-group>
                        <b-form-group label="Image Type">
                            <b-form-radio-group>
                                <b-form-radio v-model="block_image_type" :aria-describedby="block_image_type" name="block_image_type" value="upload">Upload image</b-form-radio>
                                <b-form-radio v-model="block_image_type" :aria-describedby="block_image_type" name="block_image_type" value="url">Paste Web URL</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group v-if="block_image_type == 'upload'">
                            <b-input-group>
                                <b-form-file accept="image/*" id="image" class="form-create-field form-create-file" placeholder="Choose a file" ref="block_image" @change="setImage($event, 'block')" />
                                <b-input-group-append >
                                    <button :class="['btn', error.block_img_upload ? 'bg-danger' : '', tempBlock.image.url.length > 0 ? 'bg-success' : 'bg-accent' ]" 
                                        type="button" :disabled="disabled || loading.block_img_upload || tempBlock.image.url.length > 0 || tempBlock.heading.length < 1" @click="uploadImage('block', blockCount)"> 
                                            <b-spinner v-if="loading.block_img_upload" />
                                            <span v-else-if="error.block_img_upload"> Error! </span>
                                            <span v-else-if="tempBlock.image.url.length > 0"> Uploaded! </span>
                                            <span v-else> Upload </span>
                                    </button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>  
                        <b-form-group v-if="block_image_type == 'url'">
                            <b-input-group>                        
                                <b-form-input type="text" class="form-create-field form-create-text" :disabled="disabled" v-model="tempBlock.image.url" placeholder="Enter URL here" />                        
                                <b-form-input type="text" class="form-create-field form-create-text" :disabled="disabled" v-model="tempBlock.image.provider" placeholder="Enter URL provider here (Copyrighter)" />                                                        
                            </b-input-group>
                        </b-form-group>             
                        <b-form-group v-if="tempBlock.image.url.length > 0" label="Image Size">
                            <b-form-radio-group>
                                <b-form-radio v-model="tempBlock.imageSize" selected name="tempBlock.imageSize" value="sm">Small</b-form-radio>
                                <b-form-radio v-model="tempBlock.imageSize"  name="tempBlock.imageSize" value="md">Medium</b-form-radio>
                                <b-form-radio v-model="tempBlock.imageSize"  name="tempBlock.imageSize" value="lg">Large</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        <div class="img-wrapper">
                            <blog-image v-if="tempBlock.image.url" :image="tempBlock.image.url" :size="tempBlock.imageSize" />
                        </div>
                        <b-form-group>
                            <button class="btn btn-outline-success m-1" type="button" @click="saveBlock()" > <b-icon-plus /> Add Block  </button>
                            <span class="text-info m-1 clickable" @click="resetBlock()"> Reset Block </span>
                        </b-form-group>
                    </b-form-group>
                </template>
                <hr v-if="!preview_mode" class="divider">
                <b-form-group class="text-center">
                    <b-form-checkbox v-model="preview_mode" name="preview_mode" :value="true" :unchecked-value="false"> Preview Mode </b-form-checkbox>
                </b-form-group>
                <b-form-group class="text-center">
                    <button class="btn bg-purple btn-lg m-1" type="success" >
                        <span v-if="loading.blog">
                            <breeding-rhombus-spinner
                                :animation-duration="2000"
                                :size="65"
                                color="#fff"
                            />
                        </span>
                        <span v-if="loaded.blog"> Blog created! </span>
                        <span v-if="error.blog"> Error creating blog! </span>
                        <span v-if="!error.blog || loading.blog || loaded.blog">
                            Create Blog
                        </span>
                    </button>
                    <button class="btn btn-outline-danger btn-lg m-1" type="reset" > Reset blog </button>
                    <button class="btn btn-block btn-primary" v-if="loaded.blog" @click="redirect()"> Redirect to {{loaded.blog.title}} </button>
                </b-form-group>
                <b-alert v-if="error.blog" variant="danger" title="Error!"> {{error.blog}} </b-alert>
            </b-form>
        </div>        
      </div>
  
</template>

<script>

import { BForm,  BFormText, BFormInvalidFeedback, 
        BFormValidFeedback , BFormGroup, BFormInput, 
        BFormSelect, BFormSelectOption, BFormFile,
        BIconPlusCircleFill, BIconDashCircleFill,
        BIconPlus, BFormCheckbox,
        BIconPeople, BIconCalendar2, BSpinner, BFormRadioGroup,
        BFormTextarea, BFormRadio, BInputGroup, BInputGroupAppend,
        BInputGroupText, BInputGroupPrepend, BAlert } from 'bootstrap-vue'

import { BreedingRhombusSpinner } from 'epic-spinners'

import BlogImage from '../../blogs-component/BlogImage/BlogImage.vue'
import api from '../../../api/index'
import { capitalize, getId, renderText, getTitle } from '../../../utils/functions'
import GlassDiv from '../../glass-item/GlassDiv.vue'

export default {

    name: 'NewBlog',
    components: {
        BForm, BFormText, BIconPeople,
        BFormInvalidFeedback, BFormValidFeedback, 
        BFormGroup, BFormInput, BAlert,
        BFormSelect, BFormSelectOption,
        BFormRadio, BSpinner, BFormRadioGroup,
        BFormFile, BIconDashCircleFill, BIconPlusCircleFill,
        BFormTextarea, BFormRadio, BIconCalendar2,
        GlassDiv, BInputGroup, BInputGroupAppend,
        BInputGroupPrepend, BInputGroupText,
        BIconPlus, BFormCheckbox,
        BlogImage, BAlert,
        BreedingRhombusSpinner
    },
    data() {
        return {
            loading : {
                blog: false,
                hero_img_upload: false,
                block_img_upload: false
            },
            loaded: {
                blog: false,
                hero_img_upload: false,
                block_img_upload: false
            },
            image_type: '',
            block_image_type: '',
            blockCount: 1,
            blog: {
                title: '',
                author: '',
                date: '',
                category: '',
                image: {
                    url: '',
                    provider: ''
                },
                blocks: []
            },
            tempBlock: {
                heading: '',
                tip: '',
                image: {
                    url: '',
                    provider: ''
                },
                imageSize: '',
                text: ''                
            },
            disabled: false,
            categories: [                
                // { 
                //     value: null, 
                //     text: 'Please select an option',
                //     disabled: true
                // }                
            ],
            error: {
                blog: false,
                categories: false,
                hero_img_upload: false,
                block_img_upload: false
            },
            temp_image : '',
            preview_mode: false
        }
    },

    methods: {

        capitalize(phrase) {
            return capitalize(phrase)
        },

        getId(phrase) {
            return getId(phrase)
        },

        createBlog() {
            this.disabled = true;            
        },

        renderText(text) {
            return renderText(text)
        },

        onReset() {
            this.blog.title = ''
            this.blog.author = ''
        },

        getCategories() {
            
            api.getCategories()
            .then(res => {
                // this.categories = res.categories;   
                res.categories.map((category) => {
                    if(category.status != 0) {
                        let cat = {
                            value: category.name,
                            text: this.capitalize(category.name)
                        }
                        // console.log(cat)
                        this.categories.push(cat);
                    }                    
                })
            }).catch(err => {
                this.error.categories = err;
            })
        },       

        setCategory(event) {
            this.blog.category = event.target.value
        },

        saveBlock()
        {
            var block = {
                heading: this.tempBlock.heading,
                tip: this.tempBlock.tip,
                text: this.tempBlock.text,
                image: {
                    url: this.tempBlock.image.url,
                    provider: this.tempBlock.image.provider
                },
                imageSize: this.tempBlock.imageSize
            }            

            this.blog.blocks.push({
                heading: this.tempBlock.heading,
                tip: this.tempBlock.tip,
                text: this.tempBlock.text,
                image: {
                    url: this.tempBlock.image.url,
                    provider: this.tempBlock.image.provider
                },
                imageSize: this.tempBlock.imageSize
            })            
            this.resetBlock()
        },

        resetBlock() {
            this.tempBlock.heading = ''
            this.tempBlock.tip = ''
            this.tempBlock.image = {
                url: '',
                provider: ''
            }
            this.tempBlock.imageSize = ''
            this.tempBlock.text = ''
            this.block_image_type = ''
        },

        setImage(e, type) {          
            this.temp_image = e.target.files[0];
            // console.log(this.temp_image)
        },

        uploadImage(type, blockId) {

            var img_name = ''
            
            if(type == 'hero')
            {                                
                this.loading.hero_img_upload = true
                img_name = this.blog.title.split(" ").join("-").toLowerCase();                
            }
            if(type == 'block')
            {                
                this.loading.block_img_upload = true   
                img_name = this.tempBlock.heading.split(" ").join("-").toLowerCase() + "_b_" + blockId;
            }

            api.uploadImg(this.temp_image, img_name)
            .then(res => {
                                
                if(type == 'hero') { 
                    this.loading.hero_img_upload = false                        
                    this.blog.image.url = res.data.path
                    this.blog.image.provider = 'Self'
                }
                
                if(type == 'block') {
                    this.loading.block_img_upload = false                        
                    this.tempBlock.image.url = res.data.path
                    this.tempBlock.image.provider = 'Self'                    
                }
                
                this.temp_image = ''
                
            }).catch(err => {
                if(err)
                {
                    if(type == 'hero')
                    {
                        this.loading.hero_img_upload = false
                        this.error.hero_img_upload = true                        
                    }
                    else 
                    {
                        this.loading.block_img_upload = false
                        this.error.block_img_upload = true                        
                    }

                    this.temp_image = ''
                }
            })

        },

        highlightHeading(heading) {
            this.$refs[heading][0].classList.add('highlight');

            setTimeout(() => {
                this.$refs[heading][0].classList.remove('highlight');
            }, 2000 )
        },  
        
        createBlog() {

            let save = confirm("Are you sure?")

            if(save) {
                api.createBlog(this.blog)
                .then(res => {
                    // console.log(res)
                    if(res.result) {
                        this.loaded.blog = res.result
                        this.blog.title = ''
                        this.blog.author = ''                        
                        this.blog.category = null
                        this.blog.image.url = ''
                        this.blog.image.provider = ''
                        this.blog.blocks = []
                    }

                }).catch(err => {
                    console.log(err)
                    this.error.blog = err;
                })
            }

        },

        redirect() {
            this.$router.push(getTitle(loaded.blog.title));
        }

    },

    created() {
        this.getCategories()    
        // console.log(this.categories)    
    },

    mounted() {
        this.blog.author = 'ishanpsahota'
        let d = new Date()
        this.blog.date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()        
    }
}
</script>

<style>

</style>