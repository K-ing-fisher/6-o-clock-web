<template>
  <form>
    <label for="id">아이디</label>
    <input type="text" class="input-files" id="id" v-model="id">

    <label for="pw">비밀번호</label>
    <input type="password" class="input-files" id="pw" v-model="pw">

    <button type="button" name="submit" @click="submitLogin">로그인</button>
  </form>
</template>

<script>
import { errorHandler, setToken } from '../../common'
import { VALIDATION_CHECK } from '../../config'
import toastr from 'toastr'
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  methods: {
    submitLogin () {
      switch (this.validationCheck(this.id, this.pw)) {
        case VALIDATION_CHECK.EMPTY_ID:
          toastr.warning('아이디를 입력해주세요.');
          break;
        case VALIDATION_CHECK.EMPTY_PASSWORD:
          toastr.warning('비밀번호를 입력해주세요.');
          break;
        case VALIDATION_CHECK.SUCCESS:
          axios.post('SERVER_URL', {
            id: this.id,
            password: this.pw
          })
          .then( response => {
            if (!response) return toastr.warning('다시 시도해주세요.'), undefined;
            setToken(response.data.accessToken);
            toastr.success('로그인을 성공하였습니다.');

            this.$router.push('/test');
          })
          .catch(errorHandler);
          break;
        default:
          toastr.error('알 수 없는 에러가 발생하였습니다.');
          break;
      }
    },

    validationCheck (id, pw) {
      if (id === '') {
        return VALIDATION_CHECK.EMPTY_ID;
      } else if (pw === '') {
        return VALIDATION_CHECK.EMPTY_PASSWORD;
      }

      return VALIDATION_CHECK.SUCCESS;
    }
  }
}
</script>

<style scoped>
  form {
    width: 400px;
    height: 650px;
    margin: 0 auto;
    border-radius: 7.5px;
    box-shadow: 0 0 3px darkgray;
    position: relative;
    top: 3rem;
  }

  .input-files {
    display: block;
  }

  button {
    margin-top: 1rem;
  }
</style>
