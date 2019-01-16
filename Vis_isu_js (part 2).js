({
   task_list: function() {
      this.meta._tasks = response.table.aggregations.task.buckets.map(
          (function(item) { return {
            taskid: item.isu_task_details.hits.hits[0]._source.id_task,
            metrics: item.isu_task_details.hits.hits[0]._source.pokaz_name,
            status: item.isu_task_details.hits.hits[0]._source.status,
            startdate: new Date (item.isu_task_details.hits.hits[0]._source.task_start_date).toLocaleDateString(),
            assignee: item.isu_task_details.hits.hits[0]._source.employee_name,
            role: item.isu_task_details.hits.hits[0]._source.role_subj,
            escalation: item.isu_task_details.hits.hits[0]._source.escalation
        }})).filter(function (item) { return ( item.status === 'Не начата') || item.status === 'В работе'})
    },
     task_display: function() {
        if (!this.meta._tasks) this.meta.task_list.bind(this)();
        return this.meta._tasks;
    },
    total_rows: function() {
        if (!this.meta._tasks) this.meta.task_list.bind(this)();
        return this.meta._tasks.length;
    }
})
