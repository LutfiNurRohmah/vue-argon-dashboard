<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            ``
            <div class="card-header pb-0">
              <h6>Update Todo</h6>
              <form @submit.prevent="onSubmit">
                <div class="row mt-4">
                  <label for="title"
                    >Title
                    <input
                      class="form-control mb-2"
                      type="text"
                      v-model="input.title"
                    />
                  </label>
                  <label for="description"
                    >Description
                    <input
                      class="form-control mb-2"
                      type="text"
                      v-model="input.description"
                    />
                  </label>
                  <label for="status"
                    >Status
                    <select v-model="input.completed" class="form-select">
                      <option value="" selected hidden disabled>Options</option>
                      <template v-for="item in dropdown.status" :key="item">
                        <option :value="item === 'completed'? true : false">
                          {{ item }}
                        </option>
                      </template>
                    </select>
                  </label>
                  <right>
                    <div class="col-3">
                      <div class="text-center">
                        <argon-button
                          fullWidth
                          color="dark"
                          variant="gradient"
                          type="submit"
                          class="my-4 mb-5"
                        >
                          Update
                        </argon-button>
                      </div>
                    </div>
                  </right>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ArgonInput from "@/components/ArgonInput.vue";
  import ArgonButton from "@/components/ArgonButton.vue";
  import { d$todo } from "@/store//todo";
  import { mapActions, mapState } from "pinia";
  export default {
    name: "update",
    components: {
      ArgonInput,
      ArgonButton,
    },
    data() {
      return {
        //input
        input: {
          id: "",
          name: "",
          description: "",
          status: "",
        },
        // status
        dropdown: {
          status: ["completed", "pending"],
        },
      };
    },
    computed: {
      ...mapState(d$todo, ["g$detail"]),
    },
    methods: {
      ...mapActions(d$todo, ["a$edit", "a$detail"]),
  
      async onSubmit() {
        const dataId = this.input.id;
        console.log(dataId);
        try {
          await this.a$edit(
            dataId,
            {
              title: this.input.title,
              description: this.input.description,
              completed: this.input.completed,
            },
          );
          alert("Update Successfully");
          this.$router.push({ name: "Tables" });
        } catch (error) {
          console.error("method addlist error", error);
        }
      },
    },
    created() {
      // (this.g$detail );
      
      this.input = { ...this.g$detail(this.$route.params.id) };
      // g$detail.forEach((obj) => this.detail.push(obj))
      // this.a$list
      // this.input.name = detail.name
      // this.input.description = detail.description
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  