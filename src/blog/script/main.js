Pusher.logToConsole = true

var pusher = new Pusher('d392f65ca7b23a30e14c', {
  cluster: 'ap1',
})

var channel = pusher.subscribe('hrk-blog')
channel.bind('set-normal', (data) => {
  diary.setNormal(data.id)
})
channel.bind('set-abnormal', (data) => {
  diary.setAbnormal(data.id)
})

var diary = new Vue({
  el: '#diary',
  data: () => ({
    loading: true,
    ready: false,
    msgList: [
      {
        normal: false,
        blur: 0.5,
        wait: false,
        date: '3.3',
        msg: 'JUU1JTlCJUEwJUU0JUI4JUJBJUU1JUFFJTlFJUU1JTlDJUE4JUU2JTk4JUFGJUU0JUI4JThEJUU3JTlGJUE1JUU5JTgxJTkzJUU1JUJBJTk0JUU4JUFGJUE1JUU1JTg2JTk5JUU0JUJBJTlCJUU0JUJCJTgwJUU0JUI5JTg4JUU2JTg5JTgwJUU0JUJCJUE1JUU1JUIwJUIxJUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0',
      },
      {
        normal: false,
        blur: 0.5,
        wait: false,
        date: '3.4',
        msg: 'QmVjYXVzZSUyMEklMjByZWFsbHklMjBkb24ndCUyMGtub3clMjB3aGF0JTIwdG8lMjB3cml0ZSUyQyUyMHNvJTIwSSUyMGp1c3QlMjB3YW50JTIwdG8lMjB3cml0ZSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYSUyMGFiYQ==',
      },
      {
        normal: false,
        blur: 0.5,
        wait: false,
        date: '3.5',
        msg: 'JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0JUU5JTk4JUJGJUU1JUI3JUI0',
      },
    ],
  }),
  methods: {
    encoded(id) {
      if (this.msgList[id]) {
        this.msgList[id].msg = window.btoa(
          encodeURIComponent(this.msgList[id].msg)
        )
      }
    },
    decode(id) {
      if (this.msgList[id]) {
        this.msgList[id].msg = decodeURIComponent(
          window.atob(this.msgList[id].msg)
        )
      }
    },
    setNormal(id) {
      if (this.msgList[id] && !this.msgList[id].normal) {
        this.msgList[id].blur = 10
        setTimeout(() => {
          this.decode(id)
          this.msgList[id].blur = 0
          this.msgList[id].normal = true
        }, 500)
      }
    },
    setAbnormal(id) {
      if (this.msgList[id] && this.msgList[id].normal) {
        this.msgList[id].blur = 10
        setTimeout(() => {
          this.encoded(id)
          this.msgList[id].blur = 0.5
          this.msgList[id].normal = false
        }, 500)
      }
    },
    change(id) {
      if (this.msgList[id].wait) return
      if (this.msgList[id].normal) {
        axios.get(`http://hrk-serve.vercel.app/api/abnormal?k=hrk&id=${id}`)
          .finally(() => {
            this.msgList[id].wait = false
          })
      } else {
        axios.get(`http://hrk-serve.vercel.app/api/normal?k=hrk&id=${id}`)
          .finally(() => {
            this.msgList[id].wait = false
          })
      }
      this.msgList[id].wait = true
    },
  },
  computed: {
    normal() {
      return this.msgList.every(item => item.normal)
    }
  },
  watch: {
    normal(newVal) {
      if (newVal) {
        document.title = 'Diary'
      } else {
        document.title = '□□□□□'
      }
    }
  },
  mounted() {
    axios.get('http://hrk-serve.vercel.app/api/state')
      .then((res) => {
        if (res.data) {
          res.data.forEach(id => {
            this.setNormal(id)
          })
        }
      })
      .finally(() => {
        this.loading = false
      })

    this.ready = true
  }
})