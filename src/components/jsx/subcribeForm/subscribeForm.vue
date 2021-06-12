<script>

import { BForm, BFormGroup, BFormInput, BButton  } from 'bootstrap-vue'

export default {
    data() {
        return {
            email: ''
        }
    },
    components: {
        BForm, BFormGroup, BFormInput,
        BButton
    },

    methods: {
        submitForm(event) {
            event.preventDefault();
            alert(this.email);
        }
    },

    render() {
        return (
            <b-form submit="submitForm()">
                <b-form-group>
                    <b-form-input v-model="email" type="email" />
                    <b-button type="submit" variant="success"> Submit </b-button>
                </b-form-group>
            </b-form>
        )
    }
}
</script>

<style>

</style>