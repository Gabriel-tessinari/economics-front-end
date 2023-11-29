import { reactive, ref } from "vue";

export const shared = reactive({
  months: [
    {id: 1, label: 'Janeiro'},
    {id: 2, label: 'Fevereiro'},
    {id: 3, label: 'Março'},
    {id: 4, label: 'Abril'},
    {id: 5, label: 'Maio'},
    {id: 6, label: 'Junho'},
    {id: 7, label: 'Julho'},
    {id: 8, label: 'Agosto'},
    {id: 9, label: 'Setembro'},
    {id: 10, label: 'Outubro'},
    {id: 11, label: 'Novembro'},
    {id: 12, label: 'Dezembro'}
  ],
  
  getMonthById(id: number): string {
    const month = this.months.find(
      month => month.id == id
    );

    if(month) return month.label;
    return '';
  },

  maskReal(total: number): string {
    if(total >= 0) return 'R$' + total.toFixed(2).replace('.', ',');
    return '-R$' + (-1 * total).toFixed(2).replace('.', ',');
  }
});
