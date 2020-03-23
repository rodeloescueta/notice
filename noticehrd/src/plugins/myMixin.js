//file under plugins
import { mapState, mapMutations } from 'vuex'

const myPlugins = {
    install(Vue){
        Vue.mixin({
            data: () => ({
                // api: 'http://localhost:3000/',
                api: 'https://hxv4pe05f4.execute-api.us-east-2.amazonaws.com/prod/',
                screenHeight: 0,
                screenWidth: 0,
                searchItem: ''
            }),
            computed: {
                ...mapState([
                    'userInfo'
                ])
            },
            methods: {
                ...mapMutations([
                    'CHANGE_USER_INFO',
                ])
            },
            created(){
            }
        })
    }
}
 
export default myPlugins