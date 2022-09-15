import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import  { reactive } from 'vue'

export const store = reactive({

    query: String,

    // showOverview: false,
    // showLoading: false,
    
    // username: String,
    // userDateJoined: Date,
    // numComments: Number,
    // numSubmissions: Number,
    // commentKarma: Number,
    // submissionKarma: Number,
    // topSubreddits: Object,
    // topWords: Object,
    // numSubsToShow: Number,
    // numWordsToShow: Number,
    // commentPolarity: Object,
    // commentSentiment: Object,
    // commentFreqHrs: Object,
    // commentFreqDays: Object
})

createApp(App).use(router).mount('#app')
