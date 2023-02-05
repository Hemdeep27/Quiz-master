<template>
  <div class="footer">
    <div class="footerStart">
      <h1>QuizMaster</h1>
    </div>
    <div class="footerMid">
      <ul>
        <li>QuizMaster Blog</li>
        <li>Teacher Resources</li>
        <li>Help Center</li>
      </ul>
    </div>
    <div class="footerEnd">
      <ul>
        <li>Download QuizMaster Mobile App</li>
        <li>
          <img
            src="https://quizizz.com/wf/assets/62fa641a161d3a2982681d00_Google_Play.svg"
            alt="playstore"
          />
        </li>
        <li>
          <img
            src="https://quizizz.com/wf/assets/62fa6419161d3a1ad0681cbf_App_Store.svg"
            alt="appstore"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {};
  },
};
</script>

// https://quizizz.com/wf/assets/62fa641a161d3a2982681d00_Google_Play.svg //
https://quizizz.com/wf/assets/62fa6419161d3a1ad0681cbf_App_Store.svg

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  background-color: rgb(129, 129, 226);
}

.footerStart {
  margin: 2rem 0px;
}

.footerMid {
  margin: 2rem 0px;
}

.footerEnd {
  margin: 2rem 0px;
}

h1 {
  margin: 2rem 2rem;
}

ul {
  list-style: none;
}

li {
  font-size: 20px;
  margin: 2rem 5rem;
}

@media (max-width: 412px) {
  h1 {
    margin-top: 2rem;
    margin-left: 2rem;
  }
  .footer {
    flex-direction: column;
  }
  li {
    margin: 2rem 2rem;
  }
}
</style>
