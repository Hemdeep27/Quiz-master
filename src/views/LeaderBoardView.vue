<template>
    <div>
        <h2>Leader Board</h2>
        <div class="leaderBoard">
            <table>
                <tr>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Rank</th>
                </tr>
                <tr v-for="(rank, i) in getLeaderBoard.usersList" :key="i">
                    <td>{{rank.userId}}</td>
                    <td>{{rank.score}}</td>
                    <td>{{i+1}}</td>
                </tr>
            </table> 
        </div>
        <!-- <div class="leaderBoard">
            <div class="ranking">
                <h3 class="userId">UserName</h3>
                <h3 class="score">Score</h3>
                <h3 class="rank">Rank</h3>
            </div>
            <div class="ranking" v-for="(rank, i) in getLeaderBoard.usersList" :key="rank.userId">
                <h3 class="userId">{{rank.userId}}</h3>
                <h3 class="score">{{rank.score}}</h3>
                <h3 class="rank">{{i+1}}</h3>
            </div>
        </div> -->
        <!-- {{getLeaderBoard}} -->

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "LeaderBoardView",
    computed: {
        ...mapGetters(["getLeaderBoard"])
    }
}
</script>

<style scoped>

h2 {
    margin-left: 4rem;
}
.leaderBoard {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    margin-left: 10rem;
    /* align-items: center; */
    margin-top: 3rem;
    margin-bottom: 6rem;
}

.ranking {
    display: flex;
    flex-direction: row;
}

th, td {
    text-align: left;
    font-size: 20px;
    padding-right: 13rem;
    padding-bottom: 1rem;
}

/* .userId{
    margin-right: 5rem;
}
.score{
    margin-right: 5rem;
}
.rank {
    margin-right: 5rem;
} */

</style>