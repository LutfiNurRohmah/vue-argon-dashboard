<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-6">
                <h6>Nama Kelompok 14</h6>
              </div>
              <div class="col-6 text-end">
                <form @submit.prevent="onSubmit" method="post">
                  <BootstrapModal :visible="false" variant="success">
                    <template v-slot:body>
                      <ArgonInput
                        type="text"
                        v-model="input.name"
                        placeholder="Input Your Member Name"
                        name="name"
                        size="md"
                      />
                      <ArgonInput
                        type="text"
                        v-model="input.description"
                        placeholder="Input Description"
                        name="description"
                        size="md"
                      />
                      <ArgonInput
                        type="text"
                        v-model="input.category"
                        placeholder="Input Category"
                        name="category"
                        size="md"
                      />
                    </template>
                    <template v-slot:footer>
                      <button type="submit" class="btn btn-success">
                        Submit
                      </button></template
                    >
                  </BootstrapModal>
                </form>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Name
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Description
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Status
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Create At
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!g$list.length">
                    <td colspan="5" class="text-center">Tidak Ada Data</td>
                  </tr>

                  <tr
                    v-for="(item, index) in g$list"
                    :key="index"
                    v-else="g$list.length"
                  >
                    <td>
                      <div class="d-flex px-3 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 class="text-xs text-secondary mb-0">
                        {{ item.description }}
                      </h6>
                    </td>
                    <td
                      class="align-middle text-center text-sm"
                      v-if="item.status === 'todo'"
                    >
                      <span class="badge badge-sm bg-gradient-primary">{{
                        item.status
                      }}</span>
                    </td>
                    <td
                      class="align-middle text-center text-sm"
                      v-else-if="item.status === 'done'"
                    >
                      <span class="badge badge-sm bg-gradient-success">{{
                        item.status
                      }}</span>
                    </td>
                    <td
                      class="align-middle text-center text-sm"
                      v-else="item.status === 'pending'"
                    >
                      <span class="badge badge-sm bg-gradient-warning">{{
                        item.status
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        item.createdAt
                      }}</span>
                    </td>
                    <td class="align-middle">
                      <div class="ms-auto text-center">
                        <RouterLink
                          class="btn btn-info ms-lg-3"
                          :to="{ name: 'update', params: { id: item.id } }"
                        >
                          <i
                            class="fas fa-pencil-alt me-2"
                            aria-hidden="true"
                          ></i
                          >Edit</RouterLink
                        >
                        <button
                          class="btn btn-danger ms-lg-2"
                          href="javascript:;"
                          @click.prevent="deleteTodo(item.id)"
                        >
                          <i
                            class="far fa-trash-alt me-2"
                            aria-hidden="true"
                          ></i
                          >Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorsTable from "@/components/example/AuthorsTable.vue";
import ProjectsTable from "@/components/example/ProjectsTable.vue";
import d$todo from "@/store/todo";
import { mapActions, mapState } from "pinia";
import ArgonButton from "@/components/ArgonButton.vue";
import BootstrapModal from "@/components/BootstrapModal.vue";
import ArgonInput from "@/components/ArgonInput.vue";

export default {
  name: "tables",
  components: {
    AuthorsTable,
    ProjectsTable,
    ArgonButton,
    BootstrapModal,
    ArgonInput,
  },
  data() {
    return {
      //input
      input: {
        name: "",
        description: "",
        category: "",
      },
    };
  },
  computed: {
    ...mapState(d$todo, ["g$list"]),
  },
  methods: {
    ...mapActions(d$todo, ["a$list", "a$add", "a$del"]),
    async getList() {
      try {
        await this.a$list;
      } catch (error) {
        console.error("method getlist error", error);
      }
    },
    async onSubmit() {
      try {
        await this.a$add({ ...this.input });
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        console.error("method addlist error", error);
      }
    },
    async deleteTodo(idTodo) {
      try {
        if (confirm("Are you sure you delete this data?") == true) {
          await this.a$del(idTodo);
          alert("Delete Successfully");
          this.$router.go(this.$router.currentRoute);
        } else {
          this.$router.go(this.$router.currentRoute);
        }
      } catch (error) {
        console.error(" error", error);
      }
    },
  },
  async created() {
    await this.a$list();
  },
};
</script>
