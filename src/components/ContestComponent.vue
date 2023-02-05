<template>
    <div>
        <h3 @click="rankingHandler">{{contestData.contestName}}</h3>
        <!-- <p>{{contestData.quizType}}</p> -->
        <!-- {{contestData}} -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "ContestComponent",
    props: {
        contestData: {
            typeof: Object,
            require: true,
        }
    },
    data() {
        return{

        };
    },
    computed: {
        ...mapGetters(["getLeaderBoard"])
    },
    methods: {
        ...mapActions(["LEADER_BOARD"]),
        rankingHandler() {
            console.log("ranking", this.contestData.contestId)
            this.$store.dispatch("LEADER_BOARD", {contestId: this.contestData.contestId})
            this.$router.push("/leaderBoard/"+this.contestData.contestId)
        }
    }

}
</script>
<style scoped>
h3:hover {
    cursor: pointer;
}
</style>