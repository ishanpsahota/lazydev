<template>
  <section class="blog-new-section">
      <div class="row mx-0 p-3">                            
        <div class="col-lg-7 mb-3 mb-lg-1">
            <h1 class="display-1" >
                New Blog 
            </h1>        
            <b-form class="" @submit="createBlog" @reset="onReset" >
                <b-form-group >                          
                    <label for="title">Blog Title</label>
                    <b-form-input type="text" class="border-purple" :disabled="disabled" id="title" v-model="blog.title" placeholder="Enter the blog title" />                                                    
                </b-form-group>
                <b-form-group >                          
                    <label for="author">Blog Author</label>
                    <b-form-input type="text" class="border-purple" :disabled="disabled" id="author" v-model="blog.author" placeholder="Enter the blog author" />                                                    
                </b-form-group>                
                <b-form-group>
                    <label for="category">Blog Category</label>                    
                    <b-form-select v-model="blog.category" v-if="categories" id="category" >                         
                        <b-form-select-option  :value="null" disabled> Please select an option </b-form-select-option>                        
                        <b-form-select-option v-for="(category, i) in categories" :key="i" :value="category.name" :disabled="category.status == 0 ? true : false"> {{capitalize(category.name)}} </b-form-select-option>
                    </b-form-select>
                    <b-alert v-if="error.categories" show variant="danger" title="Error!"> Error in getting categories </b-alert>
                </b-form-group>
                
                <b-form-group>
                    <label for="image">Blog Hero Image (Optional)</label>                                        
                    <b-form-file
                        v-model="blog.image"
                        :state="Boolean(blog.image)"
                        id="image"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..." />
                </b-form-group>
                <hr class="divider">
                <template>
                     <div class="d-flex flex-row p-2 align-items-baseline">
                        <!-- <b-icon-dash-circle-fill @click="blockCount -=1 " v-if="blockCount >= 2" class="clickable" /> -->
                        <h4 class="mx-3"> Text Blocks : {{blog.blocks.length}} </h4>
                        <!-- <b-icon-plus-circle-fill class="clickable" @click="blockCount +=1" /> -->
                    </div>
                    <b-form-group class="m-1 border-bottom border-black-light my-2" >                       
                        
                        <b-form-group class="py-1">                          
                            <label for="`blockTitle`">Block Title</label>
                            <b-form-input type="text" class="border-purple" :disabled="disabled" id="`blockTitle`" v-model="tempBlock.heading" placeholder="Enter the block title" />                                                    
                        </b-form-group>
                        <b-form-group class="py-1">                          
                            <label :for="`blockTip`">Block Tip</label>
                            <b-form-input type="text" class="border-purple" :disabled="disabled" :id="`blockTip`" v-model="tempBlock.tip" placeholder="Enter the block tip" />                                                    
                        </b-form-group>
                        <b-form-group class="py-1">                          
                            <label for="`blockText`">Block Text</label>
                            <b-form-textarea
                            id="`blockText`"
                            v-model="tempBlock.text"
                            class="border-purple"
                            placeholder="Enter the block text here"
                            rows="3"                            
                            ></b-form-textarea>                            
                        </b-form-group>
                        <b-form-group>
                            <label for="`blockImage`"> Block Image (Optional)</label>                                        
                            <b-form-file
                            v-model="tempBlock.image"
                            :state="Boolean(tempBlock.image)"
                            id="`blockImage`"
                            accept="image/*"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..." />
                        </b-form-group>
                        <b-form-group v-if="tempBlock.image">
                            <b-form-radio v-model="tempBlock.imageSize"  name="tempBlock.imageSize" value="sm">Small</b-form-radio>
                            <b-form-radio v-model="tempBlock.imageSize"  name="tempBlock.imageSize" value="md">Medium</b-form-radio>
                            <b-form-radio v-model="tempBlock.imageSize"  name="tempBlock.imageSize" value="lg">Large</b-form-radio>
                        </b-form-group>
                        <b-form-group>
                            <button class="btn btn-dark m-1" type="button" @click="saveBlock()" > Save Block </button>
                            <button class="btn btn-info m-1" type="button" @click="resetBlock()"> Reset Block </button>
                        </b-form-group>
                    </b-form-group>
                </template>
            </b-form>
        </div>
        <div class="col-lg-5 px-3 d-none sticky-top d-lg-block">
            <div class="row mx-0 my-3">
                <h1 class="mx-auto">Preview </h1>
            </div>
            <div class="row border border-purple rounded mx-0 p-3" v-if="blog.title">
                {{blog.title}}
                {{blog.author}}
                {{blog.date}}
                {{blog.blocks}}
                {{blog.category}}

            </div> 
            <h5 class=" text-center" v-else> Preview of the blog would be visible here </h5 >
        </div>          
      </div>
  </section>
</template>

<script>

import { BForm,  BFormText, BFormInvalidFeedback, 
        BFormValidFeedback , BFormGroup, BFormInput, 
        BFormSelect, BFormSelectOption, BFormFile,
        BIconPlusCircleFill, BIconDashCircleFill,
        BFormTextarea, BFormRadio,
        BAlert } from 'bootstrap-vue'

import api from '../../../api/index'
import { capitalize } from '../../../utils/functions'

export default {

    name: 'NewBlog',
    components: {
        BForm, BFormText,
        BFormInvalidFeedback, BFormValidFeedback, 
        BFormGroup, BFormInput, BAlert,
        BFormSelect, BFormSelectOption,
        BFormFile, BIconDashCircleFill, BIconPlusCircleFill,
        BFormTextarea, BFormRadio,        
    },
    data() {
        return {
            loading : {
                blog: false
            },
            blockCount: 1,
            blog: {
                title: '',
                author: '',
                date: '',
                category: '',
                image: null,
                blocks: []
            },
            tempBlock: {
                heading: '',
                tip: '',
                image: null,
                imageSize: null,
                text: ''                
            },
            disabled: false,
            categories: '',
            error: {
                blog: false,
                categories: false
            }
        }
    },

    methods: {

        capitalize(phrase) {
            return capitalize(phrase)
        },

        createBlog() {
            this.disabled = true;            
        },

        onReset() {
            this.blog.title = ''
            this.blog.author = ''
        },

        getCategories() {
            api.getCategories()
            .then(res => {
                this.categories = res.categories;                  
            }).catch(err => {
                this.error.categories = err;
            })
        },

        saveBlock()
        {
            let block = {
                heading: this.tempBlock.heading,
                tip: this.tempBlock.tip,
                text: this.tempBlock.text,
                image: this.tempBlock.image,
                imageSize: this.tempBlock.imageSize
            }
            this.blog.blocks.push(block)
            this.resetBlock()
        },

        resetBlock() {
            this.tempBlock.heading = null
            this.tempBlock.tip = null
            this.tempBlock.image = null
            this.tempBlock.imageSize = null
            this.tempBlock.text = null
        }

    },

    created() {
        this.getCategories()        
    },

    

}
</script>

<style>

</style>