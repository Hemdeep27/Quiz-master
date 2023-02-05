<template>
  <div class="home">

    <div class="art artOne"></div>

    <div class="homeOne" data-aos="fade-left">
      <p>The place where you can create a Quiz .</p>
    </div>
    
    <div class="homeTwo" data-aos="fade-right">
      <p>You can create static Quiz</p>
    </div>
    <div class="art artTwo"></div>
    <div class="homeThree" data-aos="fade-left">
      <p>You can create live Quiz</p>
    </div>
    <div class="art artThree"></div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {

  }
}
</script>


<style scoped>
.home {
  /* height: 100vh; */
}
.homeOne {
  height: 25vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15rem;
  font-size: 30px;
}
.homeTwo {
  height: 25vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15rem;
  font-size: 30px;
}
.homeThree {
  height: 25vh;
  display: flex;
  justify-content: flex-end;
  margin-right: 15rem;
  font-size: 30px;
}

.art {
  position: relative;
  height: 60px;
  width: 60px;
  border-radius: 6px;
  background: rgba(143, 143, 220, 0.805);
}

.artOne {
  position: relative;
  top: 8rem;
  left: 15rem;
}

.artTwo {
  position: relative;
  left: 65rem;
  bottom: 8rem;
}

.artThree {
  position: relative;
  left: 15rem;
  bottom: 12rem;
}

</style>